import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/service/storage/storage.service';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean;
  private formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.hidePassword = true;
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.formLogin.valid) {
      let email: string = this.formLogin.get('email').value;
      let password: string = this.formLogin.get('password').value;

      this.authService.login(email, password).subscribe(
        data => {
          console.log(data);
          //this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  errorEmail(): string {
    if (this.formLogin.get('email').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.formLogin.get('email').hasError('email')) {
      return 'Escribe un E-mail correcto';
    }
    return '';
  }

  errorPassword(): string {
    if (this.formLogin.get('password').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    return '';
  }
}
