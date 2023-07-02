import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AdminRegisterComponent,
    DoctorRegisterComponent,


  ],
  providers: [


  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule


  ]

})
export class AuthModule { }
