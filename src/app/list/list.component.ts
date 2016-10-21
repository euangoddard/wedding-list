import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gifts: any;

  constructor(
    private firebase: AngularFire,
  ) { }

  ngOnInit() {
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

}


function groupBy (collection: Array<any>, key: string) {
  return collection.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};