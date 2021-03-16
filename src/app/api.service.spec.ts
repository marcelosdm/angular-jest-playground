import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service = new ApiService({} as HttpClient);
    expect(service).toBeDefined();
  });

  describe('it should sum two numbers and return 3', () => {
    const service = new ApiService({} as HttpClient)
    const sum = service.sum;
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });

  // describe('when call sendGetRequest', () => {
  //   it('should call HttpClient get properly', () => {
  //     // Given:

  //     // When:
  //     const service = new ApiService({} as HttpClient)
  //     const sendGetRequest = service.sendGetRequest();

  //     // Then:
  //     expect(sendGetRequest)
  //   });
  // });
});

