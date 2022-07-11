import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { AuthResponse } from '../model/authResponse';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private configService: ConfigService,private router:Router) { }

  //user object to save user form details
  user: User = { EmployeeId: "", Password: "" }

  //reactive form for login
  userForm: FormGroup = new FormGroup({})

  //to display errors
  formError = ""

  ngOnInit(): void {

    //initialize the form
    this.userForm = new FormGroup({
      EmployeeId: new FormControl(this.user.EmployeeId, [
        Validators.required,
        Validators.minLength(3)
      ]),
      Password: new FormControl(this.user.Password, [
        Validators.required,
      ])
    })
  }

  get EmployeeId() { return this.userForm.get('EmployeeId') }
  get Password() { return this.userForm.get('Password') }

  //on submitting the form
  onSubmit() {
    console.log(this.userForm.value)
    
    let userDetails = { "EmployeeId": this.userForm.value.EmployeeId, "Password": this.userForm.value.Password, "empid": 0 }
    
    //retrive the data from the authmicroservice
    this.configService.getUserToken(userDetails).subscribe((data:AuthResponse)=>{
      
      //save the token in local storage
      localStorage.setItem("token",data["token"])
      
      //save the user id in local storage
      localStorage.setItem("userId",data['empid'])
      
      //navigate to the main page of the user
      this.router.navigate(['main'])
    },
    error =>{
      this.formError = "Credentials are incorrect"
      console.log(error)
    });

  }
}
