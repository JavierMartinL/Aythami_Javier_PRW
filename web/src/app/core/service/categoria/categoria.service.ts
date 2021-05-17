import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.getToken() })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  index(): Observable<any> {
    return this.http.post(environment.API + 'categorias/', null, this.httpOptions);
  }

  store(name: string, categoria: string): Observable<any> {
    return this.http.post(environment.AUTH_API + 'categorias/store', {
      name,
      categoria
    }, this.httpOptions);
  }

  update(id: number, name: string, categoria: string): Observable<any> {
    return this.http.post(environment.AUTH_API + 'categorias/store', {
      id,
      name,
      categoria
    }, this.httpOptions);
  }

  show(id): Observable<any> {
    return this.http.post(environment.API + 'categorias/' + id, null, this.httpOptions);
  }

  destroy(id): Observable<any> {
    return this.http.post(environment.API + 'categorias/delete/' + id, null, this.httpOptions);
  }

}
