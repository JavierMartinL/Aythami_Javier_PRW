import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  private formForgot: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
    console.log(this.formForgot.value);
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
