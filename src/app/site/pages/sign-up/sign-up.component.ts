import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/core/services/cookie/cookie.service';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { passwordValidator } from 'src/app/utils/validators/form.validator';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  clientType: string = '';
  hireForm!: FormGroup;
  earnForm!: FormGroup;
  formInitialized: boolean = false;
  matcher = new MyErrorStateMatcher();
  //get form value from sessionStorage and convert to object
  formValue: any = JSON.parse(sessionStorage.getItem('formValue') || '{}');

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    //check if welcome page has been visited before, if not, redirect to welcome page and set cookie
    if (!this.cookieService.getCookie('welcome')) {
      this.cookieService.setCookie('welcome', 'true', 1);
      this.router.navigate(['/welcome'], {
        queryParams: {
          activeTab: 'entry'
        }
      });
    }
    //check if clientType exists in queryParams, if not navigate to activeTab.select in welcome page
    activatedRoute.queryParams.subscribe(params => {
      if (!params['clientType']) {
        this.router.navigate(['/welcome'], {
          queryParams: {
            activeTab: 'select'
          }
        });
      } else {
        this.clientType = params['clientType'];
      }
    });
  }

  ngOnInit(): void {
    //check if form has been initialized before
    if (sessionStorage.getItem('formInitialized') === 'true') {
      // check if formValue exists
      if (Object.keys(this.formValue).length > 0) {
        //initialize form using formValue
        if (this.clientType === 'hire') this.initHireForm(this.formValue);
        else if (this.clientType === 'earn') this.initHireForm();
      }
    }
  }

  //initialize form using clientType
  initHireForm(form?: any) {
    if (this.clientType === 'hire') {
      this.hireForm = new FormGroup({
        firstName: new FormControl(form?.firstName, [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl(form?.lastName, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(form?.email, [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, passwordValidator]),
        confirmPassword: new FormControl('', [Validators.required, this.checkConfirmPassword]),
      });
      this.toggleFormInitialized(true);
    } else {
      this.earnForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, passwordValidator]),
        confirmPassword: new FormControl('', [Validators.required, this.checkConfirmPassword]),
      });
      this.toggleFormInitialized(true);
    }

    //update formValue in sessionStorage
    this.hireForm.valueChanges.subscribe(val => {
      //check for errors in confirmPassword
      if (this.hireForm.get('confirmPassword')?.errors && this.hireForm.get('confirmPassword')?.value) {
        this.hireForm.get('confirmPassword')?.markAsTouched();
      }
      this.formValue = val;
      sessionStorage.setItem('formValue', JSON.stringify(this.formValue));
    });
    this.earnForm.valueChanges.subscribe(val => {
      //check for errors in confirmPassword
      if (this.earnForm.get('confirmPassword')?.errors && this.earnForm.get('confirmPassword')?.value) {
        this.earnForm.get('confirmPassword')?.markAsTouched();
      }
      this.formValue = val;
      sessionStorage.setItem('formValue', JSON.stringify(this.formValue));
    });
  }

  //toggle formInitialized
  toggleFormInitialized(stat: boolean) {
    this.formInitialized = stat;
    sessionStorage.setItem('formInitialized', stat.toString());
    if (!stat) {
      sessionStorage.removeItem('formValue');
    }
  }

  //check if confirm password is equal to password using a ValidatorFn
  checkConfirmPassword: ValidatorFn = (control: AbstractControl) => {
    const password = this.clientType === 'hire' ? this.hireForm?.get('password')?.value : this.earnForm?.get('password')?.value;
    if (password !== control.value) {
      return {
        notSame: {
          valid: true,
          message: 'Passwords must be the same!'
        }
      };
    }
    return null;
  };

  //toggle password visibility
  togglePasswordVisibility(input: any) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  submitHireForm() {
    console.log(this.hireForm.value);
  }

  submitEarnForm() {
    console.log(this.earnForm.value);
  }

  //go back to previous page
  goBack() {
    this.router.navigate(['/welcome'], {
      queryParams: {
        activeTab: 'select'
      }
    });
  }

}
