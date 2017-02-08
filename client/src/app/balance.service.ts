import {Injectable} from '@angular/core';


export class Balance {
    constructor(public cardId: string, public balance: number) { }
}


@Injectable()
export class BalanceService {

    constructor() {
    }

    getBalance(id) {
        return new Promise((resolve, reject) => {

        });
    }
}
