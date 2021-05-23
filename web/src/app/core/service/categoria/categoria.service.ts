import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  async header() {
    return {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await this.storage.getToken()})};
  }

  async index(): Promise<Observable<any>> {
    return this.http.get(environment.API + 'categorias/index', await this.header());
  }

  async store(name: string, categoria: string): Promise<Observable<any>> {
    return this.http.post(environment.AUTH_API + 'categorias/store', {
      name,
      categoria
    }, await this.header());
  }

  async update(id: number, name: string, categoria: string): Promise<Observable<any>> {
    return this.http.post(environment.AUTH_API + 'categorias/store', {
      id,
      name,
      categoria
    }, await this.header());
  }

  async show(id): Promise<Observable<any>> {
    return this.http.post(environment.API + 'categorias/' + id, null, await this.header());
  }

  async destroy(id): Promise<Observable<any>> {
    return this.http.post(environment.API + 'categorias/delete/' + id, null, await this.header());
  }

}
