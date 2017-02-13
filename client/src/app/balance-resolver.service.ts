import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Balance, BalanceService} from './balance.service';

@Injectable()
export class BalanceResolverService implements Resolve<Balance> {

    constructor(private balanceService: BalanceService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Balance> {
        const id = route.params['id'];
        return this.balanceService.getBalance(id).then(balance => {
            if (balance) {
                return balance;
            } else {
                this.router.navigate(['/input']);
                return null;
            }
        });
    }
}
