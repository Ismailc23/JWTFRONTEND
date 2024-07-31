import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.css']
})
export class RoomUpdateComponent implements OnInit {

  room={
    roomNumber:'',
    price:'',
    type:'',
    description:'',
    photoUrl:''
  };

  constructor(private roomService:RoomService,private snack:MatSnackBar,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const roomNumber = params.get('roomNumber');
      if (roomNumber) {
        this.getRoomDetails(roomNumber);
      }
    });
  }

  getRoomDetails(roomNumber: string) {
    this.roomService.getRoomByNumber(Number(roomNumber)).subscribe(
      (data: any) => {
        this.room = data;
      },
      (error) => {
        console.error('Error fetching room details:', error);
      }
    );
  }

  formSubmit() {
    console.log(this.room);
    this.roomService.updateRoom(Number(this.room.roomNumber),this.room).subscribe(
      (data:any) => {
        Swal.fire("Success","Room updated Successfully", "success")
        this.router.navigate(['room-list'])
      },
      (error) => {
            this.snack.open("Something went wrong !!", '', {
            duration: 3000
          });
        }
      
    );
  }

}
