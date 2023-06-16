import { TestBed } from '@angular/core/testing';

import { RecipeServicesService } from './recipe-services.service';

describe('RecipeServicesService', () => {
  let service: RecipeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
