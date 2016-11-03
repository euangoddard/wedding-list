import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AngularFire,
  AuthProviders,
  AuthMethods,
  FirebaseAuth,
  FirebaseAuthState
} from "angularfire2";
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
    private formBuilder: FormBuilder,
  ) {
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
      isAdmin: [''],
      password: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  login() {
    this.firebase.auth.login({
        email: getEmailForUser(this.formData['isAdmin']),
        password: this.formData['password'],
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(() => {
      this.router.navigate(['/identify']);
    }, err => {
      this.populateErrorMessagesFromServer(
        {password: [err.message]},
        this.errorsByField,
      );
    });
  }

  logout() {
    this.firebase.auth.logout();
  }

}


function getEmailForUser(isAdmin: boolean): string {
  let email: string;
  if (isAdmin) {
    email = 'admin@wedding-list.org';
  } else {
    email = 'guest@wedding-list.org';
  }
  return email;
}
