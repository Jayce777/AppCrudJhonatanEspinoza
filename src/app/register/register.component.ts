import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../autentication/app.service';
import { Login } from '../autentication/auth';
import { Location } from '@angular/common'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [AuthService],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email = '';
  password = '';
  public loginValid = true;
  messageLogin='';

  constructor(private authsService: AuthService, private router: Router,
    private location: Location) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {

    //alert("aaa");
  }
  onSubmit() {
    const { email, password } = this.loginForm.value;

    const responseAutentication: Login = { email, password } as Login;
    this.authsService
      .register(responseAutentication)
      .subscribe(response => {
        this.messageLogin='User created successfuly!';
        this.loginValid = true;
        this.getToken(response.token);
        this.loginSuccess();
      },err => {
        const {error}=err;

        console.log(err);
        this.messageLogin='Email/Password is incorrect';
        this.loginValid = false;
      })

  }
  getToken(token: string) {
    return localStorage.setItem('token', token);
  }
  loginSuccess() {

    setTimeout(() => {
      this.router.navigateByUrl('/layout/enterprises');

    }, 3000);
  }

  back(): void {
    this.location.back()
  }

}
