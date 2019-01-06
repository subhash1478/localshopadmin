import { TestBed, inject } from '@angular/core/testing';

import { TimeConvertService } from './time-convert.service';

describe('TimeConvertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeConvertService]
    });
  });

  it('should be created', inject([TimeConvertService], (service: TimeConvertService) => {
    expect(service).toBeTruthy();
  }));
});
