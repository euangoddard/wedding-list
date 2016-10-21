import { Pipe, PipeTransform } from '@angular/core';
import { IdentityService } from "../shared/identity/identity.service";

@Pipe({
  name: 'isClaimedByCurrentUser'
})
export class ClaimPipe implements PipeTransform {

  constructor(private identity: IdentityService) {

  }

  transform(gift: any): boolean {
    return gift.claimer.email === this.identity.identity.email;
  }

}
