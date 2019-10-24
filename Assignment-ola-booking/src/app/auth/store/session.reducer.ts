import { Action } from '@ngrx/store';
import * as sessionActions from './session.actions';
import { User } from 'src/shared/user.model';
import { UserSession } from 'src/shared/user-session';

const initialState = {
    getsession: new UserSession(
        false,
        new User("", "", ""))

};

/**
 * 
 * @param state
 * @param action 
 * session reducer will create a session with User object
 */
export function sessionReducer(
    state = initialState,
    action: sessionActions.createSession
) {
    switch (action.type) {
        case sessionActions.CREATE_SESSION:
            return {
                getsession: action.payload
            };
        default:
            return state;
    }
}

