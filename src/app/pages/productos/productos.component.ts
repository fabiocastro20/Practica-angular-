import { Component, inject, ViewChild } from '@angular/core';
import { ProdcutosListComponent } from '../../components/productos/prodcutos-list/prodcutos-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductosService } from '../../services/productos.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { categories } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ProdcutosFormComponent } from "../../components/productos/prodcutos-form/prodcutos-form.component";
import { IProducto } from '../../interfaces';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    ProdcutosListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductosComponent,
    ProdcutosFormComponent
],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
    public productosService: ProductosService = inject(ProductosService);
  public modalService: ModalService = inject(ModalService);
  public AuthService: AuthService = inject(AuthService);
  @ViewChild('addproductosModal') public addProductosModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  productoForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', Validators.required],
    stock: ['', Validators.required],
    categoria: ['', Validators.required]
  });

  constructor() {
    this.productosService.search.page = 1;
    this.AuthService.isSuperAdmin() ? this.productosService.getAll() : this.productosService.getAll();
  }

  saveProducto(producto : IProducto) {
    this.productosService.save(producto);
    this.modalService.closeAll();
  }

  callEdition(producto: IProducto) {
    this.productoForm.controls['id'].setValue(producto.id ? JSON.stringify(producto.id) : '');
    this.productoForm.controls['nombre'].setValue(producto.nombre ? producto.nombre : '');
    this.productoForm.controls['descripcion'].setValue(producto.descripcion ? JSON.stringify(producto.descripcion) : '');
    this.productoForm.controls['precio'].setValue(producto.precio ? JSON.stringify(producto.precio) : '');
    this.productoForm.controls['stock'].setValue(producto.stock ? JSON.stringify(producto.stock) : '');
    this.productoForm.controls['categoria'].setValue(producto.categoria ? JSON.stringify(producto.categoria) : '');
    this.modalService.displayModal('md', this.addProductosModal);
  }

  updateProducto(producto: IProducto) {
    this.productosService.update(producto);
    this.modalService.closeAll();
  }
}
