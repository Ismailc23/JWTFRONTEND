import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css']
})
export class AvailableRoomsComponent implements OnInit {

  stayStartDate: string;
  stayEndDate: string;
  availableRooms: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router) { }

 ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stayStartDate = params['stayStartDate'];
      this.stayEndDate = params['stayEndDate'];

      this.http.get<any[]>(`${baseUrl}/api/available-rooms`, {
        params: {
          stayStartDate: this.stayStartDate,
          stayEndDate: this.stayEndDate
        }
      }).subscribe(
        (data) => {
          this.availableRooms = data;
        },
        (error) => {
          console.error('Error fetching available rooms', error);
        }
      );
    });
  }
  goBack() {
    this.router.navigate(['/availability-check-form']);
  }
}
