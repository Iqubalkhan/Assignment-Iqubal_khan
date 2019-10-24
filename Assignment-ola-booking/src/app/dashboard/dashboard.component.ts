import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSession } from 'src/shared/user-session';
import { Observable } from 'rxjs';
import { User } from 'src/shared/user.model';
import { createSession } from '../auth/store/session.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: any;
  users: Observable<{ allUsers: User[] }>;
  currentSession: Observable<{ getsession: UserSession; }>;
  // constructor(private sessionStore: Store<{createSession:{session:UserSession}}>,
  //   private store: Store<{createSession:{getsession:UserSession}}>,
  //   private router:Router) { }

  constructor(private store: Store<any>, private router: Router) { }


  ngOnInit() {
    this.currentSession = this.store.select("createSession");
    this.currentSession.subscribe(sessionData => {
      this.userName = sessionData.getsession.user.name;
    });
  }

  onLogout() {
    const sessionStartWith = new UserSession(false, new User("", "", ""));
    this.store.dispatch(new createSession(sessionStartWith));
    this.router.navigate(['/login']);
  }
}

