import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

import {LoggerService} from './logger.service';

describe('CalculatorService', () => {
  it('should add two numbers', () => {
    // const logger = new LoggerService();
    const logger = jasmine.createSpyObj('LoggerService', ['log']);
    logger.log.and.returnValue();
    const calculator = new CalculatorService(logger);
    // spyOn(logger, 'log');
    const result = calculator.add(2, 2 );
    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());
    const result = calculator.subtract(2, 2 );
    expect(result).toBe(0, 'Not expecting exception');
  });

});
