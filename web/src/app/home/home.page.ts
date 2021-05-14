import { Component, Input } from '@angular/core';
import { StorageService } from '../core/service/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.storage.ver();
  }

  exit() {
    this.storage.exit();
    window.location.reload();
  }
}
