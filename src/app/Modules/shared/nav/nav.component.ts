import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/Services/login.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  UserRole !:string
  isLoggedIn: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  isLogin: boolean = false;
  public isPatient: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isDoctor: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isAdmin: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  testToken!: any;
  doctor:string="";
  patient:string=""

  constructor(private _LoginService: LoginService, private _Router: Router) {
    
   }
  
  ngOnInit(): void {
   this.doctor ="/auth/DoctorRegister";
  this.patient="/auth/Register"
  this.UserRole=this._LoginService.getUserRole()
    const userToken: string | null = localStorage.getItem('userToken');

    if (userToken !== null && userToken !== 'null') {
      this.isLoggedIn.next(1);
      this._LoginService.saveUserData() 
    } else {
      this.isLoggedIn.next(0);
      this._LoginService.userData.next(null); 
    }
    
      this.testToken = JSON.stringify(localStorage.getItem('userToken'));
      
      this._LoginService.userData.subscribe(() => {

        if (this._LoginService.userData.getValue() != null
          && this.testToken != null && localStorage.length !=0)  {

          this.isLoggedIn.next(1)
        }
        else {
          this.isLoggedIn .next(0);
          this.isPatient.next(0);
          this.isDoctor.next(0);
          this.isAdmin.next(0);

        }
        if (this.UserRole == "Patient") {
          this.isPatient.next(1);
        }
        else {
          this.isPatient.next(0);
        }
        if (this.UserRole == "Doctor") {
          this.isDoctor.next(1);
        }
        else {
          this.isDoctor.next(0);
        }

        if (this.UserRole == "Admin") {
          this.isAdmin.next(1);
        }
        else {
          this.isAdmin.next(0);
        }
      })
  
      
  }

  Logout() {
    this._LoginService.LogOut();
    this._Router.navigate(['home']);
    

  }
  

  selectrouter(event: Event) {
    const selectedRoute = (event.target as HTMLSelectElement).value;
    this._Router.navigateByUrl(selectedRoute);
  }
}