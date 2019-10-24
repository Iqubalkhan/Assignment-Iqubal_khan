import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingWindowComponent } from './booking-window/booking-window.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { StoreModule } from '@ngrx/store';
import { registerReducer } from './register/store/register.reducer';
import { bookingReducer } from './booking-window/store/booking.reducer';
import { sessionReducer } from './auth/store/session.reducer';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    BookingWindowComponent,
    BookingHistoryComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ registerList: registerReducer, bookingHistory: bookingReducer, createSession: sessionReducer }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
