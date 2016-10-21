import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';

import { FormComponent } from "../shared/forms";
import { validateEmail } from "../shared/forms/validators";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormComponent implements OnInit {

  constructor(
    private firebase: AngularFire,
    private auth: FirebaseAuth,
    private router: Router,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(isAuthenticated => {
        if (isAuthenticated) this.router.navigate(['/']);
      });

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required, validateEmail]],
    });
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  login() {
    this.firebase.auth.login(this.formData,
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(() => {
        this.router.navigate(['/identify']);
      }, err => {
        console.log(err);
        this.populateErrorMessagesFromServer(
          { password: [err.message] },
          this.errorsByField,
        );
      });
  }

  logout() {
    this.firebase.auth.logout();
  }

}
