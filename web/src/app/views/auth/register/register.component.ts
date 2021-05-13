import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public hidePassword: boolean;
  public hideRepeatPassword: boolean;
  private formRegister: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.hidePassword = this.hideRepeatPassword = true;
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  register() {
    if (this.formRegister.valid) {
      let name: string = this.formRegister.get('name').value;
      let email: string = this.formRegister.get('email').value;
      let password: string = this.formRegister.get('password').value;
      let repeatPassword: string = this.formRegister.get('repeatPassword').value;

      this.authService.register(name, email, password, repeatPassword).subscribe(
        data => {
          console.log(data);       
        }
      );
    }
  }

  errorName(): string {
    return this.formRegister.get('name').hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  errorEmail(): string {
    if (this.formRegister.get('email').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.formRegister.get('email').hasError('email')) {
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