import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {CookieService} from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    date: number = Date.now();

    constructor(private translate: TranslateService, private cookie: CookieService) {
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
