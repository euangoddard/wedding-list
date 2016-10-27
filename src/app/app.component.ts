import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { IdentityService } from "./shared/identity/identity.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Laura and Sam\'s Wedding List';

  constructor(
    private identity: IdentityService,
    private router: Router,
  ) {
  }

  get isIdentified(): boolean {
    return this.identity.isIdentified();
  }

  unidentify(): void {
    this.identity.clearIdentity();
    this.router.navigate(['identify']);
  }
}
