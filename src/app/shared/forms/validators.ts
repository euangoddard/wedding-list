import { AbstractControl, Validators } from '@angular/forms';


export function validateEmail(control: AbstractControl): { [key: string]: boolean } {
  if (isPresent(Validators.required(control))) return null;

  let v: string = control.value;
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v) ? null : { 'email': true };
}


function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}