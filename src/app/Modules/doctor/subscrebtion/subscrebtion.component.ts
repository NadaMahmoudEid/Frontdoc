import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../Service/doctor.service';
import { LoginService } from '../../auth/Services/login.service';
 
import { Router } from '@angular/router';
import { error } from 'jquery';

@Component({
  selector: 'app-subscrebtion',
  templateUrl: './subscrebtion.component.html',
  styleUrls: ['./subscrebtion.component.scss']
})
export class SubscrebtionComponent implements OnInit{

  waitingPatients!:any[];
  DoctorId!:string;
  AlertMsg: any;
  showAlert: boolean = false;

    constructor(private _DoctorService:DoctorService, private _LoginService:LoginService){}

  ngOnInit(): void {
  this.getDoctorId();
  this.GetAllWaitingPatient();
  }
 
  displayAlert(msg: string) {
    this.AlertMsg = msg;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000); 
  }
  getDoctorId()
  {
    this.DoctorId = this._LoginService.getUserId()
  }
  GetAllWaitingPatient()
  {
    this._DoctorService.getAllWaitingPatients(this.DoctorId).subscribe((response)=>{
      this.waitingPatients = response;
     
    })
  }
   AcceptPatient(Patientid: string) {

    let waitingPatient = {
      "patientId": Patientid,
      "doctorID": this.DoctorId
    }
    console.log(waitingPatient);
    this._DoctorService.acceptPatient(waitingPatient).subscribe((res)=>{
      if(res.msg=="NotFound"){
        this.displayAlert("ليس لديك خطه مناسبه للمريض ")
     
      }
      else if(res.msg=="Confirmed"){
        this.GetAllWaitingPatient()
        
      }
    },error=>{
      
      console.log("err",error)
    }
    )


  }
  trackByFunction(index: number, item: any): any {
    return item.noEat[0].patientId;
  }

  RejectPatient(Patientid:string)
  {
    let waitingPatient ={
      "patientId":Patientid,
        "doctorID": this.DoctorId
    }

    this._DoctorService.rejectPatient(waitingPatient).subscribe((response)=>{
       this.GetAllWaitingPatient();
    }),
    (error:any)=>{
      this.GetAllWaitingPatient();
    }


  }
  
}


