import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {

  public hidePassword: boolean;
  public hideRepeatPassword: boolean;
  private formReset: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.hidePassword = this.hideRepeatPassword = true;
    this.formReset = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  reset() {

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
