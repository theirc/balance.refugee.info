import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/toPromise';

class Balance {
    balance: number;
}

@Injectable()
export class BalanceService {

    balance: number;
    retrieveURL = '/retrieve/';

    constructor(private http: Http) {
    }

    updateBalance(balance: number) {
        this.balance = balance;
    }

    getBalanceAsUSD() {
        if (this.balance) {
            return `${this.balance.toFixed(2)} $`;
        } else {
            return '';
        }
    }

    getBalance(data) {
        return this.http.post(`${environment.apiPath}${this.retrieveURL}`, data)
            .toPromise()
            .then(response => {
                return response;
            }).catch(error => {
                return Promise.reject(error);
            });
    }
}
