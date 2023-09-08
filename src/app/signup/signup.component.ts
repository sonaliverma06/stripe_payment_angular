import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private router: Router,
    private appService: AppService,
    private route: ActivatedRoute
  ) {}
  registerform!: FormGroup;


   ngOnInit() {
     this.registerform = new FormGroup({
       name: new FormControl(''),
       email: new FormControl(''),
       password: new FormControl(''),
       address: new FormControl(''),
       contect: new FormControl(''),
     });

   }

  onSubmit() {
    if (this.registerform.valid) {
      const user = this.registerform.value; 

      console.log('user', user);

      this.appService.add(user).subscribe({
        next: (res: any) => {
          console.log('res', res);
        },
        error: (err) => {
          console.log('error', err);
        },
      });
    }
  }
}
