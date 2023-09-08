import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private appService: AppService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {


    this.loginForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  loginsubmit() {
    if (this.loginForm.valid) {
      const userlogin = this.loginForm.value;
      console.log('userlogin', userlogin);

      console.log('user', userlogin);
      this.appService.logins(userlogin).subscribe({
        next: (res) => {
          console.log('res', res);
          let a = res.res.token;

          localStorage.setItem('token', a);

          if (!a) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/stripe']);
          }
        },
        error: (err) => {
          console.log('error', err);
        },
      });
    }
  }

//   isAuthenticated(): boolean {
//         // console.log('isAuthenticated333333333333', this.isAuthenticated());

//     return !!localStorage.getItem('token');
//   }
  
}