import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { AvailabilityCheckFormComponent } from './pages/availability-check-form/availability-check-form.component';
import { AvailableRoomsComponent } from './pages/available-rooms/available-rooms.component';
import { BookingConfirmationComponent } from './pages/booking-confirmation/booking-confirmation.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { CustomerUpdateComponent } from './pages/customer-update/customer-update.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { RoomUpdateComponent } from './pages/room-update/room-update.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path: 'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'customer-form',
    component:CustomerFormComponent,
    pathMatch:'full',
    canActivate:[UserGuard]
  },
  {
    path:'availability-check-form',
    component:AvailabilityCheckFormComponent,
    pathMatch:'full',
    canActivate:[UserGuard]
  },
  {
    path:'available-rooms',
    component:AvailableRoomsComponent,
    pathMatch:'full',
    canActivate:[UserGuard]
  },
  {
    path:'booking-confirmation',
    component:BookingConfirmationComponent,
    pathMatch:'full',
    canActivate:[UserGuard]
  },
  { 
    path: 'customer-details/:id', 
    component:CustomerDetailsComponent,
    pathMatch:'full',
    canActivate:[UserGuard]
 },
 { 
   path: 'customer-update/:id', 
   component: CustomerUpdateComponent,
   pathMatch:'full',
   canActivate:[UserGuard] 
},
{
   path:'room-list',
   component:RoomListComponent,
   pathMatch:'full',
   canActivate:[AdminGuard]
},
{
  path:'room-update/:roomNumber',
  component:RoomUpdateComponent,
  pathMatch:'full',
  canActivate:[AdminGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
