import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-auth-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  public emailCorrect: boolean = false;
  private durationInSeconds: number = 5;
  private formForgot: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.formForgot = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')
        ]
      ]
    }); 
  }

  forgot() {
    if (this.formForgot.valid) {
      let email: string = this.formForgot.get('email').value;

      this.authService.forgot(email).subscribe(
        data =>{
          this.emailCorrect = true;
          console.log(data);
          
        },
        err=> {
          this.errorForgotUser(err.error);
        }
      );
    }
  }

  errorForgotUser(errors: any) {
    if (errors.message){
      let message = 'Este E-mail no existe';
      this._snackBar.open(message, '', {
        duration: this.durationInSeconds * 1000
      });
    }
  }

  errorEmail(): string {
    if (this.formForgot.get('email').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.formForgot.get('email').hasError('email') || this.formForgot.get('email').hasError('pattern')) {
      return 'Escribe un E-mail correcto';
    }
    return '';
  }
}
