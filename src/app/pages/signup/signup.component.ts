import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerUserDto = {
    email: '',
    password: '',
    fullName: ''
  };

  constructor(private userService: UserService, private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {}

  formSubmit() {
      this.userService.adduser(this.registerUserDto).subscribe(
      (data:any) => {
        Swal.fire("Success","Signed up succesfully", "success")
        this.router.navigate(['login'])
      },
      (error) => {
        if (error === 'Username already exists') {
          Swal.fire("Error", "Username already exists", "error");
        } 
        else {
          this.snack.open("Something went wrong !!", '', {
            duration: 3000
          });
        }
      }
    );
  }
}
