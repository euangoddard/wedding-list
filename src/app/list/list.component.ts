import { Component, OnInit } from "@angular/core";
import { AngularFire } from "angularfire2";
import { IdentityService } from "../shared/identity/identity.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gifts: any;

  claimer: Claimer

  constructor(
    private firebase: AngularFire,
    private identity: IdentityService,
  ) { }

  ngOnInit() {
    this.claimer = this.identity.identity;
    //this.firebase.database.list('/gifts').push({name: 'Towels', section: 'Bathroom', claimedBy: null});
    this.gifts = this.firebase.database.list('/gifts').map(gifts => {
      const sectionsWithGifts = [];
      const giftsGroupedBySection = groupBy(gifts, 'section');
      let sectionGifts: Array<any>;
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


function groupBy (collection: Array<any>, key: string) {
  return collection.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


interface Claimer {
  name: string;
  email: string;
}
