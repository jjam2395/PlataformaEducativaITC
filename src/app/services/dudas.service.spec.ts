import { TestBed, inject } from '@angular/core/testing';

import { DudasService } from './dudas.service';

describe('DudasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DudasService]
    });
  });

  it('should ...', inject([DudasService], (service: DudasService) => {
    expect(service).toBeTruthy();
  }));
});
