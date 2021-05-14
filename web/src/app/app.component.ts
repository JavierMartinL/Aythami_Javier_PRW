import { Component } from '@angular/core';
import { StorageService } from './core/service/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private storage: StorageService) {}

  async ngOnInit() {
    await this.storage.create();
  }
}
