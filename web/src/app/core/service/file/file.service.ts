import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

const URL = environment.API + 'archivos/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private storage: StorageService) {}

  async header() {
    return {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await this.storage.getToken()})};
  }

  async index() {
    return this.http.get(URL + 'index', await this.header());
  }
}
