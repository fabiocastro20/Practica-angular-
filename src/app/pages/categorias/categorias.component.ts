import { AuthService } from './../../services/auth.service';
import { ModalService } from './../../services/modal.service';
import { Component, inject, ViewChild } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategoria } from '../../interfaces';
import { CategoriasListComponent } from '../../components/categorias/categorias-list/categorias-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriasFormComponent } from '../../components/categorias/categorias-form/categorias-form.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CategoriasListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    CategoriasFormComponent,
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
  public categoriasService: CategoriasService = inject(CategoriasService);
  public modalService: ModalService = inject(ModalService);
  public AuthService: AuthService = inject(AuthService);
  @ViewChild('addCategoriasModal') public addCategoriasModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  categoriaForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  constructor() {
    this.categoriasService.search.page = 1;
    this.AuthService.isSuperAdmin() ? this.categoriasService.getAll() : this.categoriasService.getAll();
  }

  saveCategoria(categoria : ICategoria) {
    this.categoriasService.save(categoria);
    this.modalService.closeAll();
  } 

  callEdition(categoria: ICategoria) {
    this.categoriaForm.controls['id'].setValue(categoria.id ? JSON.stringify(categoria.id) : '');
    this.categoriaForm.controls['nombre'].setValue(categoria.nombre ? categoria.nombre : '');
    this.categoriaForm.controls['descripcion'].setValue(categoria.descripcion ? JSON.stringify(categoria.descripcion) : '');
    this.modalService.displayModal('md', this.addCategoriasModal);
  }

  updateCategoria(categoria: ICategoria) {
    this.categoriasService.update(categoria);
    this.modalService.closeAll();
  }

}
