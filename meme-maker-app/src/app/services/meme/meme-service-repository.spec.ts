import { TestBed } from '@angular/core/testing';

import { MemeServiceRepository } from './meme-service-repository';

describe('MemeServiceRepository', () => {
  let service: MemeServiceRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemeServiceRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
