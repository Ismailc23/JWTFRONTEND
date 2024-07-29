import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-availability-check-form',
  templateUrl: './availability-check-form.component.html',
  styleUrls: ['./availability-check-form.component.css']
})
export class AvailabilityCheckFormComponent implements OnInit {

  stayStartDate: string;
  stayEndDate: string;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  checkAvailability() {
    this.router.navigate(['/available-rooms'], {
      queryParams: {
        stayStartDate: this.stayStartDate,
        stayEndDate: this.stayEndDate
      }
    });
  }

}
