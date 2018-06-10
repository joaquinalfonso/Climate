import { TestBed, inject } from '@angular/core/testing';

import { IrrisatService } from './irrisat.service';

describe('IrrisatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IrrisatService]
    });
  });

  it('should be created', inject([IrrisatService], (service: IrrisatService) => {
    expect(service).toBeTruthy();
  }));
});
