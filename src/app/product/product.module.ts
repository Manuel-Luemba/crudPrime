import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';

import { ProductComponent } from './product.component';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
   BrowserModule,
   AppRoutingModule,
    HttpClientModule,
ButtonModule,
TableModule,
DialogModule,
BrowserAnimationsModule,
AddEditProductModule,
ToastModule,
ConfirmDialogModule

  ],
  exports: [
    ProductComponent,
    
  ],
  providers: [MessageService, ConfirmationService]
})
export class ProductModule { }
