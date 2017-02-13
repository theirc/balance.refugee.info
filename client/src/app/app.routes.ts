import {Routes} from '@angular/router';

import {LanguageSelectionComponent} from './language-selection/language-selection.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {InputComponent} from './input/input.component';
import {ResultsComponent} from './results/results.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
    {
        path: 'language',
        component: LanguageSelectionComponent
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'input',
        component: InputComponent
    },
    {
        path: 'results',
        component: ResultsComponent,
        data: {title: 'Heroes List'}
    },
    {
        path: '',
        redirectTo: '/language',
        pathMatch: 'full'
    },
    {path: '**', component: PageNotFoundComponent}
];
