import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/core/service/categoria/categoria.service';
import { FileService } from 'src/app/core/service/file/file.service';
import { CategoryModalComponent } from './modals/category-modal/category-modal.component';
import { DetailFileModalComponent } from './modals/detail-file-modal/detail-file-modal.component';
import { FileModalComponent } from './modals/file-modal/file-modal.component';
import { UserPopoverComponent } from './popover/user-popover/user-popover.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private modalController: ModalController, private popoverController: PopoverController, private categoryService: CategoriaService, private fileService: FileService) { }

  private allCategories: Observable<any> | null = null;
  private root: number;

  private idCategory: number;
  private categoryParent: any[];
  private files: any[] = null;
  private categories: any[] = null;
  private categoryTitle: string;

  public sidevar: boolean = true;

  async ngOnInit() {
    await this.getAllCategory();
  }

  // Función que recarga la información de los archivos y las categorías
  setCategory(id: number = this.root): void {
    this.idCategory = id;
    this.files = null
    this.categories = null;
    this.getFiles();
    this.getCategories();
  }

  // Función que controla las categorias que se van a mostrar
  getCategories(): void {
    this.categories = [];
    this.allCategories.forEach(element => {
      if (element.id === this.idCategory) {
        this.categoryParent = element;
      }
      if (this.idCategory === this.root) {
        this.categoryTitle = 'Principal';
      }else if (element.id === this.idCategory){
        this.categoryTitle = element.name;
      }
      if (element.categoria === this.idCategory) {
        this.categories.push(element);
      }
    });    
  }  

  // Función que recoge todos los archivos de una categoría
  async getFiles(): Promise<void> {   
    (await this.fileService.showCategoria(this.idCategory)).subscribe(
      data => {
        this.files = data['archivos'];
      },
      err => {
        console.log(err);
      }
    );
  }

  // Función que devuelve todas las categorías del usuario y guarda el id de la categoía root
  async getAllCategory(): Promise<void> {
    (await this.categoryService.index()).subscribe(
      data => {
        this.allCategories = data['categorias'];
        this.allCategories.forEach(element => {
          if (element['categoria'] === null) {
            this.root = element['id'];
          }
        });
        this.setCategory();
      },
      err => {
        console.log(err);
      }
    );
  }
    

  // Función que abre el modal para subir o editar un archivo
  async fileModal(file = null): Promise<void> {
    const modal = await this.modalController.create({
      component: FileModalComponent,
      componentProps: {
        'fileObject': file,
        'categoryOptions': this.allCategories
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data === "load") {
        this.getFiles();
      }
    })

    return await modal.present();
  }

  // Función que abre el modal con los detalles de un archivo
  async detailFileModal(file = null): Promise<void> {
    if (file !== null) {
      const modal = await this.modalController.create({
        component: DetailFileModalComponent,
        componentProps: {
          'fileObject': file,
          'icon': this.setIcon(file)
        }
      });
  
      modal.onDidDismiss().then((data) => {
        if (data.role === "edit"){
          this.fileModal(data.data);
        }
      })
  
      return await modal.present();
    }
  }

  // Función que abre el modal para crear o editar una categoría
  async categoryModal(category = null): Promise<void> {    
    const modal = await this.modalController.create({
      component: CategoryModalComponent,
      componentProps: {
        'categoryObject': category,
        'categoryOptions': this.allCategories
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data === 'load') {
        this.getAllCategory();
      }
    })
    
    return await modal.present();
  }

  // Función que abre el popover y en caso de cerrar la sesión actualiza la pagina para que se redirija a Auth
  async userDataPopover(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: UserPopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      window.location.reload();
    }
  }

  // Función que muestra un icono segun el tipo de archivo
  setIcon(file: any): string {
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
        return 'insert_drive_file';
    }
  }
}
