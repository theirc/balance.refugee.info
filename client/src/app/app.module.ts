import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {RouterModule} from "@angular/router";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import {CookieService} from 'angular2-cookie/services/cookies.service';

import {appRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {LanguageSelectionComponent} from './language-selection/language-selection.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {InputComponent} from './input/input.component';
import {ResultsComponent} from './results/results.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ActivePageIndicatorComponent} from './active-page-indicator/active-page-indicator.component';


export function getTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


@NgModule({
    declarations: [
        AppComponent,
        LanguageSelectionComponent,
        WelcomeComponent,
        InputComponent,
        ResultsComponent,
        PageNotFoundComponent,
        ActivePageIndicatorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (getTranslateLoader),
            deps: [Http]
        })
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
