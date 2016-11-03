import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IdentityService } from "./shared/identity/identity.service";
import { FirebaseAuth, FirebaseAuthState, AngularFire } from "angularfire2";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Laura and Sam\'s Wedding List';

  constructor(
    private firebase: AngularFire,
    private auth: FirebaseAuth,
    private identity: IdentityService,
    private router: Router,
  ) {
  }

  get isSignedIn(): Observable<boolean> {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => {
        return !!authState && this.identity.isIdentified();
      }); 
  }

  signOut(): void {
    this.identity.clearIdentity();
    this.firebase.auth.logout();
    this.router.navigate(['login']);
  }
}
