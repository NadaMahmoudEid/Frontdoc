import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseurl = 'http://localhost:5268/api/Patient';

  constructor(private httpClient: HttpClient, private router: Router) {}

  GetPatientsByDoctorId(doctorId:string):Observable<any>{
    let params = new HttpParams().set('doctorId', doctorId);
    return this.httpClient.get<any>(`${this.baseurl}/GetPatientsByDoctorIdWithStatusConfirmed`,{params: params}).pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
}
