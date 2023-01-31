import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DepartamentsDTO,DepartamentsUpdateDTO}from './Departament'
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

  export class DepartamentService{
    departamentstUrl:string='https://localhost:7203/api/departaments';

    constructor(private http:HttpClient){

    }

    geDepartaments():Observable<responseDTO>{
        return this.http.get<responseDTO>(this.departamentstUrl,httpOptions);
    }  
    
    
    createDepartaments(enterprise:DepartamentsDTO):Observable<responseDTO>{
      return this.http.post<responseDTO>(this.departamentstUrl,enterprise,httpOptions);
    }


    updateDepartaments(enterprise:DepartamentsUpdateDTO,id:number):Observable<responseDTO>{
      return this.http.put<responseDTO>(`${this.departamentstUrl}/${id}`,enterprise,httpOptions);
    }
    
  }