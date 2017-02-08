/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import { getTranslateLoader } from '../app.module';
import { HttpModule, Http} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivePageIndicatorComponent} from '../active-page-indicator/active-page-indicator.component';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
           ResultsComponent,
           ActivePageIndicatorComponent
       ],
      imports: [RouterTestingModule, TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (getTranslateLoader),
            deps: [Http]
        })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
