import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/service/categoria/categoria.service';
import { FileService } from 'src/app/core/service/file/file.service';
import { StorageService } from 'src/app/core/service/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private file: FileService, private category: CategoriaService, private storage: StorageService) { }

  ngOnInit() {    
    // console.log(await this.storage.getToken());
    this.index();
  }

  async index() {
    (await this.file.index()).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
