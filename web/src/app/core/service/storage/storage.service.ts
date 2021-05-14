import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

const KEY_TOKEN: string = 'auth-token';
const KEY_USER: string = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this._storage = storage;
  }

  async create() {
    await this.storage.create();
  }

  async saveToken(token: string) {
    await this._storage?.set(KEY_TOKEN, token);
  }

  saveUser(user: any): void {    
    this._storage?.set(KEY_USER, JSON.stringify(user));
  }

  async isAuth(): Promise<boolean> {    
    if (await this.getToken() === null) {
      return false;
    } else {
      return true;      
    }
  }

  //Recoger Token
  async getToken() {
    return await this._storage?.get(KEY_TOKEN); 
  }

  //Recoger User

  async ver() {
    console.log('token -> ' + await this._storage?.get(KEY_TOKEN)); 
    console.log(await JSON.parse(await this._storage?.get(KEY_USER))); 
  }

  async ver2() {
    const a = await this._storage?.get(KEY_TOKEN);
    console.log('token 2 -> ' + a); 
  }

  async exit() {
    await this.storage.clear();
    this.ver();
  }
}
