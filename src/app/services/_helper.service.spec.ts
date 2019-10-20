/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HelperService } from './_helper.service';

describe('Service: _helper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperService]
    });
  });

  it('should ...', inject([HelperService], (service: HelperService) => {
    expect(service).toBeTruthy();
  }));
});
