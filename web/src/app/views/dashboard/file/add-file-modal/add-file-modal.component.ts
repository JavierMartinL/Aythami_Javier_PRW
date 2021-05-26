import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {finalize, map, startWith} from 'rxjs/operators';
import { CategoriaService } from 'src/app/core/service/categoria/categoria.service';
import { FileService } from 'src/app/core/service/file/file.service';

@Component({
  selector: 'app-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['./add-file-modal.component.scss']
})
export class AddFileModalComponent implements OnInit {

  @Input() fileObject: Object = null;
  @Input() update: boolean = false;
 
  public filteredOptions: Observable<any[]>;
  public maxDate: Date;
  public title: string;
  private fileForm: FormGroup;
  private categoryControl = new FormControl();
  private categoryOptions: any[] = [];
  private categories: any[];
  private files: File = null;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder, private categoryService: CategoriaService, private fileService: FileService) { }

  async ngOnInit() {
    this.title = (this.update) ? 'Editar Archivo' : 'Subir Archivo';
    this.maxDate = new Date();    
    this.fileForm = this.formBuilder.group({
      name: [(this.fileObject !== null ) ? this.fileObject['name'] : '', Validators.required],
      description: [(this.fileObject !== null ) ? this.fileObject['description'] : '', Validators.required],
      file_date: [(this.fileObject !== null ) ? new Date(this.fileObject['file_date']) : '', Validators.required]
    });
    this.categories = (this.fileObject !== null ) ? this.fileObject['categoria'] : [];
    await this.getCategories();
  }

  async getCategories(): Promise<void> {
    (await this.categoryService.index()).pipe(finalize( () => this.loadSearch())).subscribe(
      data => {
        for(let category of data.categorias){
          this.categoryOptions.push(category);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  addFile(event): void {
    this.files = event.addedFiles;
  }

  deleteFile(): void {
     this.files = null;
  }

  addCategory(): void {
    if (this.categoryControl.value !== null && typeof this.categoryControl.value === 'object'){
      this.categories.push(this.categoryControl.value);
      this.categories = this.categories.filter((item, index)=>{
        return this.categories.indexOf(item) === index;
      });
    }
    this.categoryControl.setValue('');
  }

  deleteCategory(i) {
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
        formModel.append("categories[0]", '1');
      }      

      (await this.fileService.store(formModel)).subscribe(
        data => {
          console.log(this.files[0]);
          
          console.log(data);
          this.modalController.dismiss();
        },
        err => {
          console.log(err);
        }
      )
    }
  }

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
          this.modalController.dismiss();
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  loadSearch(): void{
    this.filteredOptions = this.categoryControl.valueChanges
    .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ?  this._filter(name) : this.categoryOptions.slice())
      );
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.categoryOptions.filter(options => options.name.toLowerCase().indexOf(filterValue) === 0);
  }
  
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