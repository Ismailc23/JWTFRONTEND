import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public addCustomer(customer: any) {
    console.log("Inside addcustomer");
    return this.http.post(`${baseUrl}/request/api/customer`, customer);
  }
}
