import { Pipe, PipeTransform } from '@angular/core';
import { Gift } from "../shared/models";
import { Observable } from "rxjs";

@Pipe({
  name: 'claimFilter'
})
export class ClaimFilterPipe implements PipeTransform {

  transform(gifts: Observable<Gift[]>, isUnclaimedFilteringActive: boolean): Observable<Gift[]> {
    return gifts.map((gifts: Gift[]) => {
      if (isUnclaimedFilteringActive) {
        gifts = gifts.filter(gift => {
          return !gift.claimer;
        });
      }
      return gifts;
    });
  }
}
