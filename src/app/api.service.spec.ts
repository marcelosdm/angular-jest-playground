import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { defer } from 'rxjs';
import * as Operators from 'rxjs/operators';

import { ApiService } from './api.service';



const SERVER_URL = 'http://localhost:3000/products';

const mockProducts = [{
  id: '1',
  name: 'test',
  description: 'test',
  price: '99',
  imageUrl: 'test',
  quantity: '1'
}];

const errorReason = {
  status: 404,
  message: 'error'
};


const errorMessage = 'Unkown error!';

const mockHeaders = new HttpHeaders({ Link: '<http://localhost:3000/products?_page=1&_limit=4>; rel="first", <http://localhost:3000/products?_page=2&_limit=4>; rel="next", <http://localhost:3000/products?_page=75&_limit=4>; rel="last"' });
const mockHeadersLastPage = new HttpHeaders({ Link: '<http://localhost:3000/products?_page=1&_limit=4>; rel="first", <http://localhost:3000/products?_page=6&_limit=4>; rel="prev", <http://localhost:3000/products?_page=75&_limit=4>; rel="last"' });
const mockHeadersAllPages = new HttpHeaders({ Link: '<http://localhost:3000/products?_page=1&_limit=4>; rel="first", <http://localhost:3000/products?_page=2&_limit=4>; rel="next", <http://localhost:3000/products?_page=6&_limit=4>; rel="prev", <http://localhost:3000/products?_page=75&_limit=4>; rel="last"' });

const mockResponse = new HttpResponse<any>({ body: mockProducts, headers: mockHeaders });
const mockResponseWithNoHeader = new HttpResponse<any>({ body: mockProducts, headers: new HttpHeaders({ Link: '' }) });

function mockHandleError(error: any) {
  return defer(() => Promise.reject(error));
}

function mockHttpHeaders(headers: any) {
  return mockHttpClient.get.mockImplementation(() => defer(() => Promise.resolve(new HttpResponse<any>({ body: mockProducts, headers: headers }))));
}

const mockHttpClient = {
  get: jest.fn()
};

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    service = new ApiService(mockHttpClient as any);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
  describe('When sendGetRequestToUrl is called', () => {
    // TODO: olhar e fazer mais experimentos
    beforeEach(() => {
      expect.hasAssertions();
      mockHttpClient.get.mockImplementation(() => defer(() => Promise.resolve(mockResponse)));
    });
    it('should be called with correct params', done => {
      service.sendGetRequestToUrl(SERVER_URL).subscribe(() => {
        expect(mockHttpClient.get).toBeCalledTimes(1);
        expect(mockHttpClient.get).toHaveBeenCalledWith(SERVER_URL, {
          "observe": "response"
        });
        done();
      });
    });

    it('should get nav links from First page', done => {
      service.sendGetRequestToUrl(SERVER_URL).subscribe(() => {
        expect(service.first).toBeTruthy();
        expect(service.prev).toBeUndefined();
        expect(service.next).toBeTruthy();
        expect(service.last).toBeTruthy();
        done();
      });
    });

    it('should get nav links from Last page', done => {
      mockHttpHeaders(mockHeadersLastPage);
      service.sendGetRequestToUrl(SERVER_URL).subscribe(() => {
        expect(service.first).toBeTruthy();
        expect(service.prev).toBeTruthy();
        expect(service.next).toBeUndefined();
        expect(service.last).toBeTruthy();
        done();
      });
    });

    it('should return all nav links defined', done => {
      mockHttpHeaders(mockHeadersAllPages);
      service.sendGetRequestToUrl(SERVER_URL).subscribe(() => {
        expect(service.first).toBeTruthy();
        expect(service.prev).toBeTruthy();
        expect(service.next).toBeTruthy();
        expect(service.last).toBeTruthy();
        done();
      });
    });

    describe('and if it returns an error', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.spyOn(window, 'alert').mockImplementation(() => { });
      });

      it('should return message for Error Event', done => {
        mockHttpClient.get.mockImplementation(() => mockHandleError({
          error: new ErrorEvent('error', {
            message: errorMessage
          })
        }));

        service.sendGetRequestToUrl(SERVER_URL).subscribe(() => { }, error => {
          expect(error).toMatch(`Error: ${errorMessage}`);
          done();
        });
      });

      it('should catch the request error', done => {
        expect.hasAssertions();

        mockHttpClient.get.mockImplementation(() => mockHandleError(errorReason));

        service.sendGetRequestToUrl(SERVER_URL).subscribe(() => { }, error => {
          expect(error).toMatch(`Error Code: ${errorReason.status}\nMessage: ${errorReason.message}`);
          done();
        });
      });
    });
  });
  describe('When sendGetRequest is called', () => {
    const params = new HttpParams({ fromString: '_page=1&_limit=5' });

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();

      expect.hasAssertions();
      mockHttpClient.get.mockImplementation(() => defer(() => Promise.resolve(mockResponse)));
    });

    it('should be called with correct params', done => {
      service.sendGetRequest().subscribe(() => {

        expect(mockHttpClient.get).toBeCalledTimes(1);
        expect(mockHttpClient.get).toHaveBeenCalledWith(SERVER_URL, {
          params: params,
          observe: 'response'
        });
        done();
      });
    });

    it('should get products from API', done => {
      service.sendGetRequest().subscribe(response => {
        expect(response.body).toBe(mockProducts);
        done();
      });
    });
    it('should get products from API when the request sends an empty header', done => {
      mockHttpClient.get.mockImplementation(() => defer(() => Promise.resolve(mockResponseWithNoHeader)));

      service.sendGetRequest().subscribe(response => {
        expect(response.body).toEqual(mockProducts);
        expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
        expect(mockHttpClient.get).toReturnTimes(1);
        done();
      });
    });

    it('should get nav links from First page', done => {
      service.sendGetRequest().subscribe(() => {
        expect(service.first).toBeTruthy();
        expect(service.prev).toBeUndefined();
        expect(service.next).toBeTruthy();
        expect(service.last).toBeTruthy();
        done();
      });
    });

    it('should get nav links from Last page', done => {
      mockHttpHeaders(mockHeadersLastPage);

      service.sendGetRequest().subscribe(() => {
        expect(service.first).toBeTruthy();
        expect(service.prev).toBeTruthy();
        expect(service.next).toBeUndefined();
        expect(service.last).toBeTruthy();
        done();
      });
    });

    it('should get all nav links', done => {
      mockHttpHeaders(mockHeadersAllPages);

      service.sendGetRequest().subscribe(() => {
        expect(service.first).toBeTruthy();
        expect(service.prev).toBeTruthy();
        expect(service.next).toBeTruthy();
        expect(service.last).toBeTruthy();
        done();
      });
    });

    describe('and if it returns with error', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.spyOn(window, 'alert').mockImplementation(() => { });
      });

      it('should return error message for Error Event', done => {
        mockHttpClient.get.mockImplementation(() => mockHandleError({
          error: new ErrorEvent('error', {
            message: errorMessage
          })
        }));

        service.sendGetRequest().subscribe(() => { }, error => {
          expect(error).toEqual(`Error: ${errorMessage}`);
          expect(error).toMatch(`Error: ${errorMessage}`);
          done();
        });
      });

      it('should catch error and return 404 error if URL is incorrect', done => {
        expect.hasAssertions();

        mockHttpClient.get.mockImplementation(() => mockHandleError(errorReason));

        service.sendGetRequest().subscribe(() => { }, error => {
          // expect(error).toEqual('Error Code: 404\nMessage: error');
          expect(error).toEqual(`Error Code: ${errorReason.status}\nMessage: ${errorReason.message}`);
          expect(error).toMatch(`Error Code: ${errorReason.status}\nMessage: ${errorReason.message}`);
          done();
        });
      });

      it('should call sendGetRequest and retry 3 times in case of error', () => {
        const spyRetry = jest.spyOn(Operators, 'retry');

        mockHttpClient.get.mockImplementation(() => defer(() => Promise.reject(errorReason)));
        service.sendGetRequest();

        expect(spyRetry).toHaveBeenCalledWith(3);

      });

      xit('should retry to call sendGetRequest 3 times', () => {
        const mockPipe = jest.fn().mockImplementation(() => { });

        mockHttpClient.get.mockImplementation(() => { return { pipe: mockPipe }; });

        service.sendGetRequest();
        expect(mockPipe).toHaveBeenCalledTimes(1);
        expect(mockPipe).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), expect.any(Function));
      });
    });
  });
});

