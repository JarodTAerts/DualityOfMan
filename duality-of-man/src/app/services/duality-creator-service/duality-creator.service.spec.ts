import { TestBed } from '@angular/core/testing';

import { DualityCreatorService } from './duality-creator.service';

describe('DualityCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DualityCreatorService = TestBed.get(DualityCreatorService);
    expect(service).toBeTruthy();
  });
});
