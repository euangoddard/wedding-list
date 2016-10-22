import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { MdDialog, MdDialogConfig, MdDialogRef } from "@angular/material";
import { AdminFormComponent } from "./admin-form.component";
import { AdminConfirmComponent } from "./admin-confirm.component";
import { Gift, DialogCloseButton } from "../shared/models";


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  gifts: FirebaseListObservable<Gift[]>;

  dialogRef: MdDialogRef<AdminFormComponent>;

  confirmDialogRef: MdDialogRef<AdminConfirmComponent>;

  constructor(
    private firebase: AngularFire,
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.gifts = this.firebase.database.list('/gifts');
  }

  createGift(): void {
    this.openFormDialog();
  }

  editGift(gift: Gift): void {
    this.openFormDialog(gift);
  }

  deleteGift(gift): void {
    let config = this.getDialogConfig();
    this.confirmDialogRef = this.dialog.open(AdminConfirmComponent, config);
    this.confirmDialogRef['gift'] = gift || {};
    this.confirmDialogRef.afterClosed().subscribe((dialogCloseButton?: DialogCloseButton) => {
      if (dialogCloseButton === DialogCloseButton.Ok) {
        this.gifts.remove(gift);
      }
      this.confirmDialogRef = null;
    });
  }

  private openFormDialog(gift?: Gift): void {
    let config = this.getDialogConfig();
    this.dialogRef = this.dialog.open(AdminFormComponent, config);
    this.dialogRef['gift'] = gift || {};

    this.dialogRef.afterClosed().subscribe(giftEdited => {
      if (giftEdited) {
        if (gift && gift.$key) {
          this.gifts.update(gift.$key, giftEdited);
        } else {
          this.gifts.push(giftEdited);
        }
      }
      this.dialogRef = null;
    });
  }

  private getDialogConfig(): MdDialogConfig {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    return config;
  }

}
