import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/core/service/categoria/categoria.service';
import { FileService } from 'src/app/core/service/file/file.service';
import { CategoryModalComponent } from './category/category-modal/category-modal.component';
import { FileModalComponent } from './file/file-modal/file-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private files: Observable<any> | null = null;
  private allCategories: Observable<any> | null = null;
  ca = [];
  fi = [];
  id = 1;

  constructor(private modalController: ModalController, private file: FileService, private categoryService: CategoriaService) { }

  ngOnInit() {
    this.indexFile();
    this.indexCategory();
  }

  setCategory(id) {
    this.id = id;
    this.getFiles();
    this.getCategories();
  }

  getFiles() {
    this.fi = [];
    this.files.forEach(element => {
      for (const cat of element['categoria']) {
        if (cat.id === this.id) {
          this.fi.push(element);
        }
      }
    });
  }

  getCategories() {
    this.ca = [];
    this.allCategories.forEach(element => {
      if (element.categoria === this.id) {
        this.ca.push(element);
      }
    });
  }

  async categoryModal(category = null) {    
    const modal = await this.modalController.create({
      component: CategoryModalComponent,
      componentProps: {
        'categoryObject': category,
        'categoryOptions': this.allCategories
      }
    });

    return await modal.present();
  }

  async fileModal(file = null) {
    const modal = await this.modalController.create({
      component: FileModalComponent,
      componentProps: {
        'fileObject': file,
        'categoryOptions': this.allCategories
      }
    });

    modal.onDidDismiss().then((data) => {
      this.indexFile();
    })
      
    return await modal.present();
  }

  async indexFile() {
    (await this.file.index()).subscribe(
      data => {
        this.files = data['archivos'];        
        this.getFiles();
      },
      err => {
        console.log(err);
      }
    );
  }

  async indexCategory() {
    (await this.categoryService.index()).subscribe(
      data => {
        this.allCategories = data['categorias'];
        this.getCategories();
      },
      err => {
        console.log(err);
      }
    );
  }

  // getCategoriesId(id) {
  //   this.allCategories.subscribe(
  //     data => {
  //       for(let a of data) {
  //         if (a.categoria ===  id) {
  //           this.ca.push(a);
  //         }
  //       }
  //       console.log(this.ca);
        
  //     }
  //   )
  // }

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
