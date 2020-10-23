import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 引入之后才可以实现数据双向绑定
import { FormsModule } from '@angular/forms'

// 引入angular的内置请求模块
import {HttpClientModule,HttpClientJsonpModule} from '@angular/common/http';

// 引入httpservice自定义服务
import {HttpserviceService} from './services/httpservice.service';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component';
import { TodolistComponent } from './components/todolist/todolist.component';

import {StorageService} from './services/storage.service';
import { HeaderComponent } from './components/header/header.component';
import { DataRequestComponent } from './components/data-request/data-request.component';
import { NgBootstrapComponent } from './components/ng-bootstrap/ng-bootstrap.component';
// 引入bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  // 配置组件
  declarations: [
    AppComponent,
    NewsComponent,
    HomeComponent,
    FormComponent,
    SearchComponent,
    TodolistComponent,
    HeaderComponent,
    DataRequestComponent,
    NgBootstrapComponent
  ],
  // 配置模块
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  // 配置服务
  providers: [StorageService, HttpserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
