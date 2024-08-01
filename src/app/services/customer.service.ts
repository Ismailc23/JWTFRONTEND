import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public addCustomer(customer: any) {
    return this.http.post(`${baseUrl}/request/api/customer`, customer);
  }

  getCustomerById(id: number){
    return this.http.get<any>(`${baseUrl}/request/api/customer/${id}`);
  }

  updateCustomer(id: number, customer: any) {
    return this.http.put(`${baseUrl}/request/api/customer/${id}`, customer);
  }
}
