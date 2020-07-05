import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlErrorMessages } from '../../shared/types/controlErrorMessages.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  username: FormControl;
  password: FormControl;

  public isSignUp = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.initFormControls();
    this.user = new FormGroup({
      username: this.username,
      password: this.password
    })
  }

  private initFormControls(): void {
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/((?=.*\d)|(?=.*\W+))(?=.*[A-Z])(?=.*[a-z]).*$/)
    ])
  }
  onSubmit(): void {
    if (!this.isSignUp) {
      this.isSignUp = this.isSignUp;
      this.authService.signin(this.user.value)
        .subscribe((data) => {
          this.resetForm(this.user);
        })
    } else {
      console.log('Registr');
      this.authService.signUp(this.user.value)
        .subscribe((data) => {
          console.log(data);
        })
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
    return !this.isSignUp ?
      'Fill in your username and password to sign in.'
      : 'Start managing tasks easilly';
  }


  errorHandlerUsernameControl(): ControlErrorMessages {
    const onRequire = () => 'This field is required.'

    const onMaxLength = ({ requiredLength, actualLength }) => `Max length should be ${requiredLength} actual length is ${actualLength}.`
    
    const onMinLength = ({ requiredLength, actualLength }) => `Min length should be ${requiredLength} actual length is ${actualLength}.`

    const errors = {
      required: onRequire,
      minlength: onMinLength,
      maxlength: onMaxLength,
      default: () => ''
    }
    return errors;
  }

  errorHandlerPasswordControl(): ControlErrorMessages {
    const onRequire = () => 'This field is required.'

    const onPattern = () => 'Password should have at least one (UpperCase and LowerCase) letter and at least one number.'

    const onMinLength = ({ requiredLength, actualLength }) => `Length should be ${requiredLength} actual length is ${actualLength}.`

    const errors = {
      required: onRequire,
      pattern: onPattern,
      minlength: onMinLength,
      default: () => ''
    }
    return errors;
  }

  private resetForm(form: FormGroup): void {
    // Object.keys(form.controls).forEach(keyControl => {
    //   form.controls[keyControl].reset('');
    //   form.controls[keyControl].setErrors(null);
    // })
    form.reset();
  }
 
}
