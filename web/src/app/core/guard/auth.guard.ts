import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Comprueba que existe un token almacenado
 * Si no existe es redirigido al login
*/
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: StorageService) {}
  
  async canActivate() {    
    if (await this.storage.isAuth()) {
      return true;
    } else {      
      this.router.navigate(['/auth']);
      return false;
    }
  }
  
}
