import { Component, Input } from "@angular/core";
import { ValidationErrorInfo } from "./models";

@Component({
  selector: 'field-errors',
  template: '<span *ngFor="let message of errors">{{ message }}</span>',
})
export class FieldErrorsComponent {

  @Input('errors') formErrors: any;

  @Input('for') fieldName: string;

  private static FIELD_NAME_SEPARATOR = '.';

  constructor() {

  }

  get errors(): string[] {
    let errorsFormatted: string[] = [];
    const fieldErrors = this.resolveFieldErrors(this.fieldName, this.formErrors);
    if (fieldErrors && fieldErrors.length) {
      errorsFormatted = fieldErrors.map(fieldError => {
        return this.formatError(fieldError);
      });
    }
    return errorsFormatted;
  }

  private resolveFieldErrors(fieldName: string, errors: any): ValidationErrorInfo[] {
    let fieldErrors;
    const fieldNameParts = fieldName.split(FieldErrorsComponent.FIELD_NAME_SEPARATOR);
    if (fieldNameParts.length === 1) {
      fieldErrors = errors[fieldName];
    } else {
      fieldErrors = this.resolveFieldErrors(
        fieldNameParts.slice(1).join(FieldErrorsComponent.FIELD_NAME_SEPARATOR),
        errors[fieldNameParts[0]] || {}
      );
    }
    return fieldErrors;
  }

  private formatError(error: ValidationErrorInfo): string {
    let errorMessage: string;
    const context = error.context;
    switch (error.type) {
      case 'required':
        errorMessage = 'Please enter a value';
        break;
      case 'minLength':
        errorMessage = `Please enter at least ${context.requiredLength} characters (you have ${context.actualLength})`;
        break;
      case 'maxLength':
        errorMessage = `Please enter at most ${context.requiredLength} characters (you have ${context.actualLength})`;
        break;
      case 'url':
        errorMessage = 'Please enter a valid URL';
        break;
      case 'email':
        errorMessage = 'Please enter a valid email address';
        break;
      case 'digits':
        errorMessage = 'Please enter a whole number';
        break;
      case 'number':
        errorMessage = 'Please enter a valid number';
        break;
      case 'verbatim':
        errorMessage = context;
        break;
      default:
        throw new Error(`Error type "${error.type}" is not supported!`);
    }
    return errorMessage;
  }
}