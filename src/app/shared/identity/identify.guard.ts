import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { IdentityService } from "./identity.service";

@Injectable()
export class IdentifyGuard implements CanActivate {
  constructor(private router: Router, private identity: IdentityService) {}

  canActivate(): boolean {
    const isIdentified = this.identity.isIdentified();
    if (!isIdentified) {
      this.router.navigate(['/identify']);
    } 
    return isIdentified; 
  }
}