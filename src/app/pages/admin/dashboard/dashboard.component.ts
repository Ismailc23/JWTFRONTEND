import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

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
  }

  constructor(private roomService:RoomService) { }

  ngOnInit(): void {
  }

  
}
