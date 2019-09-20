import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonService } from './service/common.service'

import { ProfileComponent } from './components/profile/profile.component';
import { AddressComponent } from './components/address/address.component';
import { OrderComponent } from './components/order/order.component';
import { UserComponent } from './user.component';



@NgModule({
  // 模块里的声明组件
  declarations: [ProfileComponent, AddressComponent, OrderComponent, UserComponent],

  // 如果想在外部使用模块内部的组件，需要暴露出去
  exports: [UserComponent, AddressComponent],

  imports: [
    CommonModule
  ],
  // 引入服务，需手动创建
  providers: [
    CommonService
  ]
})
export class UserModule { }
