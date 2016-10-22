import { Component, OnInit } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { IdentityService } from "../shared/identity/identity.service";
import { GiftClaimer, Gift, GiftSection } from "../shared/models";
import { Observable } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  giftSections: Observable<GiftSection[]>;

  claimer: GiftClaimer;

  private gifts: FirebaseListObservable<Gift[]>;

  constructor(
    private firebase: AngularFire,
    private identity: IdentityService,
  ) { }

  ngOnInit() {
    this.claimer = this.identity.identity;
    this.gifts = this.firebase.database.list('/gifts', {
      query: {
        orderByChild: 'name',
      }
    });
    this.giftSections = this.gifts.map((gifts: Gift[]) => {
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

  claimGift(gift: any): void {
    this.gifts.update(gift.$key, {claimer: this.identity.identity});
  }

}


function groupBy (collection: Array<any>, key: string): {[key: string]: Array<any>} {
  return collection.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
