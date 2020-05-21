import { TestBed } from '@angular/core/testing';

import { DualityAccessorService } from './duality-accessor.service';

describe('DualityAccessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DualityAccessorService = TestBed.get(DualityAccessorService);
    expect(service).toBeTruthy();
  });
});
