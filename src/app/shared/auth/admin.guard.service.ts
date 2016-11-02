import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs';


@Injectable()
export class AdminGuard implements CanActivate {

  private static ADMIN_UID = 'sTqPwvqxzcg97CtMiSOeBrYWjU93';

  constructor(private auth: FirebaseAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => authState && authState.uid === AdminGuard.ADMIN_UID)
      .do(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/']);
        }
      });
  }
}