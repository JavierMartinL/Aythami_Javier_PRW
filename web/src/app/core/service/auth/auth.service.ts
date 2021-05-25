import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const URL: string = environment.API + 'user/';

const httpOptions: {headers: HttpHeaders;} = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
/**
 * Atacar a la API con la ruta ‘http://localhost:8000/api/v3/user/...’
 */
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * Función para poder iniciar sesión
   * @param email string correo del usuario
   * @param password string contraseña del usuario
   * @returns Token y Datos del Usario
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(URL + 'login', {
      email,
      password
    }, httpOptions);
  }

  /**
   * Función para registrar un nuevo usuario
   * @param name string nombre del usuario
   * @param email string correo del usuario
   * @param password string contraseña del usuario
   * @param password_confirm string contraseña repetida
   */
  register(name: string, email: string, password: string, password_confirm: string): Observable<any> {
    return this.http.post(URL + 'createUser', {
      name,
      email,
      password,
      password_confirm
    }, httpOptions);
  }

  /**
   * Función para poder recuperar la contraseña de una cuenta mediante el correo
   * @param email string correo del usuario
   */
  forgot(email: string): Observable<any> {
    return this.http.post(URL + 'forgot', {
      email
    }, httpOptions);
  }

  /**
   * Función para cambiar la contraseña de una cuenta
   * @param token string Generado por el Backen y enviado mediante un correo
   * @param password string contraseña del usuario
   * @param password_confirm string contraseña repetida
   */
  resetPassword(token: string, password: string, password_confirm: string): Observable<any> {
    return this.http.post(URL + 'restpassword', {
      token,
      password,
      password_confirm
    }, httpOptions)
  }

  /**
   * Función para cerrar la sesión del usuario
   * @param token string identificación del usuario
   */
  logout(token: string): Observable<any> {
    return this.http.post(URL + 'logout', {
      token
    }, httpOptions);
  }
}
