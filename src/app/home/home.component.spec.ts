import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import * as Operators from 'rxjs/operators';

import { HomeComponent } from './home.component';

const mockProducts = [{
  id: '1',
  name: 'test',
  description: 'test',
  price: '99',
  imageUrl: 'test',
  quantity: '1'
}];

const mockHttpClient = {
  get: jest.fn()
};

const mockHeaders = new HttpHeaders({ Link: '<http://localhost:3000/products?_page=1&_limit=4>; rel="first", <http://localhost:3000/products?_page=2&_limit=4>; rel="next", <http://localhost:3000/products?_page=75&_limit=4>; rel="last"' });

const mockResponse = new HttpResponse<any>({ body: mockProducts, headers: mockHeaders });

const mockApiService = {
  sendGetRequest: jest.fn(),
  sendGetRequestToUrl: jest.fn(() => defer(() => Promise.resolve(mockResponse))),
  first: 'http://localhost:3000/products?_page=1&_limit=4',
  next: 'http://localhost:3000/products?_page=2&_limit=4',
  prev: 'http://localhost:3000/products?_page=6&_limit=4',
  last: 'http://localhost:3000/products?_page=75&_limit=4'
};

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    component = new HomeComponent(mockApiService as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When Home Component inits', () => {

    beforeEach(() => {
      expect.hasAssertions();
      mockApiService.sendGetRequest.mockImplementationOnce(() => defer(() => Promise.resolve(mockResponse)));
    });

    it('should call sendGetRequest and return products', fakeAsync(() => {
      // Given I have the API mocked and resolving

      // When component inits
      component.ngOnInit();
      flushMicrotasks();

      // Then the products should be loaded
      expect(component.products).toBe(mockProducts);
    }));

  });

  describe('When I navigate the Home Component', () => {
    beforeEach(() => {
      mockApiService.sendGetRequestToUrl.mockImplementationOnce(() => defer(() => Promise.resolve(mockResponse)));
    });

    it('should load products from the first page', fakeAsync(() => {
      component.firstPage();
      flushMicrotasks();

      expect(component.firstPage).toBeTruthy();
      expect(component.products).toBe(mockProducts);
      // expect(mockApiService.sendGetRequestToUrl).toHaveBeenCalledWith(mockApiService.first);
    }));

    it('should load products when the previous page is called', fakeAsync(() => {
      component.previousPage();
      flushMicrotasks();

      expect(component.previousPage).toBeTruthy();
      expect(component.previousPage).not.toBeUndefined();
      expect(component.previousPage).not.toBeNull();
      expect(component.products).toBe(mockProducts);
    }));

    it('should load products when the next page is called', fakeAsync(() => {
      component.nextPage();
      flushMicrotasks();

      expect(component.nextPage).toBeTruthy();
      expect(component.nextPage).not.toBeUndefined();
      expect(component.nextPage).not.toBeNull();
      expect(component.products).toBe(mockProducts);
    }));

    it('should load products when the last page is called', fakeAsync(() => {
      component.lastPage();
      flushMicrotasks();

      expect(component.lastPage).toBeTruthy();
      expect(component.products).toBe(mockProducts);
    }));

  });


});
