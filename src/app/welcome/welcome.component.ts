import {Component, OnInit, HostBinding} from '@angular/core';
import {slideAnimation} from '../app.routes.animations';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    animations: [slideAnimation]
})

export class WelcomeComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;

    constructor() {
    }

    ngOnInit() {
    }

}
