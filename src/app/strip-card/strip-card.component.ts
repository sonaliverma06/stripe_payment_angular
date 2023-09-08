import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
declare const Stripe: (arg0: string) => any;

@Component({
  selector: 'app-strip-card',
  templateUrl: './strip-card.component.html',
  styleUrls: ['./strip-card.component.css'],
})
export class StripCardComponent {
  products: any[] = [];
  stripeKey: string =
    'pk_test_51LriJGSB8OX1zXgAkbJm1NJvNQQRpxLG6TaviDZU43YJW1jc9yqlJ1XcoZVRnbFnaFzryIFR2Qouythj5gLEFgpP00FwWE7js6';
  constructor(private router: Router, private appService: AppService) {}

  ngOnInit() {
    this.getproductstripe();
  }
  async registerproduct(data: any): Promise<void> {
    console.log('data', data);
    const profile = await this.profileDetails();
    console.log('profile', profile);
    const data1 = {
      customer_id: profile.res.customer_id,
      email: profile.res.email,
      price: data.default_price,
    };
    this.appService.stripecheckout(data1).subscribe({
      next: (res: any) => {
        console.log('res', res);
        let strpe = Stripe(this.stripeKey);
        if (Object.keys(res).length > 0) {
          // window.location.pathname = res.res.url;
          strpe.redirectToCheckout({
            sessionId: res.res.id,
          });
        }
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }
  profileDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      const data1 = this.appService.profileDetails().subscribe({
        next: (res: any) => {
          resolve(res);
          data1.unsubscribe();
        },
        error: (err: any) => {
          resolve({});
          data1.unsubscribe();
        },
      });
    });
  }

  getproductstripe() {
    this.appService.stripeproduct().subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.products = res.res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
