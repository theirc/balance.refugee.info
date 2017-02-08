/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import { getTranslateLoader } from './app.module';
import { HttpModule, Http} from '@angular/http';
import { CookieService} from 'angular2-cookie/services/cookies.service';
import { BalanceService } from './balance.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
            providers: [CookieService, BalanceService],
            imports: [ RouterTestingModule, TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (getTranslateLoader),
            deps: [Http]
        }) ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
