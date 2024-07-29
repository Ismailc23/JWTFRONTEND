import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouteReuseStrategy } from '@angular/router';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer={
    firstName:'',
    lastName:'',
    email:'',
    dateOfBirth:''
  };

  ageError: string = '';

  constructor(private customerService:CustomerService,private snack:MatSnackBar,private router:Router) { }


  ngOnInit(): void {
  }

  formSubmit() {
    if (this.isUnderage(this.customer.dateOfBirth)) {
      this.snack.open("Customer must be 18 years or older",'',{
          duration:3000
        })
      return;
    }
    console.log(this.customer);
    this.customerService.addCustomer(this.customer).subscribe(
      (data:any) => {
        Swal.fire("Success","Customer added Successfully", "success")
        sessionStorage.setItem('customerId', data.customerId);
        this.router.navigate(['availability-check-form'])
      },
      (error) => {
        console.log(error);
        this.snack.open("Something went wrong !!",'',{
          duration:3000
        })
      }
    );
  }

  isUnderage(dob: string): boolean {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age < 18;
  }

}
