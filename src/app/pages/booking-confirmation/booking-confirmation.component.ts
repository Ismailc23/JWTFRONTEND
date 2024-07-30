import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {

  stayStartDate: string;
  stayEndDate: string;
  roomNumber: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stayStartDate = params['stayStartDate'];
      this.stayEndDate = params['stayEndDate'];
      this.roomNumber = params['roomNumber'];
    });
  }

  bookAnotherRoom() {
    this.router.navigate(['/availability-check-form']);
  }

}
