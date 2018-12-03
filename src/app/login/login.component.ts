import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/shared/service';
import { NgForm } from '@angular/forms';
import { User } from 'src/shared/user';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') form:NgForm
  
  user:User=new User();
  errorMessage: string = "Login or Password incorrect";
  isLoginFailed: boolean = false;
    
  constructor(private service:AppService,private rout:Router) { }

  ngOnInit() {
  }

  onSubmit(form:HTMLFormElement){
    this.user=new User(this.form.value.uname,this.form.value.psw);
    this.service.postUsers(this.user).subscribe(
      (data)=>{

        if(data != null){
          localStorage.setItem("userId",JSON.stringify(data.id));
          this.rout.navigateByUrl('home');
        }
        else{
          this.isLoginFailed = true;
          form.reset();
        }
   
      },(error)=> {
        this.isLoginFailed = true;
      
      }

    )
    
 
  }

}
