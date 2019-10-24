import { Action } from '@ngrx/store';
import * as bookingActions from './booking.actions'
import { Booking } from 'src/shared/booking.model';

const initialState = {
    allBookings: []
}

export function bookingReducer(
    state = initialState,
    action: bookingActions.AdBooking
) {
    switch (action.type) {
        case bookingActions.BOOK_NEW_CAB:
            return {
                ...state,
                allBookings: [...state.allBookings, action.payload]
            };
        default:
            return state;
    }
}

