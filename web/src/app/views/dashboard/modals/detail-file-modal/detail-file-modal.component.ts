import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FileService } from 'src/app/core/service/file/file.service';

@Component({
  selector: 'app-detail-file-modal',
  templateUrl: './detail-file-modal.component.html',
  styleUrls: ['./detail-file-modal.component.scss'],
})
export class DetailFileModalComponent implements OnInit {

  @Input() fileObject: Object = null;
  @Input() icon: string;

  private categories: any[] = [];

  constructor(private modalController: ModalController, private fileService: FileService) { }

  ngOnInit() {
    this.categories = this.fileObject['categoria'];    
  }

  // Función que cierra el datail para abrir el editar Archivo
  editFile():void {
    this.modalController.dismiss(this.fileObject, 'edit');
  }

}
