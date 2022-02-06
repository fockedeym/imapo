import { TestBed } from '@angular/core/testing';

import { ImapoService } from './imapo.service';

describe('ImapoService', () => {
  let service: ImapoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImapoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
