import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入组件
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NewscontentComponent } from './components/newscontent/newscontent.component';

// 配置路由
const routes: Routes = [
  // 地址，动态加载的组件
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'news', component: NewsComponent
  },
  {
    path: 'newscontent', component: NewscontentComponent
  },
  {
    path: 'product', component: ProductComponent
  },
  // 路由重定向
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
