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
        irc_no: '',
        date_of_birth: ''
    };
    validationError = false;

    constructor(private balanceService: BalanceService, private router: Router) {
    }

    ngOnInit() {
    }

    submit() {
        this.balanceService.getBalance(this.form).then(response => {
            if (!response.ok) {
                this.validationError = true;
                this.form.date_of_birth = '';
            } else {
                this.validationError = false;
                const balance = response.json().balance;
                this.balanceService.updateBalance(balance);
                this.router.navigate(['/results']);
            }
        }).catch(error => {
            this.validationError = true;
            this.form.date_of_birth = '';
        })
    }

    /** Transforms users input to format with added backslashes ( DD/MM/YYYY ). */
    transformInput() {
        this.form.date_of_birth = this.form.date_of_birth.replace(/[^0-9]/g, '');
        let split = 2;
        let chunks = [];
        for (let i = 0; i < this.form.date_of_birth.length; i += split) {
            split = ( i >= 4 ) ? 4 : 2;
            chunks.push(this.form.date_of_birth.substr(i, split));
        }
        if (chunks) {
            this.form.date_of_birth = chunks.join('/');
        }
        else {
            this.form.date_of_birth = this.form.date_of_birth.replace(/[^0-9]/g, '');
        }
    }
}
