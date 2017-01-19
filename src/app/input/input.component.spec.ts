/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslateLoader } from '../app.module';
import { HttpModule, Http} from '@angular/http';
import {ActivePageIndicatorComponent} from '../active-page-indicator/active-page-indicator.component';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          InputComponent,
          ActivePageIndicatorComponent
      ],
            imports: [
            RouterTestingModule,
            TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (getTranslateLoader),
            deps: [Http]
        }) ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
