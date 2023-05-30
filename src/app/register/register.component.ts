import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from '../shared/base.component';
import { Store } from '@ngrx/store';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../auth/store/auth.actions';
import { appLoading } from '../shared/loader/store/loader.actions';
import { AppState } from '../shared/models/app-state.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent {
  public hideRegisterPassword: boolean = true;
  public hideRegisterRepeatPassword: boolean = true;

  public registerForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    username: new UntypedFormControl('', [Validators.required]),
    passwords: new UntypedFormGroup({
      password: new UntypedFormControl('', [Validators.required]),
      repeatPassword: new UntypedFormControl('', [Validators.required]),
    }, this.passwordConfirming),
  });
  
  constructor(
    private store: Store<AppState>,
  ) {
    super();
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(AuthActions.registerUser(
        {
          name: this.registerForm.get('name').value,
          username: this.registerForm.get('username').value,
          password: this.registerForm.get('passwords')?.get('password').value,
        }
      ));
    }
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('repeatPassword').value) {
      return { invalid: true };
    }
  }
  
  // ERRORS
  public getRegisterNameErrorMessage() {
    let name = this.registerForm.get('name');
    if (name.hasError('required')) {
      return 'Please enter your first name';
    }

    return name.hasError('name') ? 'Please enter a valid name' : '';
  }

  public getRegisterUsernameErrorMessage() {
    let username = this.registerForm.get('username');
    if (username.hasError('required')) {
      return 'Please enter your username';
    }

    return username.hasError('username') ? 'Please enter a valid username' : '';
  }

  public getRegisterUniqueNumberErrorMessage() {
    let uniqueUserNumber = this.registerForm.get('uniqueUserNumber');
    if (uniqueUserNumber.hasError('uniqueUserNumber')) {
      return 'Please enter your unique number';
    }

    return uniqueUserNumber.hasError('uniqueUserNumber') ? 'Please enter a valid unique number' : '';
  }

  public getPasswordErrorMessage() {
    let password = this.registerForm.get('passwords')?.get('password');
    if (password.hasError('required')) {
      return 'Please enter your password';
    }

    if (password.errors) {
      return 'Please enter a minimum of eight characters, at least one letter, one number and one special character';
    }
    // return password.hasError('password') ? 'Please enter a minimum of eight characters, at least one letter, one number and one special character' : '';
  }

  public getRepeatPasswordErrorMessage() {
    let repeatPassword = this.registerForm.get('passwords')?.get('repeatPassword');
    if (repeatPassword.hasError('required')) {
      return 'Please confirm your password';
    }

    let password = this.registerForm.get('passwords')?.get('password');
    if (password.errors) {
      return 'Please enter a valid password first';
    }

    if (repeatPassword.errors) {
      return 'Password does not match';
    }
    // return repeatPassword.hasError('repeatPassword') ? 'Password does not match' : '';
  }

  ngOnDestroy() {
    this.store.dispatch(AuthActions.resetErrorState());
  }
}
