import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // public ocultarPassword: boolean;
  // public formError: boolean;
  private email: FormControl;
  private password: FormControl;

  constructor() { }

  ngOnInit() {
    // this.ocultarPassword  = true;
    // this.formError = false;
    this.password = new FormControl('');    
    this.email = new FormControl('');
  }

  login(): void {
    // console.log(this.email.value);
    // console.log(this.password.value);    
  }
}
