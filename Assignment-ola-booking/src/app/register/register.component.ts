import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/shared/user.model';
import * as registerActions from './store/register-actions'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMesssage: boolean;
  errorEmail: string;
  users: Observable<{ allUsers: User[] }>;

  constructor(private store: Store<{ registerList: { allUsers: User[] } }>,
    private router: Router) { }

  ngOnInit() { }

  registerUser(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.email.toLocaleLowerCase(), value.password, value.name);
    this.users = this.store.select('registerList');
    this.users.subscribe(result => {
      result.allUsers.forEach(user => {
        if (user.email.toLocaleLowerCase() == newUser.email.toLocaleLowerCase()) {
          this.errorEmail = user.email;
          this.errorMesssage = true;
        }
      }
      );
      if (this.errorMesssage == true) {
        form.reset();
        return false;
      }
      this.users = this.store.select('registerList');
      this.store.dispatch(new registerActions.AddUser(newUser));
      this.router.navigate(['/login']);
    })

  }

  //To hide message for duplicate customer
  changeErrorMsg() {
    this.errorMesssage = false;
  }

}
