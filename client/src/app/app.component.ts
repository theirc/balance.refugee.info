import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {CookieService} from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    date = {
        date: '21/12/2016'
    };
    translate: TranslateService;
    cookie: CookieService;

    constructor(translate: TranslateService, cookie: CookieService) {
        this.translate = translate;
        this.cookie = cookie;
        this.translate.setDefaultLang('en');
        const language = this.cookie.get('language');
        if (language) {
            this.translate.use(language);
        }
    }

    getDirection() {
        const rtlLanguages = ['ar', 'fa'];
        if (rtlLanguages.indexOf(this.translate.currentLang) > -1) {
            return 'rtl';
        }
            return 'ltr';
    }
}
