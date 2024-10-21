import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './categorias-form.component.html',
  styleUrl: './categorias-form.component.scss'
})
export class CategoriasFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() categoriaForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callUpdateMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  
  callSave() {
    let categoria: ICategoria = {
      nombre: this.categoriaForm.controls['nombre'].value,
      descripcion: this.categoriaForm.controls['descripcion'].value
    }
    if(this.categoriaForm.controls['id'].value) {
      categoria.id = this.categoriaForm.controls['id'].value;
    } 
    if(categoria.id) {
      this.callUpdateMethod.emit(categoria);
    } else {
      this.callSaveMethod.emit(categoria);
    }
  }
}
