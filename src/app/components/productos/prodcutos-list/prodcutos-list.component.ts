import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria, IProducto } from '../../../interfaces';

@Component({
  selector: 'app-prodcutos-list',
  standalone: true,
  imports: [],
  templateUrl: './prodcutos-list.component.html',
  styleUrl: './prodcutos-list.component.scss'
})
export class ProdcutosListComponent {
  @Input() title: string  = '';
  @Input() productos: IProducto[] = [];
  @Output() callModalAction: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callDeleteAction: EventEmitter<IProducto> = new EventEmitter<IProducto>();

}
