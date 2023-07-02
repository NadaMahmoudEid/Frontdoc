import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INoteGetPatientData } from '../interface/INoteGetPatientData';
import { INoteGetDoctorData } from '../interface/INoteGetDoctorData';
import { IDoctorNoteDto } from '../interface/IDoctorNoteDto';
import { IPatientNoteData } from '../interface/IPatientNoteData';
import { IDoctorNoteData } from '../interface/IDoctorNoteData';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient: HttpClient, private router: Router) {

  }



  AddPatientNote(PatientNoteData: IPatientNoteData): Observable<any> {

    return this.httpClient.post<IPatientNoteData>('http://localhost:5268/api/Patient/AddPatientNote', PatientNoteData);
  }
  AddDoctorNote(DoctorNoteData: IDoctorNoteData): Observable<any>
  {
     return this.httpClient.post<IDoctorNoteData>('http://localhost:5268/api/Doctor/AddDoctorNote',DoctorNoteData);
  }

  GetPatientsNotesByDoctorId(doctorId:string): Observable<INoteGetPatientData[]>{

    return this.httpClient.get<INoteGetPatientData[]>(`http://localhost:5268/api/Patient/GetPatientsNotesByDodId/${doctorId}`);
  }

  GetDoctorNotes(doctorNoteDto: IDoctorNoteDto): Observable<INoteGetDoctorData[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'

    });

    return this.httpClient.post<INoteGetDoctorData[]>("http://localhost:5268/api/Doctor/GetDoctorNotes", doctorNoteDto, { headers });
  }
}
