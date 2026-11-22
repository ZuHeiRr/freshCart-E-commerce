import { TestBed } from '@angular/core/testing';

import { CustomFlowbiteService } from './custom-flowbite.service';

describe('CustomFlowbiteService', () => {
  let service: CustomFlowbiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFlowbiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
