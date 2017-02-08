/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LanguageSelectionComponent } from './language-selection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import { getTranslateLoader } from '../app.module';
import { HttpModule, Http} from '@angular/http';
import { CookieService} from 'angular2-cookie/services/cookies.service';

describe('LanguageSelectionComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      LanguageSelectionComponent
      ],
            providers: [CookieService],
            imports: [ RouterTestingModule, TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (getTranslateLoader),
            deps: [Http]
        }) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
