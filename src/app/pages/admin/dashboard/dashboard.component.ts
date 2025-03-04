import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  room={
    roomNumber:'',
    price:'',
    type:'',
    description:'',
    photoUrl:''
  };

  constructor(private roomService:RoomService,private snack:MatSnackBar) { }

  ngOnInit(): void { }

  formSubmit() {
    this.roomService.addRoom(this.room).subscribe(
      (data:any) => {
        Swal.fire("Success","Room added Successfully", "success")
        window.location.reload();
      },
      (error) => {
        if (error === 'Room already exist') {
          this.snack.open("Room already exist",'', {
            duration:5000
          })
        } 
        else {
          this.snack.open("Something went wrong !!", '', {
            duration: 3000
          });
        }
      }
    );
  }
}
