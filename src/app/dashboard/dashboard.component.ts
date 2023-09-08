import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
constructor(private route:ActivatedRoute, private appService:AppService,private router:Router){
  this.route.queryParams.subscribe((ee:any) => {
    console.log("ee",ee)
    if(Object.prototype.hasOwnProperty.call(ee,"session_id")){
      this.appService.subretrieve(ee.session_id).subscribe({
        next:(res:any)=> {
          console.log("res",res)
          if (Object.prototype.hasOwnProperty.call(res.res, 'subscription')) {
            this.router.navigate(['/dashboard'])
          }
        },
        error:(err:any)=>{
          console.log("err",err)
        }
      })
    }
  })
}
}
