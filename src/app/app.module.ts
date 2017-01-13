import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";

import {appRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {LanguageSelectionComponent} from './language-selection/language-selection.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {InputComponent} from './input/input.component';
import {ResultsComponent} from './results/results.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { ActivePageIndicatorComponent } from './active-page-indicator/active-page-indicator.component';


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
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
