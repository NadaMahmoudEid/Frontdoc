import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';




const routes: Routes = [
 
  { path: 'Login',component:LoginComponent},
  { path: 'Register',component:RegisterComponent },
  { path: 'AdminRegister',component:AdminRegisterComponent },
  { path: 'DoctorRegister',component:DoctorRegisterComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class AuthRoutingModule { }