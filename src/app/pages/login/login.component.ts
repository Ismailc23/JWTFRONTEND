import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserDto={
    email:'',
    password:''
  }

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {}

  formSubmit() {
    console.log("login btn clicked");
    this.loginService.loginGenerateToken(this.loginUserDto).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);
            if(this.loginService.getUserRole()=="ADMIN") {
              this.router.navigate(['admin']);
            }
            else if(this.loginService.getUserRole()=="USER") {
              this.router.navigate(['user-dashboard']);
            }
            else {
              this.loginService.logout();
            }
          }
        )
      },
      (error)=>{
        console.log("Error !");
        console.log(error);
      }
    )
  }
}
