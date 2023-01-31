import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EnterpriseDTO,EnterpriseUpdateDTO}from './Enterprise'
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

export class EnterpriseService{
    enterpriseGetUrl:string='https://localhost:7203/api/enterprises';

    constructor(private http:HttpClient){

    }

    getEterprise():Observable<responseDTO>{
        return this.http.get<responseDTO>(this.enterpriseGetUrl,httpOptions);
    }  
    
    
    createEnterprise(enterprise:EnterpriseDTO):Observable<responseDTO>{
      return this.http.post<responseDTO>(this.enterpriseGetUrl,enterprise,httpOptions);
    }


    updateEnterprise(enterprise:EnterpriseUpdateDTO,id:number):Observable<responseDTO>{
      return this.http.put<responseDTO>(`${this.enterpriseGetUrl}/${id}`,enterprise,httpOptions);
    }
    
}