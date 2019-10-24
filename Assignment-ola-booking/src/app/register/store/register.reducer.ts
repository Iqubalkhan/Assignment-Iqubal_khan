import { Action } from '@ngrx/store';
import * as registerActions from './register-actions'
import { User } from 'src/shared/user.model';
const initialState = {
    allUsers: [
        new User("admin@ola.com", "test", "Admin"),
        new User("test@ola.com", "test", "Test"),

    ]
}

export function registerReducer(
    state = initialState,
    action: registerActions.AddUser
) {
    switch (action.type) {
        case registerActions.ADD_NEW_USER:
            return {
                ...state,
                allUsers: [...state.allUsers, action.payload]
            };
        default:
            return state;
    }
}

