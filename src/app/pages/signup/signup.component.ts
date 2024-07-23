import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  public registerUserDto = {
    email: '',
    password: '',
    fullName: ''
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.registerUserDto);
    if (this.registerUserDto.email === '' || this.registerUserDto.email == null) {
      alert("Email is required");
      return;
    }

    this.userService.adduser(this.registerUserDto).subscribe(
      (data) => {
        console.log(data);
        alert("Signed Up successfully");
      },
      (error) => {
        console.log(error);
        alert("Something went wrong");
      }
    );
  }
}
