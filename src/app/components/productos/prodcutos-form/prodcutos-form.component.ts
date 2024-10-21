import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProducto } from '../../../interfaces';

@Component({
  selector: 'app-prodcutos-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './prodcutos-form.component.html',
  styleUrl: './prodcutos-form.component.scss'
})
export class ProdcutosFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() productoForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callUpdateMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  

  callSave() {
    let producto: IProducto = {
      nombre: this.productoForm.controls['nombre'].value,
      descripcion: this.productoForm.controls['descripcion'].value,
      precio: this.productoForm.controls['precio'].value,
      stock: this.productoForm.controls['stock'].value,
      categoria: 3
    }
    if(this.productoForm.controls['id'].value) {
      producto.id = this.productoForm.controls['id'].value;
    } 
    if(producto.id) {
      this.callUpdateMethod.emit(producto);
    } else {
      this.callSaveMethod.emit(producto);
    }
  }

}
