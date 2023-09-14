import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  getDetailsData:any = []
  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((ee: any) => {
      console.log('ee', ee);
      if (Object.prototype.hasOwnProperty.call(ee, 'session_id')) {
        this.appService.subretrieve(ee.session_id).subscribe({
          next: (res: any) => {
            console.log('res', res);
            if (Object.prototype.hasOwnProperty.call(res.res, 'subscription')) {
              this.router.navigate(['/dashboard']);
            }
          },
          error: (err: any) => {
            console.log('err', err);
          },
        });
      }
    });
  }


  ngOnInit():void {
    this.getDetails()
  }
  getSubs(data:any):void{
    console.log("data",data);
  }

  getDetails():void{
    this.appService.getDetails().subscribe({
      next:(res:any) => {
        console.log("res",res);
        if(res.res.error === false){
          const data1 = new Date()
          this.getDetailsData = res.res.data.map((i:any) => {
            const date2 = new Date(Number(i.subscription_expire) * 1000 )
            if(data1 < date2){
              return {...i,disable:false}
            }
            else{
              return {...i,disable:true}
            }
          })
        }
      },
      error:(err:any) => {
 console.log("err");
      }
    })
  }
}
