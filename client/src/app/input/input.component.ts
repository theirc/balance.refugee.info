import {Component, OnInit, HostBinding} from '@angular/core';
import {slideAnimation} from '../app.routes.animations';
import {BalanceService} from "../balance.service";
import {Router} from '@angular/router';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    animations: [slideAnimation]
})

export class InputComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;

    form = {
        card_no: '',
        phone_no: ''
    };
    validationError = false;

    constructor(private balanceService: BalanceService, private router: Router) {
    }

    ngOnInit() {
    }

    submit() {
        this.balanceService.getBalance(this.form)
            .then(response => {
                if (!response.ok) {
                    this.validationError = true;
                    this.form.phone_no = '';
                } else {
                    this.validationError = false;
                    const balance = response.json().balance;
                    this.balanceService.updateBalance(balance);
                    this.router.navigate(['/results']);
                }
        }).catch(error => {
            this.validationError = true;
            this.form.phone_no = '';
        })
    }
}
