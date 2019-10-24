import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Booking } from 'src/shared/booking.model';
import { Observable } from 'rxjs';
import { UserSession } from 'src/shared/user-session';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  listItems = [];
  bookingHistoryArray: Observable<{ allBookings: Booking[] }>
  keys: any;
  currentSession: Observable<{ getsession: UserSession; }>;
  emailId: string;

  constructor(private store: Store<any>,
    // private sessionStore: Store<{createSession:{getsession:UserSession}}>
  ) { }


  ngOnInit() {
    this.getCurrentSession();
    this.bookingHistoryArray = this.store.select('bookingHistory');
    this.bookingHistoryArray.subscribe(result => {
      result.allBookings.forEach(entry => {
        if (entry.emailId == this.emailId) {
          this.listItems.push(entry);
        }
      })
    })
    
    //creating table headers from booking history object and removing the emailid
    if (this.listItems.length != 0) {
      this.keys = Object.keys(this.listItems[0]);
      this.keys.pop();
    }
  }

  getCurrentSession() {
    this.currentSession = this.store.select("createSession");
    this.currentSession.subscribe(sessionData => {
      if (sessionData.getsession.sessionCheck) {
        this.emailId = sessionData.getsession.user.email;
      }
    })
  }


}
