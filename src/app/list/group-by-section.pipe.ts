import { Pipe, PipeTransform } from '@angular/core';
import { GiftSection, Gift } from "../shared/models";
import { Observable } from "rxjs";

@Pipe({
  name: 'groupBySection'
})
export class GroupBySectionPipe implements PipeTransform {

  transform(gifts: Observable<Gift[]>): Observable<GiftSection[]> {
    return gifts.map((gifts: Gift[]) => {
      const sectionsWithGifts = [];
      const giftsGroupedBySection = groupBy(gifts, 'section');
      let sectionGifts: GiftSection[];
      for (let sectionName in giftsGroupedBySection) {
        sectionGifts = giftsGroupedBySection[sectionName];
        sectionsWithGifts.push({
          name: sectionName,
          gifts: sectionGifts
        });
      }
      return sectionsWithGifts;
    });
  }
}


function groupBy(collection: Array<any>, key: string): {[key: string]: Array<any>} {
  return collection.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
