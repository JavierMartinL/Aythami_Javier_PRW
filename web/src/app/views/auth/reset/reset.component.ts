import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {

  public hidePassword: boolean;
  public hideRepeatPassword: boolean;
  private formReset: FormGroup;
  private token: string;

  constructor(private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.token = this.activatedRouter.snapshot.params.token;
    this.hidePassword = this.hideRepeatPassword = true;
    this.formReset = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  reset() {
    if (this.formReset.valid) {
      let password: string = this.formReset.get('password').value;
      let repeatPassword: string = this.formReset.get('repeatPassword').value;

      this.authService.resetPassword(this.token, password, repeatPassword).subscribe(
        data => {
          this.router.navigate(['/auth/login']);
        }
      );      
    }
  }

  errorPassword(): string {
    if (this.formReset.get('password').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    return '';
  }

  errorRepeatPassword(): string {
    if (this.formReset.get('repeatPassword').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.formReset.get('repeatPassword').hasError('passwordNotEqual')) {
      return 'Debe ser la misma contraseña';
    }
    return '';
  }

}
