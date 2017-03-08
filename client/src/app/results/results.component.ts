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
    updated: any;

    constructor(private balanceService: BalanceService) {
        this.balance = balanceService.getBalanceAsUSD();
        this.datePipe = new DatePipe('en-US');
        this.updated = {
            date: this.datePipe.transform(this.balanceService.updateDate, 'dd/MM/yyyy'),
            time: this.datePipe.transform(this.balanceService.updateDate, 'hh:mm a')
        };
    }

    ngOnInit() {
    }

}
