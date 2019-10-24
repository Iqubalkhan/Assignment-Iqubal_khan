import { Component, OnInit } from '@angular/core';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgForm, Form } from '@angular/forms';
import { Booking } from 'src/shared/booking.model';
import { Store } from '@ngrx/store';
import { bookingReducer } from './store/booking.reducer';
import { AdBooking } from './store/booking.actions';
import { UserSession } from 'src/shared/user-session';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-window',
  templateUrl: './booking-window.component.html',
  styleUrls: ['./booking-window.component.css']
})
export class BookingWindowComponent implements OnInit {
  maxDate: string;
  totalFare: number;
  showDialogue: boolean = false;
  currentSession: Observable<{ getsession: UserSession }>;
  emailId: any;
  cabForm: NgForm;
  selectedFrom: any;
  selectedTo: any;
  travelDate: any;
  depart: any = [];
  destination: any = [];
  startFrom = ["Banglore", "Hyderabad", "Chennai", "Indore"];
  endTo = ["Banglore", "Hyderabad", "Chennai", "Indore"];

  // constructor(private store: Store<{bookingHistory:{allBookings:Booking[]}}>,
  //   private sessionStore: Store<{createSession:{getsession:UserSession}}>) { }

  constructor(private store: Store<any>, private router:Router) { }

  ngOnInit() {
    this.depart = this.startFrom;
    this.destination = this.endTo;
    this.reload();
    this.minDate();

    this.getCurrentSession();
  }

  getCurrentSession() {
    this.currentSession = this.store.select("createSession");
    this.currentSession.subscribe(sessionData => {
      if (sessionData.getsession.sessionCheck) {
        this.emailId = sessionData.getsession.user.email;
      }
      //return this.router.createUrlTree(['/login']);
    })
  }
  
  //fare charges are generated random 
  confirmCab(form: NgForm) {
    this.totalFare = Math.floor(8000 + Math.random() * 1000)
    this.showDialogue = true;
    console.log(this.emailId);
    if(this.emailId==undefined){
      this.router.navigate(['/login']);
    }
    this.cabForm = form;
  }
  cancelCab() {
    this.showDialogue = false;
    this.cabForm.reset();
    this.reload();
  }

  bookAcab() {
    this.showDialogue = false;
    const values = this.cabForm.value;
    const value = this.cabForm.value;
    const bookedCab = new Booking(value.from, value.to, value.travelDate, this.totalFare ,this.emailId);
    this.store.dispatch(new AdBooking(bookedCab));
    this.cabForm.reset();
    this.reload();
    this.router.navigate(['/dashboard/history']);
  }

  reload() {
    this.selectedFrom = "none";
    this.selectedTo = "none";
  }

  //function provide the min date to disable the past dates in calender
  //it is not restricting manual entries
  minDate() {
    let dtToday = new Date();

    let month: any = dtToday.getMonth() + 1;
    let day: any = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();

    this.maxDate = year + '-' + month + '-' + day;
  }
}
