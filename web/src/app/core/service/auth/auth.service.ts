import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(name: string, email: string, password: string, password_confirm: string): Observable<any> {
    return this.http.post(environment.AUTH_API + 'createUser', {
      name,
      email,
      password,
      password_confirm
    }, httpOptions);
  }
}
