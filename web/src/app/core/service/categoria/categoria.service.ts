import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

const URL: string = environment.API + 'categorias/';

@Injectable({
  providedIn: 'root'
})
/**
 * Atacar a la API con la ruta ‘http://localhost:8000/api/v3/categorias/...’
 */
export class CategoriaService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  /**
   * Función que crea la cabecera con  el token del usuario que tenemos almacenado para poder acceder a los datos
   * @returns HttpHeaders con el tipo y la auth del usuario
   */
  async header(): Promise<{headers: HttpHeaders;}> {
    return {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await this.storage.getToken()})};
  }

  /**
   * Función para recoger todas las categorías creadas por el usuario
   * @returns JSON con todas las categorías
   */
  async index(): Promise<Observable<any>> {
    return this.http.get(URL + 'index', await this.header());
  }

  /**
   * Función para crear una nueva categoría
   * @param name string nombre de la categoría
   * @param idCategoria string identificador de la categoría padre
   */
  async store(name: string, idCategoria: string): Promise<Observable<any>> {
    return this.http.post(URL + 'store', {
      name,
      idCategoria
    }, await this.header());
  }

  /**
   * Función para editar una nueva categoría existente
   * @param id number identificador de la categoría
   * @param name string nombre de la categoría
   * @param idCategoria string identificador de la categoría padre
   */
  async update(id: number, name: string, idCategoria: string): Promise<Observable<any>> {
    return this.http.post(URL + 'update', {
      id,
      name,
      idCategoria
    }, await this.header());
  }

  /**
   * Función para ver los datos de la categoría
   * @param id number identificador de la categoría
   * @returns JSON con los datos de la categoría
   */
  async show(id: number): Promise<Observable<any>> {
    return this.http.post(URL + id, null, await this.header());
  }

  /**
   * Función para eliminar una categoría
   * @param id numberidentificador de la categoría
   */
  async destroy(id: number): Promise<Observable<any>> {
    return this.http.post(URL + 'delete/' + id, null, await this.header());
  }

}
