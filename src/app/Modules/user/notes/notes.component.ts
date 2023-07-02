import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { LoginService } from '../../auth/Services/login.service';
import { INoteGetPatientData } from '../interface/INoteGetPatientData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

   doctorId: string=this._LoginService.getUserId();
   data:INoteGetPatientData[]=[]
   errorMsg:string='';

  constructor(private router:Router,private _NoteService: NotesService, private _LoginService: LoginService){

  }
  ngOnInit(): void {
    this.GetAllPatientsNotes();
  }

  navigate(dayCustomPlanId:any,patientId:any): void
  {
    this.router.navigate([`/doctor/dash/CustomPlanDayMeal/${dayCustomPlanId}`],{ state: { patientId:patientId}});

  }

  GetAllPatientsNotes() {

      this._NoteService.GetPatientsNotesByDoctorId(this.doctorId).subscribe((resp) => {
        this.data = resp;

        console.log(this.data);
      }, error => {
        this.errorMsg = "Errrrrror"
      })


  }



}
