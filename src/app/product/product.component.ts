import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../product';
import { cl, er } from '@fullcalendar/core/internal-common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedProduct: any = null;
  displayAddEditModal = false;
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();


  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
 

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
   this.pdtSubscription= this.productService.getProducts().subscribe((Response) => {
      this.products = Response;
    }
    );
this.subscriptions.push(this.pdtSubscription);
  }

  showAddModal() {
    console.log('showAddModal called');
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  saveorUpdateProductList(newData: any) {
    if (this.selectedProduct && newData.id === this.selectedProduct.id) {
      const prodIndex = this.products.findIndex((p) => p.id === newData.id);
      console.log(prodIndex, 'prodIndex');
      this.products[prodIndex] = newData;
    } else {
      this.products.unshift(newData);
    }
  }

  showEditModal(product: Product) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(
          response => {

            this.products = this.products.filter(item => item.id !== product.id)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Delete product successfully',
          });

        },
        error =>{
          this.messageService.add({
            severity: 'error',
            summary: 'Error deleting product',
            detail: error,
          });
        }
        
        )
      },

    
    });
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
}
