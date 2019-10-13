/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WeightsService } from './weights.service';

describe('Service: Firebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightsService]
    });
  });

  it('should ...', inject([WeightsService], (service: WeightsService) => {
    expect(service).toBeTruthy();
  }));
});
