import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/core/service/categoria/categoria.service';
import { FileService } from 'src/app/core/service/file/file.service';
import { AddFileModalComponent } from './file/add-file-modal/add-file-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private modalController: ModalController, private file: FileService, private category: CategoriaService) { }

  ngOnInit() {
    this.index();
  }

  async subir() {
    const modal = await this.modalController.create({
      component: AddFileModalComponent
    });
    return await modal.present();
  }

  async index() {
    (await this.file.index()).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
