import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import baseUrl from 'src/app/services/helper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css'],
  providers: [DatePipe]
})
export class AvailableRoomsComponent implements OnInit {

  stayStartDate: string;
  stayEndDate: string;
  availableRooms: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router,private datePipe:DatePipe) { }

 ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rawStartDate = params['stayStartDate'];
      const rawEndDate = params['stayEndDate'];
      this.stayStartDate = this.datePipe.transform(new Date(rawStartDate), 'yyyy-MM-dd');
      this.stayEndDate = this.datePipe.transform(new Date(rawEndDate), 'yyyy-MM-dd');

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

  bookRoom(roomNumber: number) {
    const customerId = sessionStorage.getItem('customerId');
    if (!customerId) {
      console.error('Customer ID not found in session storage');
      return;
    }

    const booking = {
      stayStartDate: this.stayStartDate,
      stayEndDate: this.stayEndDate
    };

    this.http.post(`${baseUrl}/api/customers/${customerId}/${roomNumber}`, booking).subscribe(
      (response) => {
        console.log('Booking successful', response);
        this.router.navigate(['/booking-confirmation'], { queryParams: { roomNumber, ...booking } });
      },
      (error) => {
        console.error('Error creating booking', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/availability-check-form']);
  }
}
