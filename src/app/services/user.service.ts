import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public adduser(registerUserDto: any) {
    return this.http.post(`${baseUrl}/auth/registrationMethod`, registerUserDto).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.status==409){
      errorMessage='Username already exists';
    }
    return throwError(errorMessage);
  }
}
