import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'active-page-indicator',
    templateUrl: './active-page-indicator.component.html',
    styleUrls: ['./active-page-indicator.component.scss']
})
export class ActivePageIndicatorComponent implements OnInit {
    @Input() elements: number;
    @Input() active: number;
    indicators: boolean[] = [];

    constructor() {
    }

    ngOnInit() {
        for (let i = 1; i <= this.elements; i++) {
            this.indicators.push(this.active === i);
        }
    }
}
