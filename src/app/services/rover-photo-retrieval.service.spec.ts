import { TestBed } from '@angular/core/testing';

import { RoverPhotoRetrievalService } from './rover-photo-retrieval.service';

describe('RoverPhotoRetrievalService', () => {
  let service: RoverPhotoRetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoverPhotoRetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
