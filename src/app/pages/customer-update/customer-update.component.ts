import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customer={
    firstName:'',
    lastName:'',
    email:'',
    dateOfBirth:''
  };

  customerId: number;

  ageError: string = '';

  constructor(private customerService:CustomerService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.customerId = Number(sessionStorage.getItem('customerId'));
  }

  formSubmit() {
    if (this.isUnderage(this.customer.dateOfBirth)) {
      this.snack.open("Customer must be 18 years or older",'',{
          duration:3000
      })
      return;
    }
    this.customerService.updateCustomer(this.customerId,this.customer).subscribe(
      (data:any) => {
        console.log('Response data:', data);
        Swal.fire("Success","Customer Updated Successfully", "success")
        sessionStorage.setItem('customerName',data.firstName +' '+ data.lastName);
        this.router.navigate([`/customer-details/${data.customerId}`]);
      },
      (error) => {
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
