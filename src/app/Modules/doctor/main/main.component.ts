import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/Services/login.service';
import { DoctorService } from '../Service/doctor.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  userName:String | undefined;
  decodedImage: any;



  constructor (private loginservice:LoginService , private _doctorService:DoctorService){

  }
  ngOnInit(): void {

    this.userName=  this.loginservice.getUserName();
    this._doctorService.GetDoctorImg(this.loginservice.getUserId()).subscribe((resp)=>{
      this.decodedImage=resp.img
      console.log("userImg",this.decodedImage)
    })


  }

}
