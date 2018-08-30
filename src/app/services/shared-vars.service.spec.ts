import { TestBed, inject } from '@angular/core/testing';

import { SharedVarsService } from './shared-vars.service';

describe('SharedVarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedVarsService]
    });
  });

  it('should be created', inject([SharedVarsService], (service: SharedVarsService) => {
    expect(service).toBeTruthy();
  }));
});
