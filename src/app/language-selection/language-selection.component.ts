import {Component, OnInit, HostBinding} from '@angular/core';
import {slideBackAnimation} from '../app.routes.animations';
import {TranslateService} from "ng2-translate";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
    selector: 'app-language-selection',
    templateUrl: './language-selection.component.html',
    styleUrls: ['./language-selection.component.scss'],
    animations: [slideBackAnimation]
})

export class LanguageSelectionComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    translate: TranslateService;
    router: Router;
    cookie: CookieService;

    constructor(translate: TranslateService, router: Router, cookie: CookieService) {
        this.translate = translate;
        this.router = router;
        this.cookie = cookie;
    }

    ngOnInit() {

    }

    setLanguage(language) {
        this.translate.use(language);
        this.cookie.put('language', language);
        this.router.navigate(['/welcome']);
    }

}
