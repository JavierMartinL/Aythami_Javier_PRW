import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

const URL: string = environment.API + 'archivos/';

@Injectable({
  providedIn: 'root'
})
/**
 * Atacar a la API con la ruta ‘http://localhost:8000/api/v3/archivos/...’
 */
export class FileService {

  constructor(private http: HttpClient, private storage: StorageService) {}

  /**
   * Función que crea la cabecera con  el token del usuario que tenemos almacenado para poder acceder a los datos
   * @returns HttpHeaders con el tipo y la auth del usuario
   * @param contentType boolean para saber si se utiliza o no el 'Content-Type'
   * @returns *TRUE* HttpHeaders con el tipo y la auth del usuario | *FALSE* HttpHeaders con el auth del usuario
   */
  async header(contentType: boolean = false): Promise<{headers: HttpHeaders;}> {
    if (contentType) {
      return {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await this.storage.getToken()})};
    } else {
      return {headers: new HttpHeaders({'Authorization': 'Bearer ' + await this.storage.getToken()})};
    }
  }

  /**
   * Función que recoge todos los archivo del usuario
   * @returns Object con todos los archivo
   */
  async index(): Promise<Observable<any>> {
    return this.http.get(URL + 'index', await this.header(true));
  }

  /**
   * Función para subir un nuevo archivo
   * @param fileForm FormData con el archivo(File), el nombre(String), la fecha('YYYY-MM-DD'), la descripción(String) y las categorías asociadas(Array[]) 
   */
  async store(fileForm: FormData): Promise<Observable<any>> {
    return this.http.post(URL + 'store', fileForm, await this.header());
  }

  /**
   * Función para editar un archivo
   * @param fileForm FormData con el archivo(File), el nombre(String), la fecha('YYYY-MM-DD'), la descripción(String) y las categorías asociadas(Array[]) 
   */
  async update(fileForm: FormData): Promise<Observable<any>> {
    return this.http.post(URL + 'update', fileForm, await this.header());
  }

  /**
   * Función para recoger los datos de un archivo
   * @param id number identificador de la categoría
   * @returns datos de la categoría
   */
  async show(id: number): Promise<Observable<any>> {
    return this.http.get(URL + id, await this.header(true));
  }

  /**
   * Función que devuelve el archivos
   * @param id number identificador de la categoría
   * @returns File
   */
  async recuperarArchivo(id: number): Promise<Observable<any>> {
    return this.http.get(URL + 'recuperarArchivo/' + id, await this.header(true));
  }

  /**
   * Función que devuelve todos los archivos de una categoría
   * @param id number identificador de la categoría
   * @returns todos los archivos de una categoría
   */
  async showCategoria(id: number): Promise<Observable<any>> {
    return this.http.get(URL + 'showCategoria/' + id, await this.header(true));
  }

  /**
   * Funcion para eliminar un archivo
   * @param id number identificador de la categoría
   */
  async delete(id: number): Promise<Observable<any>> {
    return this.http.post(URL + 'delete/' + id, null, await this.header(true));
  }
}
