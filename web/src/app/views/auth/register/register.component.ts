import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public ocultarPassword: boolean;
  public ocultarRepetirPassword: boolean;

  private name: FormControl;
  private email: FormControl;
  private password: FormControl;
  private repeatPassword: FormControl;

  constructor() { }

  ngOnInit() {
    this.ocultarPassword = this.ocultarRepetirPassword = true; 
    this.name = new FormControl('');
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.repeatPassword = new FormControl('');
  }

  register() {
    console.log('Nombre -> ' + this.name.value);
    console.log('Email -> ' + this.email.value);
    console.log('Password -> ' + this.password.value);
    console.log('Repeat Password -> ' + this.repeatPassword.value);    
  }

}
