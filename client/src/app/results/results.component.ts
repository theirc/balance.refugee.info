import {Component, OnInit, HostBinding} from '@angular/core';
import {slideAnimation} from '../app.routes.animations';
import {BalanceService} from "../balance.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    animations: [slideAnimation]
})

export class ResultsComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;

    private datePipe: DatePipe;
    balance: string;
    dateUpdated: any;

    constructor(private balanceService: BalanceService) {
        this.balance = balanceService.getBalanceAsUSD();
        this.datePipe = new DatePipe('en-US');
        this.dateUpdated = {
            dateUpdated: this.datePipe.transform(this.getLastUpdateDate(), 'dd/MM/yyyy')
        };
    }

    getLastUpdateDate() {
        let today = new Date();
        if (today.getHours() >= 12) {
            return Date.now();
        }
        return Date.now() - 24*60*60*1000;
    }

    ngOnInit() {
    }

}
