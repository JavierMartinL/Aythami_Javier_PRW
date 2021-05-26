import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoriaService } from 'src/app/core/service/categoria/categoria.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {

  @Input() categoryObject: Object = null;
  @Input() categoryOptions: any[] = [];

  public title: string;
  public filteredOptions: Observable<any[]>;
  private categoryForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder, private categoryService: CategoriaService) { }

  async ngOnInit() {    
    this.title = (this.categoryObject !== null) ? 'Editar Categoría' : 'Crear Categoría';

    this.categoryForm = this.formBuilder.group({
      name: [(this.categoryObject !== null ) ? this.categoryObject['name'] : '', Validators.required],
      categoryControl: ['', Validators.required],
    })
    this.loadSearch();
  }

  // Crear una categoría
  async saveCategory(): Promise<void> {
    if (this.categoryForm.valid) {
      let name: string = this.categoryForm.get('name').value;
      if (typeof this.categoryForm.get('categoryControl').value === 'object') {
        let category: string = this.categoryForm.get('categoryControl').value['id'];

        (await this.categoryService.store(name, category)).subscribe(
          data => {
            console.log(data);
            this.modalController.dismiss();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

  // Editar una categoría
  async updateCategory(): Promise<void> {    
    if (this.categoryForm.valid) {
      let name: string = this.categoryForm.get('name').value;
      if (typeof this.categoryForm.get('categoryControl').value === 'object') {
        let category: string = this.categoryForm.get('categoryControl').value['id'];

        (await this.categoryService.update(this.categoryObject['id'], name, category)).subscribe(
          data => {
            console.log(data);
            this.modalController.dismiss();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

  // Eliminar una categoría
  async deleteCategory(): Promise<void> {
    (await this.categoryService.destroy(this.categoryObject['id'])).subscribe(
      data => {
        console.log(data);
        this.modalController.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }

  // Funciones de Material Autocomplete
  loadSearch(): void {
    this.filteredOptions = this.categoryForm.get('categoryControl').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value['name']),
      map(name => name ?  this._filter(name) : this.categoryOptions.slice())
    ); 
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.categoryOptions.filter(options => options.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // MENSAJES DE ERROR PARA EL FORMULARIO
  errorName(): string {
    if (this.categoryForm.get('name').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    return '';
  }

  errorCategory(): string {
    if (this.categoryForm.get('categoryControl').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    return '';
  }

  displayFn(categoria): string {
    return categoria && categoria.name ? categoria.name : '';
  }
}
