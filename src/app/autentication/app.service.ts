import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Login } from './auth';
import { Observable } from 'rxjs';
import { ResponseAutentication } from './responseAutentication'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class AuthService {
  autenticationUrl: string = 'https://localhost:7203/api/autentication/login';
  registerUrl: string = 'https://localhost:7203/api/autentication/register';


  constructor(private http: HttpClient) {

  }


  autenticateLogin(login: Login): Observable<ResponseAutentication> {
    console.warn(login);

    return this.http.post<ResponseAutentication>(this.autenticationUrl, login, httpOptions);
  }

  register(login: Login): Observable<ResponseAutentication> {

    return this.http.post<ResponseAutentication>(this.registerUrl, login, httpOptions);
  }

  isAuteticated() {
    return localStorage.getItem('token');
  }



}