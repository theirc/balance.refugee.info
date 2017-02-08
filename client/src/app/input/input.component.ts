import {Component, OnInit, HostBinding} from '@angular/core';
import {slideAnimation} from '../app.routes.animations';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    animations: [slideAnimation]
})

export class InputComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;

    constructor() {
    }

    ngOnInit() {
    }
}
