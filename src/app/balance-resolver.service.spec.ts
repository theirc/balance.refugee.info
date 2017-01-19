/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BalanceResolverService } from './balance-resolver.service';
import { BalanceService } from './balance.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import { getTranslateLoader } from './app.module';
import { HttpModule, Http} from '@angular/http';

describe('BalanceResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
            providers: [RouterTestingModule, BalanceResolverService, BalanceService],
            imports: [ RouterTestingModule, TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (getTranslateLoader),
            deps: [Http]
        }) ]
    });
  });

  it('should ...', inject([BalanceResolverService], (service: BalanceResolverService) => {
    expect(service).toBeTruthy();
  }));
});
