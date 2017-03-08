import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {BalanceService} from "./balance.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    date: string;

    constructor(private translate: TranslateService, private cookie: CookieService, private balanceService: BalanceService) {
        this.translate.setDefaultLang('en');
        const language = this.cookie.get('language');
        if (language) {
            this.translate.use(language);
        }
    }

    ngOnInit() {
        this.balanceService.getLastUpdate().then((response) => {
            this.date = this.balanceService.updateDate;
        })
    }

    getDirection() {
        const rtlLanguages = ['ar', 'fa'];
        if (rtlLanguages.indexOf(this.translate.currentLang) > -1) {
            return 'rtl';
        }
        return 'ltr';
    }
}
