import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

const URL = environment.API + 'archivos/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private storage: StorageService) {}

  async header(contentType: boolean = false): Promise<any> {
    if (contentType) {
      return {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await this.storage.getToken()})};
    } else {
      return {headers: new HttpHeaders({'Authorization': 'Bearer ' + await this.storage.getToken()})};
    }
  }

  async index() {
    return this.http.get(URL + 'index', await this.header(true));
  }

  async store(fileForm: FormData): Promise<Observable<any>> {
    return this.http.post(URL + 'store', fileForm, await this.header());
  }

  async update(fileForm: FormData): Promise<Observable<any>> {
    return this.http.post(URL + 'update', fileForm, await this.header());
  }
}
