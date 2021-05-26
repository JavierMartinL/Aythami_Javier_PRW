import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

const KEY_TOKEN: string = 'auth-token';
const KEY_USER: string = 'auth-user';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que almacena en storage él token y los datos del usuario
 */
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this._storage = storage;
  }

  /**
   * Función para crear el storage
   */
  async create(): Promise<void> {
    await this.storage.create();
  }

  /**
   * Función que guarda el token del usuario
   * @param token string generada por el backen
   */
  async saveToken(token: string): Promise<void> {
    await this._storage?.set(KEY_TOKEN, token);
  }

  /**
   * Función que almacena los datos del usuario
   * @param user 
   */
  saveUser(user: any): void {    
    this._storage?.set(KEY_USER, JSON.stringify(user));
  }

  /**
   * Función que comprueba si un usuario tiene un token almacenado
   * @returns boolean *TRUE* Existe un Token almacenado | *FALSE* No existe ningun Token
   */
  async isAuth(): Promise<boolean> {    
    if (await this.getToken() === null) {
      return false;
    } else {
      return true;      
    }
  }

  /**
   * Función que recoge el token almacenado
   * @returns string Token almacenado
   */
  async getToken(): Promise<string> {
    return await this._storage?.get(KEY_TOKEN); 
  }

  /**
   * Función que recoge los datos almacenado del usuario
   * @returns JSON con los datos
   */
  async getUser(): Promise<any> {
    return await JSON.parse(await this._storage?.get(KEY_USER)); 
  }

  /**
   * Función que vacía el Storage
   */
  async clearStorage(): Promise<void> {
    await this.storage.clear();
  }
}
