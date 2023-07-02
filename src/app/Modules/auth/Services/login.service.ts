import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData = new BehaviorSubject(null);
  userInfo: any = null;
  UserDataDecode!: any
  loginUserName: string = '';
  loginUserID: string = '';
  decodedToken: any;
  loginUserRole: string = '';
  constructor(private _HttpClient: HttpClient,private _Router:Router) { }

  Login(formData: object): Observable<any> {

    return this._HttpClient.post('http://localhost:5268/api/Account/Login', formData);

  }
  getToken() {
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.decodedToken = jwtDecode(encodedUserData);
    console.log("codedToken",this.decodedToken);
    return this.decodedToken;
  }

  saveUserData() {
    let codedUserData = this.getToken();
    this.userData.next(codedUserData);
   console.log(this.userData);
 
 }

  getUserName() {

    this.userInfo = this.getToken();
    console.log(this.userData);
    this.loginUserName = this.userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    console.log(this.loginUserName);
    return this.loginUserName

  }

  getUserId() {
    this.UserDataDecode = this.getToken();
    console.log("USerDataDecode", this.UserDataDecode)
    this.loginUserID = this.UserDataDecode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    console.log("USerDataDecodeID", this.loginUserID)
    return this.loginUserID

  }

  getUserRole() {
    let encodedUserData = this.getToken();
    console.log(encodedUserData);
    this.loginUserRole = encodedUserData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(this.loginUserRole);
    return this.loginUserRole;
  }
 

  LogOut() {
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._Router.navigate(['Login']);
  }



}