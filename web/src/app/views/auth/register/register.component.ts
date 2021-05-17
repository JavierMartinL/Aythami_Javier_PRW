import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public hidePassword: boolean;
  public hideRepeatPassword: boolean;
  private durationInSeconds: number = 5;
  private formRegister: FormGroup;

  private acceptConditions: boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.hidePassword = this.hideRepeatPassword = true;
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')
        ]
      ],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      acceptConditions: ['']
    });
  }

  register(): void {
    this.acceptConditions = this.formRegister.get('acceptConditions').value;
    console.log(this.formRegister.value);
    
    if (this.formRegister.valid && this.acceptConditions === true) {
      let name: string = this.formRegister.get('name').value;
      let email: string = this.formRegister.get('email').value;
      let password: string = this.formRegister.get('password').value;
      let repeatPassword: string = this.formRegister.get('repeatPassword').value;

      this.authService.register(name, email, password, repeatPassword).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.errorCreateUser(err.error);
        }
      );
    }
  }

  errorCreateUser(errors: any) {
    if (errors.message){
      let message = 'Ya existe un usuario con este E-mail.';
      this._snackBar.open(message, '', {
        duration: this.durationInSeconds * 1000
      });
    }
  }

  errorName(): string {
    return this.formRegister.get('name').hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  errorEmail(): string {
    if (this.formRegister.get('email').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.formRegister.get('email').hasError('email') || this.formRegister.get('email').hasError('pattern')) {
      return 'Escribe un E-mail correcto';
    }
    return '';
  }

  errorPassword(): string {
    if (this.formRegister.get('password').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    return '';
  }

  errorRepeatPassword(): string {
    if (this.formRegister.get('repeatPassword').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.formRegister.get('repeatPassword').hasError('passwordNotEqual')) {
      return 'Debe ser la misma contraseña';
    }
    return '';
  }
}