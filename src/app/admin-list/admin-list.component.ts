import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Gift } from "../shared/models";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  gifts: FirebaseListObservable<Gift[]>;

  constructor(
    private firebase: AngularFire,
  ) { }

  ngOnInit() {
    this.gifts = this.firebase.database.list('/gifts');
  }

}
