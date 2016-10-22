import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { FormComponent } from "../shared/forms/form.component";
import { FormBuilder, Validators } from "@angular/forms";
import { Gift } from "../shared/models";

@Component({
  templateUrl: './admin-form.component.html',
  selector: 'app-admin-form',
})
export class AdminFormComponent extends FormComponent implements OnInit {

  private gift: Gift;

  constructor(
    private dialogRef: MdDialogRef<AdminFormComponent>,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.gift = this.dialogRef['gift'];
    this.form = this.formBuilder.group({
      name: [this.gift.name || '', [Validators.required]],
      description: [this.gift.description || ''],
      link: [this.gift.link || ''],
      section: [this.gift.section || '', [Validators.required]],
    });
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  get action(): string {
    return (this.gift && this.gift.$key) ? 'Edit' : 'Add';
  }

  get canSaveForm(): boolean {
    return this.formData && this.formData.name && this.formData.section;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.formData);
  }
}