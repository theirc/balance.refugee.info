import {Component, OnInit, HostBinding} from '@angular/core';
import {slideAnimation} from '../app.routes.animations';
import {BalanceService} from "../balance.service";

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    animations: [slideAnimation]
})

export class ResultsComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;

    balance: string;

    constructor(private balanceService: BalanceService) {
        this.balance = balanceService.getBalanceAsUSD();
    }

    ngOnInit() {
    }

}
