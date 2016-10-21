import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidationErrorInfo } from "./models";
import { hasObjectItems } from "../utils";


export abstract class FormComponent {

  public form: FormGroup;

  public errorsByField = {};

  protected formData: any;

  get canSaveForm(): boolean {
    const hasErrors = hasObjectItems(this.errorsByField);
    const isFormPristine = this.form && this.form.pristine;
    return !(hasErrors || isFormPristine);
  }

  protected onValueChanged(data?: any) {
    this.errorsByField = {};
    if (data) {
      this.formData = this.filterFormDataForDirtyFields(this.form.controls, data);
    }
    this.populateErrorMessage(this.form.controls, this.errorsByField);
  }

  protected filterFormDataForDirtyFields(controls, formData) { // TODO: Add correct typings here
    let formDataFiltered = {};
    for (const controlName in controls) {
      let control: AbstractControl = controls[controlName];
      if (control && control.dirty) {
        let controlDirtyData;
        if (control instanceof FormGroup) {
          controlDirtyData = this.filterFormDataForDirtyFields(
            control.controls,
            formData[controlName],
          );
        } else {
          controlDirtyData = formData[controlName];
        }
        formDataFiltered[controlName] = controlDirtyData;
      }
    }
    return formDataFiltered;
  }

  private populateErrorMessage(controls, errorMessages): void {
    for (const controlName in controls) {
      let control: AbstractControl = controls[controlName];
      if (control && control.dirty && !control.valid) {
        if (control instanceof FormGroup) {
          let groupErrors = {};
          this.populateErrorMessage(
            control.controls,
            groupErrors,
          );
          if (hasObjectItems(groupErrors)) {
            this.errorsByField[controlName] = groupErrors;
          }

        } else {
          const messages: ValidationErrorInfo[] = [];
          for (const key in control.errors) {
            messages.push({
              type: key,
              context: control.errors[key],
            });
          }
          errorMessages[controlName] = messages;
        }
      }
    }
  }

  protected populateErrorMessagesFromServer(
    remoteErrorsByField: any,
    localErrorsByField: any
  ): void {
    for (const fieldName in remoteErrorsByField) {
      const fieldErrors = remoteErrorsByField[fieldName];
      if (fieldErrors instanceof Array) {
        localErrorsByField[fieldName] = fieldErrors.map(errorMessage => {
          return {
            type: 'verbatim',
            context: errorMessage,
          }
        });
      } else {
        localErrorsByField[fieldName] = {};
        this.populateErrorMessagesFromServer(
          fieldErrors,
          localErrorsByField[fieldName]
        );
      }
    }
  }
}
