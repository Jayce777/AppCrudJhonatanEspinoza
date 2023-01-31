import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../autentication/app.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [AuthService],

})

export class LayoutComponent implements OnInit {

  constructor(private router: Router,private auth:AuthService) { }


  ngOnInit(): void {

    if(!this.auth.isAuteticated()){
      this.router.navigateByUrl('/');

    }
    //alert("aaa");
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');

  }

  getLogIn(){
    this.auth.isAuteticated();
  }
}
