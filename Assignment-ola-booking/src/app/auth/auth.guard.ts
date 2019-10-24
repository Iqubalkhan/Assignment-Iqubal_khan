import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSession } from 'src/shared/user-session';

/**
 * AuthGuard used to protect the dashboard from invalid user
 * every time it checks if user session is enabled
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{ createSession: { getsession: UserSession } }>,
    private router: Router) { }

  currentSession: Observable<{ getsession: UserSession }>;
  sessionFlag: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree {
    this.currentSession = this.store.select("createSession");
    this.currentSession.subscribe(sessionData => {
      if (sessionData.getsession.sessionCheck) {
        this.sessionFlag = sessionData.getsession.sessionCheck
        return true;
      }
    })
    return this.sessionFlag || this.router.createUrlTree(['/login']);
  };

}

