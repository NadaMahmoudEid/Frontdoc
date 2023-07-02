import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../CustomValidator/PassValidator';
import { ConfirmPassVaildators } from '../CustomValidator/ConfirmPassword';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {
  selectedFile!: File;
  constructor(private formBuilder: FormBuilder,private _router:Router) { }

  AdminRegisterForm = this.formBuilder.group({
    FullName: ['', [Validators.required,Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required ,Validators.minLength(6),Validators.maxLength(10),PasswordValidator]],
    confirmPassword: ['', [Validators.required]],
    ProfileImage:['',[Validators.required]]
   
  },{ validators: [ConfirmPassVaildators] }
  );
  get UserName() {
    return this.AdminRegisterForm.get('username');
  }

  get password() {
    return this.AdminRegisterForm.get('password');
  }

  get FullName() {
    return this.AdminRegisterForm.get('FullName');
  }
  get email() {
    return this.AdminRegisterForm.get('email');
  }

  get confirmPassword() {
    return this.AdminRegisterForm.get('confirmPassword');
  }
  get ProfileImage() {
    return this.AdminRegisterForm.get('ProfileImage')
  }

  ngOnInit(): void {
    
  }

  onSubmit(registerForm: any) {

    console.log('RegisterForm : ',registerForm.value);
    if (registerForm.valid) {
      console.log('Form submitted!');
      console.log('AdminRegisterForm : ', this.AdminRegisterForm.value);


      const formData =new FormData();
      formData.append('FullName', registerForm.get("FullName").value);
      formData.append('UserName', registerForm.get("username").value);
      formData.append('Email', registerForm.get("email").value);
      formData.append('Password', registerForm.get("password").value);
      formData.append('ConfirmPassword', registerForm.get("confirmPassword").value);
      formData.append('ProfileImage', this.selectedFile,this.selectedFile.name);
      console.log('formData : ',formData);
      this._router.navigate(["Home"])

    } else {
      console.log('Not Valid.');

    }
  }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    console.log(this.selectedFile)
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add(new File(['my-file'], 'new-file-name'));
    const inputElement: HTMLInputElement = document.getElementById('formFile') as HTMLInputElement

     inputElement.files = dataTransfer.files;
  }
 
}
