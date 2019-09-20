import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入组件
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NewscontentComponent } from './components/newscontent/newscontent.component';
import { ProductcontentComponent } from './components/productcontent/productcontent.component';

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
    path: 'newscontent/:aid', component: NewscontentComponent
  },
  {
    path: 'product', component: ProductComponent
  },
  {
    path: 'productcontent/:pid', component: ProductcontentComponent
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
