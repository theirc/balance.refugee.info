/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BalanceResolverService } from './balance-resolver.service';

describe('BalanceResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BalanceResolverService]
    });
  });

  it('should ...', inject([BalanceResolverService], (service: BalanceResolverService) => {
    expect(service).toBeTruthy();
  }));
});
