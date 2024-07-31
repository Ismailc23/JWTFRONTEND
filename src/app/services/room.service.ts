import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  public addRoom(room: any) {
    console.log("Inside addcustomer");
    return this.http.post(`${baseUrl}/request/api/room`, room).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.status==400){
      errorMessage='Room already exist';
    }
    return throwError(errorMessage);
  }
}
