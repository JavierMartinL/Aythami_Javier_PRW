import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: StorageService) {}
  
  async canActivate() {
    console.log(this.storage.isAuth());
    
    if (await this.storage.isAuth()) {
      return true;
    } else {      
      this.router.navigate(['/auth']);
      return false;
    }
  }
  
}
