import { TestBed } from '@angular/core/testing';

import { MoviesDbService } from './moviesdb.service';

describe('ThemoviedbService', () => {
  let service: MoviesDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
