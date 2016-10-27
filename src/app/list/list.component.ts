import { Component, OnInit } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { IdentityService } from "../shared/identity/identity.service";
import { GiftClaimer, Gift } from "../shared/models";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  claimer: GiftClaimer;

  gifts: FirebaseListObservable<Gift[]>;

  isUnclaimedFilteringActive = false;

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
  }

  claimGift(gift: any): void {
    this.gifts.update(gift.$key, {claimer: this.identity.identity});
  }

  unclaimGift(gift: any): void {
    this.gifts.update(gift.$key, {claimer: null});
  }

}
