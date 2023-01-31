import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeDTO,EmployeeUpdateDTO}from './Employee'
import {responseDTO}from '../responseApi/responseDTO';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    })
  };

  
  @Injectable({
    providedIn: 'root'
  })

  
  export class EmployeeService{
    EmployeestUrl:string='https://localhost:7203/api/employees';

    constructor(private http:HttpClient){

    }

    geEmployees():Observable<responseDTO>{
        return this.http.get<responseDTO>(this.EmployeestUrl,httpOptions);
    }  
    
    
    createEmployees(employe:EmployeeDTO):Observable<responseDTO>{
      return this.http.post<responseDTO>(this.EmployeestUrl,employe,httpOptions);
    }


    updateEmployees(employe:EmployeeUpdateDTO,id:number):Observable<responseDTO>{
      return this.http.put<responseDTO>(`${this.EmployeestUrl}/${id}`,employe,httpOptions);
    }
    
  }