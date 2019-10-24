import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/shared/user.model';
import { Observable } from 'rxjs';
import { async } from 'q';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSession } from 'src/shared/user-session';
import { createSession } from '../auth/store/session.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor(
  //   private store: Store<{registerList:{allUsers:User[]}}>,
  //   private sessionStore: Store<{createSession:{session:UserSession}}>,
  //   private router:Router) { 
  // }
  errorMesssage: boolean = false;
  users: Observable<{ allUsers: User[] }>;
  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit(): void {}

  login(form: NgForm) {
    const value = form.value;

    this.users = this.store.select('registerList');

    this.users.subscribe(result => {
      result.allUsers.forEach(user => {

        if (user.email.toLocaleLowerCase() == value.email.toLocaleLowerCase() && user.password == value.password) {
          const sessionStartWith = new UserSession(true, new User(value.email, value.password, user.name));
          this.store.dispatch(new createSession(sessionStartWith));
          this.router.navigate(['/dashboard/book']);
        }
        this.errorMesssage = true;
      });
    })
  }

}
