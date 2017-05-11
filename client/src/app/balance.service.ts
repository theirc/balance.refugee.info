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
    updateDate: string;
    retrieveURL = '/retrieve/';
    updateURL = '/update/';

    constructor(private http: Http) {
    }

    updateBalance(balance: number) {
        this.balance = balance;
    }

    getBalanceAsUSD(): string {
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

    getLastUpdate() {
        return this.http.get(`${environment.apiPath}${this.updateURL}`)
          .toPromise()
          .then(response => {
              this.updateDate = response.json().date;
              return Promise.resolve(response);
          }).catch(error => {
              return Promise.reject(error);
          });
    }
}
