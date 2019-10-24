import { Action } from '@ngrx/store';
import { UserSession } from 'src/shared/user-session';

export const CREATE_SESSION = 'CREATE_SESSION';

export class createSession implements Action {
  readonly type = CREATE_SESSION;
  constructor(public payload: UserSession) { }

}
