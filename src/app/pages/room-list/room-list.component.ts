import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import baseUrl from 'src/app/services/helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  loading: boolean = false;
  rooms: any[] = [];

  constructor(private http:HttpClient,private router:Router,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true;
    this.fetchRooms();
  }

  fetchRooms() {
    this.http.get<any[]>(`${baseUrl}/admin/roomlist`).subscribe(
      (response) => {
        this.rooms = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching rooms:', error);
        this.loading = false;
      }
    );
  }

  deleteRoom(roomNumber:number) {
    if(confirm("Are you sure you want to delete ? ")){
      console.log("Inside deletion");
      this.http.delete(`${baseUrl}/request/api/room/${roomNumber}`,{responseType:'text'}).subscribe(
        response =>{
          console.log("Room deleted succesfully : ",response)
          Swal.fire("Success","Room has been deleted Successfully", "success");
          window.location.reload();
        },
        error => {
          console.log(error);
          this.snack.open("Something went wrong !!",'',{
            duration:3000
          })
        }
      );
    }
  }
}
