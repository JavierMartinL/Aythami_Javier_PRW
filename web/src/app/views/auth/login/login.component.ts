import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/service/storage/storage.service';
import { AuthService } from '../../../core/service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean;
  private durationInSeconds: number = 5;
  private formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storage: StorageService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.hidePassword = true;
    this.formLogin = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')
        ]
      ],
      password: ['', Validators.required]
    });
    this.storage.ver();
  }

  login(): void {
    if (this.formLogin.valid) {
      let email: string = this.formLogin.get('email').value;
      let password: string = this.formLogin.get('password').value;

      this.authService.login(email, password).subscribe(
        data => {
          this.storage.saveToken(data.access_token);
          this.storage.saveUser(data.user);

          this.router.navigate(['/home']);
        },
        err => {
          this.errorLoginUser(err.error)
        }
      );
    }
  }

  errorLoginUser(errors: any) {
    if (errors.message){
      let message = 'El e-mail o la contraseña no son correctos.';
      this._snackBar.open(message, '', {
        duration: this.durationInSeconds * 1000
      });
    }
  }

  errorEmail(): string {
    if (this.formLogin.get('email').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.formLogin.get('email').hasError('email') || this.formLogin.get('email').hasError('pattern')) {
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
