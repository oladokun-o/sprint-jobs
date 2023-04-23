import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

//generate password validations
export const passwordValidator = (control: FormGroup | FormControl) => {
    // check if password length is less than 8
    if (control.value.length < 8) {
        return {
            minlength: {
                valid: true,
                message: 'Password should be at least 8 characters long'
            }
        };
    }
    // check if password contains at least one number
    if (!/\d/.test(control.value)) {
        return {
            pattern: {
                valid: true,
                message: 'Password should contain at least one number'
            }
        };
    }
    // check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(control.value)) {
        return {
            pattern: {
                valid: true,
                message: 'Password should contain at least one uppercase letter'
            }
        };
    }
    // check if password contains at least one lowercase letter
    if (!/[a-z]/.test(control.value)) {
        return {
            pattern: {
                valid: true,
                message: 'Password should contain at least one lowercase letter'
            }
        };
    }
    // check if password contains at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(control.value)) {
        return {
            pattern: {
                valid: true,
                message: 'Password should contain at least one special character'
            }
        };
    }
    // check if password contains at least one space
    if (/\s/.test(control.value)) {
        return {
            space: {
                valid: true,
                message: 'Password should not contain any space'
            }
        };
    }
    return null;
};