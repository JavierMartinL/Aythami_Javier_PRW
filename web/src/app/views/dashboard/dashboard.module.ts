import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FileModalComponent } from './modals/file-modal/file-modal.component';
import { CategoryModalComponent } from './modals/category-modal/category-modal.component';
import { UserPopoverComponent } from './popover/user-popover/user-popover.component';
import { DetailFileModalComponent } from './modals/detail-file-modal/detail-file-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FileModalComponent,
    DetailFileModalComponent,
    CategoryModalComponent,
    UserPopoverComponent,
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
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class DashboardModule { }
