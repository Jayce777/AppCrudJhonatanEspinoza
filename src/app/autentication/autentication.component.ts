import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from './app.service';
import { Login } from './auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-autentication',
  templateUrl: './autentication.component.html',
  providers: [AuthService],
  styleUrls: ['./autentication.component.css']
})


@Injectable()
export class AutenticationComponent implements OnInit {
  title = 'appKnownlegdeJE';
  email = '';
  password = '';
  public loginValid = true;

  messageCannotLogin='';

  constructor(private authsService: AuthService, private router: Router) { }

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
      .autenticateLogin(responseAutentication)
      .subscribe(response => {
        this.loginValid = true;
        this.getToken(response.token);
        this.loginSuccess();
      },err => {
        const {error}=err;
        this.messageCannotLogin=error;
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


}
