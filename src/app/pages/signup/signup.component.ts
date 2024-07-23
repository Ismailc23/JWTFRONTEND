import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack:MatSnackBar) { }

  public registerUserDto = {
    email: '',
    password: '',
    fullName: ''
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.registerUserDto);
    this.userService.adduser(this.registerUserDto).subscribe(
      (data:any) => {
        console.log(data);
        Swal.fire("Success","Signed up succesfully", "success")
      },
      (error) => {
        console.log(error);
        this.snack.open("Something went wrong !!",'',{
          duration:3000
        })
      }
    );
  }
}
