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
        this.loading = false;
      }
    );
  }

  deleteRoom(roomNumber:number) {
    Swal.fire({
    title: 'Are you sure?',
    text: "Action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete(`${baseUrl}/request/api/room/${roomNumber}`, { responseType: 'text' }).subscribe(
        response => {
          Swal.fire(
            'Deleted!',
            'Room has been deleted successfully.',
            'success'
          );
          this.fetchRooms(); // Refresh the room list
        },
        error => {
          this.snack.open("Something went wrong!", '', {
            duration: 3000
          });
        }
      );
    }
  });
}
}
