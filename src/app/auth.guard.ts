import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(private router: Router, private appService: AppService) {}
  private getValueFromObservable(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.appService.profileDetails().subscribe({
        next: (res: any) => {
          // console.log('resggggggggggg', res);

          subscription.unsubscribe();
          resolve(res);
        },
        error: (err: any) => {
          subscription.unsubscribe();
          resolve({});
        },
      });
    });
  }

  private getValueForSub(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.appService.getSubDetails(id).subscribe({
        next: (res: any) => {
          // console.log('resggggggggggg', res);

          subscription.unsubscribe();
          resolve(res.res);
        },
        error: (err: any) => {
          subscription.unsubscribe();
          resolve({});
        },
      });
    });
  }
  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const authCheck = await this.getValueFromObservable();
    if (Object.keys(authCheck).length > 0) {
      const subscription1: any = authCheck.res.signup_subscriptions.sort(
        (a: any, b: any) =>
          Number(b.subscription_expire) - Number(a.subscription_expire)
      );
      if (Array.isArray(subscription1)) {
        console.log('subscription1', subscription1[0].subscription_expire);
        if (subscription1.length > 0){
           const getSubsp = await this.getValueForSub(
             subscription1[0].subscription_id
           );
           if (Object.keys(getSubsp).length > 0) {
            const data1 = new Date(Number(getSubsp.current_period_end) * 1000);
            const date2 = new Date();
            console.log('dat1', date2 < data1);
            if (date2 < data1) {
              //  this.router.navigate(['/dashboard']);
              return true;
            } else {
              this.router.navigate(['/stripe']);
              return false;
            }
           }else{
            this.router.navigate(['/stripe']);
            return false;
           }

        }
        else{
           this.router.navigate(['/stripe']);
           return false;
        }

      } else {
        this.router.navigate(['/stripe']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};
