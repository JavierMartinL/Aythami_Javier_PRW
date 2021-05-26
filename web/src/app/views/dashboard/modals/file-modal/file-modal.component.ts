import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { FileService } from 'src/app/core/service/file/file.service';

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.scss']
})
export class FileModalComponent implements OnInit {

  @Input() fileObject: Object = null;
  @Input() categoryOptions: any[] = [];
 
  public filteredOptions: Observable<any[]>;
  public maxDate: Date = new Date(); // Fecha max (Dia Actual)
  public title: string;
  private fileForm: FormGroup;
  private categoryControl = new FormControl();
  private categories: any[];
  private files: File = null;
  private durationInSeconds: number = 5;

  constructor(private modalController: ModalController, private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private fileService: FileService) { }

  async ngOnInit() {
    this.title = (this.fileObject !== null) ? 'Editar Archivo' : 'Subir Archivo';
    this.fileForm = this.formBuilder.group({
      name: [(this.fileObject !== null ) ? this.fileObject['name'] : '', Validators.required],
      description: [(this.fileObject !== null ) ? this.fileObject['description'] : '', Validators.required],
      file_date: [(this.fileObject !== null ) ? new Date(this.fileObject['file_date']) : '', Validators.required]
    });
    this.categories = (this.fileObject !== null ) ? this.fileObject['categoria'] : [];
    this.loadSearch();
  }

  // Subir Archivo
  addFile(event): void {
    this.files = event.addedFiles;
  }

  // Eliminar Archivo insertado
  dropFile(): void {
     this.files = null;
  }

  // Añadir categoría valida y evitar repeticiones
  addCategory(): void {
    if (this.categoryControl.value !== null && typeof this.categoryControl.value === 'object'){
      this.categories.push(this.categoryControl.value);
      this.categories = this.categories.filter((item, index)=>{
        return this.categories.indexOf(item) === index;
      });
    }
    this.categoryControl.setValue('');
  }

  // Eliminar categoría insertada
  deleteCategory(i): void {
    for(let j = 0; j < this.categories.length; j++){
      if (this.categories[j].id === i){
        this.categories.splice(j, 1);
      }
    }
  }

  changeDate(): string {
    let date = this.fileForm.get('file_date').value;
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  // Guardar archivo y datos en el backend
  async saveFile(): Promise<void> {
    if (this.fileForm.valid && this.files !== null) {
      const formModel: FormData = new FormData();
      formModel.append("file", this.files[0]);
      formModel.append("name", this.fileForm.get('name').value);
      formModel.append("description", this.fileForm.get('description').value);
      formModel.append("file_date", this.changeDate());

      if (this.categories.length > 0) {
        for(let i = 0; i < this.categories.length; i++) {
          formModel.append("categories["+ i +"]", this.categories[i].id);          
        }
      } else {
        let root: string = null;
        for (let i = 0; i < this.categoryOptions.length; i++) {
          if (this.categoryOptions[i].categoria === null && root === null) {
            root = this.categoryOptions[i].id;
          }
        }
        formModel.append("categories[0]", root);
      }      

      (await this.fileService.store(formModel)).subscribe(
        data => {          
          console.log(data);
          this.modalController.dismiss('load');
        },
        err => {
          console.log(err);
          this.errorUpFile(err.error);
        }
      )
    }
  }

  // Modificar archivo y/o datos
  async updateFile(): Promise<void> {
    if (this.fileForm.valid) {
      const formModel: FormData = new FormData();
      if (this.files !== null) {
        formModel.append("file", this.files[0]);
      }
      formModel.append("id", this.fileObject['id']);
      formModel.append("name", this.fileForm.get('name').value);
      formModel.append("description", this.fileForm.get('description').value);
      formModel.append("file_date", this.changeDate());

      if (this.categories.length > 0) {
        for(let i = 0; i < this.categories.length; i++) {
          formModel.append("categories["+ i +"]", this.categories[i].id);          
        }
      } else {
        formModel.append("categories[0]", '1');
      }      

      (await this.fileService.update(formModel)).subscribe(
        data => {
          console.log(data);
          this.modalController.dismiss('load');
        },
        err => {
          console.log(err);
          this.errorUpFile(err.error);
        }
      )
    }
  }

  // Función que elimina el Archivo
  async deleteFile(): Promise<void> { 
    (await this.fileService.delete(this.fileObject['id'])).subscribe(
      data => {
        console.log(data);
        this.modalController.dismiss();
      },
      err => {
        console.log(err);
      }
    )
  }

  // Mostrar error si el fichero ya existe
  errorUpFile(errors: any): void {
    if (errors.message){
      this._snackBar.open(errors.message, '', {
        duration: this.durationInSeconds * 1000
      });
    }
  }

  // Funciones de Material Autocomplete
  loadSearch(): void {
    this.filteredOptions = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ?  this._filter(name) : this.categoryOptions.slice())
    );
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.categoryOptions.filter(options => options.name.toLowerCase().indexOf(filterValue) === 0);
  }
  
  // MENSAJES DE ERROR PARA EL FORMULARIO
  errorName(): string {
    if (this.fileForm.get('name').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    return '';
  }

  errorDescription(): string {
    if (this.fileForm.get('description').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    return '';
  }

  errorDate(): string {
    if (this.fileForm.get('file_date').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.fileForm.get('file_date').value > this.maxDate){
      return 'Elige una fecha valida';
    }
    return '';
  }

  displayFn(categoria): string {
    return categoria && categoria.name ? categoria.name : '';
  }  
}