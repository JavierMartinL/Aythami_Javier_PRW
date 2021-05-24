import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/core/service/categoria/categoria.service';
import { FileService } from 'src/app/core/service/file/file.service';
import { AddFileModalComponent } from './file/add-file-modal/add-file-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private files: Observable<any> | null = null;

  constructor(private modalController: ModalController, private file: FileService, private category: CategoriaService) { }

  ngOnInit() {
    console.log(this.files);
    this.index();
  }

  async subir() {
    const modal = await this.modalController.create({
      component: AddFileModalComponent
    });

    modal.onDidDismiss().then((data) => {
      this.index();
    })
      

    return await modal.present();
  }

  onDidDismiss() {
    console.log('holaaaa');
    
  }

  async index() {
    (await this.file.index()).subscribe(
      data => {
        this.files = data['archivos'];
        console.log(this.files);
      },
      err => {
        console.log(err);
      }
    );
  }

  icon(file) {
    let separado = file.file_name.split('.');
    let type = separado[separado.length - 1];
    
    switch (type) {
      case 'png':
      case 'jpg':
        return 'image';
      case 'pdf':
        return 'picture_as_pdf';
      case 'txt':
        return 'description';
      default:
        break;
    }
  }

}
