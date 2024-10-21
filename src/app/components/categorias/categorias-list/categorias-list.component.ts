import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [],
  templateUrl: './categorias-list.component.html',
  styleUrl: './categorias-list.component.scss'
})
export class CategoriasListComponent {
  @Input() title: string  = '';
  @Input() categorias: ICategoria[] = [];
  @Output() callModalAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callDeleteAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>(); 

}
