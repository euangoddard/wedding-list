import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { Gift, DialogCloseButton } from "../shared/models";


@Component({
  templateUrl: './admin-confirm.component.html',
  selector: 'app-admin-confirm',
})
export class AdminConfirmComponent implements OnInit {

  gift: Gift;

  constructor(
    private dialogRef: MdDialogRef<AdminConfirmComponent>,
  ) {}

  ngOnInit() {
    this.gift = this.dialogRef['gift'];
  }

  deleteGift() {
    this.dialogRef.close(DialogCloseButton.Ok);
  }

  cancel() {
    this.dialogRef.close(DialogCloseButton.Cancel);
  }
}