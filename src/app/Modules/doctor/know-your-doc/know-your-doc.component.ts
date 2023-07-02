import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from '../Service/doctor.service';
import { IDoctor } from '../../shared/Interface/IDoctor';
import { IConnect } from '../Interface/IConnect';
import { LoginService } from '../../auth/Services/login.service';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-know-your-doc',
  templateUrl: './know-your-doc.component.html',
  styleUrls: ['./know-your-doc.component.scss']
})
export class KnowYourDocComponent {
  constructor(private _activeRoute: ActivatedRoute, private _doctorService: DoctorService,private _loginService:LoginService,private userService:UserService) { }
  Connect: IConnect = { doctorID: "", patientId: "" }
  appear: boolean = false;
  doctor!: IDoctor
  userID!:string
  IsSubscribed:boolean=false
  ngOnInit() {
    this.userID= this._loginService.getUserId()
    this.getDoctor()
    this.CheckSubscritbion(this.userID);
  }
  change(id: string) {
    console.log(id)
    this.appear = true;
    this.Connect.doctorID = id;
    this.Connect.patientId =    this.userID
    this._doctorService.Subscribe(this.Connect).subscribe({
      next: data =>
      {console.log(data)
      this.IsSubscribed=false},
      error: err => console.log(err)
    });
  }
  getDoctor() {
    this._activeRoute.paramMap.subscribe((parms: ParamMap) => {
      const id = parms.get('id');
      if (id) {
        console.log(id)
        this._doctorService.getSingleDoctor(id).subscribe({
          next: data => {
            console.log(data);
            this.doctor = data;
          },
          error: err => { console.log(err) }

        })
      }
    });
  }
  CheckSubscritbion(userID:string){
 this.userService.GetIFPatientInSubscription(userID).subscribe((resp)=>{

  console.log(resp.msg)
  if (resp.msg=='Not Confirmed in plan'){
   this.IsSubscribed=true
  }else{
    this.IsSubscribed=false

  }
})
  }


}
