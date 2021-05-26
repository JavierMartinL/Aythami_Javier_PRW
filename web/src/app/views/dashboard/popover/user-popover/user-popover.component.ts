import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { StorageService } from 'src/app/core/service/storage/storage.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {

  public user: Object = null;

  constructor(private popoverController: PopoverController, private storageService: StorageService) { }

  async ngOnInit() {
    this.user = await this.storageService.getUser();   
  }

  // Función para cerrar la sesión del usuario
  async logout(): Promise<void> {
    await this.storageService.clearStorage();
    this.popoverController.dismiss(true);
  }

}
