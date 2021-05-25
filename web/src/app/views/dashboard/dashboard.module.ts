import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FileModalComponent } from './file/file-modal/file-modal.component';
import { CategoryModalComponent } from './category/category-modal/category-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FileModalComponent,
    CategoryModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatIconModule
  ]
})
export class DashboardModule { }
