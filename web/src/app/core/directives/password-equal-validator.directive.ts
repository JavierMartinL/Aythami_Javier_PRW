import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Subscription } from "rxjs";

@Directive({
    selector: '[appPasswordEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PasswordEqualValidatorDirective,
        multi: true
    }]
})
export class PasswordEqualValidatorDirective implements Validator {
    @Input() appPasswordEqualValidator: string;
    validate(control: AbstractControl): ValidationErrors | null {
        const controlToCompare = control.parent.get(this.appPasswordEqualValidator);
        if (controlToCompare) {
            const subcription: Subscription = controlToCompare.valueChanges.subscribe(() =>{
                control.updateValueAndValidity();
                subcription.unsubscribe();
            }); 
        }

        return controlToCompare && controlToCompare.value !== control.value ? { 'passwordNotEqual': true } : null;
    }
}