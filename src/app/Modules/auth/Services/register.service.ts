import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _HttpClient:HttpClient) { }


  
  PatientRegitser(formData:object):Observable<any>{
    return this._HttpClient
    .post(`http://localhost:5268/api/Account/PatientRegister`,formData)
    }

  DoctorRegister(formData:object):Observable<any>{
    return this._HttpClient
    .post(`http://localhost:5268/api/Account/DoctorRegister`,formData)
    }


}
