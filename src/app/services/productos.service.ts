import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProducto, ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService<IProducto>{
  protected override source: string = 'producto';
  private productoListSignal = signal<IProducto[]>([]);
  get productos$() {
    return this.productoListSignal;
  }
  public search: ISearch = {
    page: 1,
    size: 5
  }
  
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.productoListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  getAllByUser() {
    this.findAllWithParamsAndCustomSource(`user/${this.authService.getUser()?.id}/producto`, { page: this.search.page, size: this.search.size}).subscribe({
      next: (response: any) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.productoListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(producto: IProducto) {
    this.add(producto).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllByUser();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred saving the producto','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(producto: IProducto) {
    this.editCustomSource(`${producto.id}`, producto).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllByUser();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the producto','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(producto: IProducto) {
    this.delCustomSource(`${producto.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllByUser();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the producto','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}
