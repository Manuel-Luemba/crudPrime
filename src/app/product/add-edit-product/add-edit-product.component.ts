import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cl } from '@fullcalendar/core/internal-common';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Product } from '../../product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = 'Add';

  productForm = this.fb.group({
    title: ['', Validators.required],
    price: [0, Validators.required],
    description: [''],
    category: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private producService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalType = 'Edit';
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
      this.modalType = 'Add';
    }
  }

  closeModal() {
    this.clickClose.emit(true);
    this.productForm.reset();
  }

  addEdiProduct() {
    this.producService.addEdiProduct(this.productForm.value, this.selectedProduct).subscribe(
      (response) => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Add' ? 'Product added successfully':'Product updated successfully'
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: msg,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
        console.log('Error occured');
      }
    );
  }
}
