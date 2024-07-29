import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  public addRoom(room: any) {
    console.log("Inside addcustomer");
    return this.http.post(`${baseUrl}/request/api/room`, room);
  }
}
