import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorMessages } from '../../shared/types/controlErrorMessages.interface';
import { getErrorsFromControl } from '../../shared/utils/formControlErrors';
import { MessagesService } from '../../shared/components/messages/messages.service';
import { MessagesTypes } from 'src/app/shared/components/messages/messages.types.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthStore } from '../services/auth.store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  username: FormControl;
  password: FormControl;

  public isSignUp = false;

  constructor(
    private authStore: AuthStore,
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.initFormControls();
    this.user = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  private initFormControls(): void {
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/((?=.*\d)|(?=.*\W+))(?=.*[A-Z])(?=.*[a-z]).*$/),
    ]);
  }
  onSubmit(): void {
    if (!this.isSignUp) {
      this.isSignUp = this.isSignUp;
      this.authStore.login(this.user.value).subscribe((data) => {
        this.resetForm(this.user);
        this.router.navigate(['/tasks']);
      });
    } else {
      this.authStore.registr(this.user.value).subscribe((data) => {});
      this.isSignUp = !this.isSignUp;
    }

    // this.isSignUp = !this.isSignUp ? this.isSignUp : !this.isSignUp;
    // this.resetForm(this.user);
  }

  onSignUp(): void {
    this.isSignUp = !this.isSignUp;

    this.resetForm(this.user);
  }

  getTitle(): string {
    return !this.isSignUp ? 'Login' : 'Join us';
  }

  getInputInfo(): string {
    return !this.isSignUp
      ? 'Fill in your username and password to sign in.'
      : 'Start managing tasks easilly';
  }

  errorHandlerUsernameControl(): string[] {
    const onRequire = () => 'This field is required.';

    const onMaxLength = ({ requiredLength, actualLength }) =>
      `Max length should be ${requiredLength} actual length is ${actualLength}.`;

    const onMinLength = ({ requiredLength, actualLength }) =>
      `Min length should be ${requiredLength} actual length is ${actualLength}.`;

    const errors = {
      required: onRequire,
      minlength: onMinLength,
      maxlength: onMaxLength,
      default: () => '',
    };
    return getErrorsFromControl(this.username, errors);
  }

  errorHandlerPasswordControl(): string[] {
    const onRequire = () => 'This field is required.';

    const onPattern = () =>
      'Password should have at least one (UpperCase and LowerCase) letter and at least one number.';
    const onMaxLength = ({ requiredLength, actualLength }) =>
      `Max length should be ${requiredLength} actual length is ${actualLength}.`;
    const onMinLength = ({ requiredLength, actualLength }) =>
      `Length should be ${requiredLength} actual length is ${actualLength}.`;

    const errors = {
      required: onRequire,
      pattern: onPattern,
      minlength: onMinLength,
      maxlength: onMaxLength,
      default: () => '',
    };
    return getErrorsFromControl(this.password, errors);
  }

  private resetForm(form: FormGroup): void {
    // Object.keys(form.controls).forEach(keyControl => {
    //   form.controls[keyControl].reset('');
    //   form.controls[keyControl].setErrors(null);
    // })
    form.reset();
  }
}
