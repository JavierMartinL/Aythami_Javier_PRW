import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { NgxDropzoneModule } from 'ngx-dropzone';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddFileModalComponent } from './file/add-file-modal/add-file-modal.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent,
    AddFileModalComponent
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
