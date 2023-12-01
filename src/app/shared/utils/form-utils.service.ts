import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {
  public noWhitespaceValidator(control: AbstractControl) {
    return (control.value || '').trim().length ? null : { 'required': true };
  }

  public getErrorMessage(field: AbstractControl | null) {
    switch (true) {
      case field?.hasError('required'):
        return 'You must enter a value';
      case field?.hasError('min'):
        return 'The value is lower than minimal';
      default:
        return 'Error';
    }
  }
}