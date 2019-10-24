import { Action } from '@ngrx/store';
import { User } from 'src/shared/user.model';

export const ADD_NEW_USER = 'ADD_NEW_USER';

export class AddUser implements Action {
  readonly type = ADD_NEW_USER;
  constructor(public payload: User) { }

}
