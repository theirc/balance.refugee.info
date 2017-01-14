import {Component, OnInit, HostBinding} from '@angular/core';
import {slideBackAnimation} from '../app.routes.animations';

@Component({
    selector: 'app-language-selection',
    templateUrl: './language-selection.component.html',
    styleUrls: ['./language-selection.component.scss'],
    animations: [slideBackAnimation]
})

export class LanguageSelectionComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;

    constructor() {
    }

    ngOnInit() {
    }

}
