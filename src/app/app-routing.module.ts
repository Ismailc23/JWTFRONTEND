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
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
