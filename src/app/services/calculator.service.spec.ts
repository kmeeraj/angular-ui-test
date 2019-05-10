import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

import {LoggerService} from './logger.service';

let calculator: CalculatorService;
let loggerSpy: any;

beforeEach(() => {
  console.log('calling before each');
  loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
  calculator = new CalculatorService(loggerSpy);
});

describe('CalculatorService', () => {
  it('should add two numbers', () => {

    console.log('add test');
    loggerSpy.log.and.returnValue();


    const result = calculator.add(2, 2 );
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('subtract test');
    const result = calculator.subtract(2, 2 );
    expect(result).toBe(0, 'Not expecting exception');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});
