import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/Services/login.service';
import { DoctorService } from '../Service/doctor.service';
import { data } from 'jquery';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
doctorID !:string
data!:any[]
  constructor(private _loginService:LoginService, private _doctorService:DoctorService,private route:Router) {
    
  }
  ngOnInit(): void {
    this.doctorID=this._loginService.getUserId();
     this._doctorService.GetDoctorPlans(this.doctorID).subscribe((resp)=>{
      this.data=resp
    })
  }

  GOToplan(planID:number){
    this.route.navigate([`/doctor/dash/Plan/${planID}`])
  }


}
