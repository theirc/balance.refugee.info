import {Component, OnInit, HostBinding} from '@angular/core';
import {slideAnimation} from '../app.routes.animations';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    animations: [slideAnimation]
})
export class ResultsComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;

    balance: string = '55.31 $';

    constructor() {
    }

    ngOnInit() {
    }

}
