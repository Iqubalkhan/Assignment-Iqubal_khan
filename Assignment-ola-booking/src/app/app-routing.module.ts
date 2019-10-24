import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingWindowComponent } from './booking-window/booking-window.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'book', component: BookingWindowComponent },
      { path: 'history', component: BookingHistoryComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
