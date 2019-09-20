import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { PlistComponent } from './conponents/plist/plist.component';
import { CartComponent } from './conponents/cart/cart.component';
import { PinfoComponent } from './conponents/pinfo/pinfo.component';



@NgModule({
  declarations: [ProductComponent, PlistComponent, CartComponent, PinfoComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductComponent]
})
export class ProductModule { }
