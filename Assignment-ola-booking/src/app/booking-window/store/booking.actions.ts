import { Action } from '@ngrx/store';
import { Booking } from 'src/shared/booking.model';

export const BOOK_NEW_CAB = 'BOOK_NEW_CAB';

export class AdBooking implements Action {
  readonly type = BOOK_NEW_CAB;
  constructor(public payload: Booking) { }

}
