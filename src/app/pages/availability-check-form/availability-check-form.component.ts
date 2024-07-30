import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-availability-check-form',
  templateUrl: './availability-check-form.component.html',
  styleUrls: ['./availability-check-form.component.css']
})
export class AvailabilityCheckFormComponent implements OnInit {

  stayStartDate: Date;
  stayEndDate: Date;
  minDate: Date = new Date();
  errorMessage:String;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  checkAvailability() {
    const startDate = new Date(this.stayStartDate);
    const endDate = new Date(this.stayEndDate);

    // Validate that the start date is before the end date
    if (startDate >= endDate) {
      this.errorMessage = "Stay start date must be before the stay end date.";
      return;
    }

    // Validate that the number of days between start and end date is not more than 30
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    if (diffInDays > 30) {
      this.errorMessage = "The stay period cannot exceed 30 days.";
      return;
    }

    // If validation passes, navigate to available rooms page
    this.errorMessage = null;
    this.router.navigate(['/available-rooms'], {
      queryParams: {
        stayStartDate: startDate.toISOString(),
        stayEndDate: endDate.toISOString()
      }
    });
  }

}
