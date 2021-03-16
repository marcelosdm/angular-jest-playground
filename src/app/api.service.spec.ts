import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  const service = new ApiService({} as HttpClient);

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('Using matchers', () => {

    describe('With numbers', () => {
      const sum = service.sum;
      const multiply = service.multiply;

      test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
      });

      test('multiply two numbers', () => {
        expect(multiply(10, 2)).toBe(20);
      });

      test('nulo', () => {
        const n = null;
        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeUndefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
      })

      test('zero', () => {
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
      })

      test('dois mais dois', () => {
        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(4);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4);
        expect(value).toBe(4);
        expect(value).toEqual(4);
      })

      test('adicionando números de ponto flutuante', () => {
        const value = 0.1 + 0.2;
        expect(value).toBeCloseTo(0.3);
      })

      test('deve retornar total do carrinho de compras atualizado', () => {
        const totalValue = 100 * 2;
        expect(totalValue).toBeGreaterThan(100);
        expect(totalValue).toBeGreaterThanOrEqual(200);
        expect(totalValue).toBeLessThan(300);
        expect(totalValue).toBeLessThanOrEqual(200);
        expect(totalValue).toBe(200);
        expect(totalValue).toEqual(200);
      })
    })

    describe('With strings', () => {
      const team = "Nosso time é muito bom"
      test('Não existe "Eu" em "time"', () => {
        expect(team).not.toMatch(/Eu/);
      })
    });

    describe('With arrays and iterables', () => {
      const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'milk',
      ];

      test('the shopping list has milk on it', () => {
        expect(shoppingList).toContain('milk');
        expect(new Set(shoppingList)).toContain('milk');
      });
    });

    describe('With exceptions', () => {
      const compileExempleCode = service.compileExempleCode;

      test('compiling code goes as expected', () => {
        expect(() => compileExempleCode()).toThrow();
        expect(() => compileExempleCode()).toThrow(Error);

        expect(() => compileExempleCode()).toThrow('you are falling in this test error');
        expect(() => compileExempleCode()).toThrow(/error/);
      });
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

