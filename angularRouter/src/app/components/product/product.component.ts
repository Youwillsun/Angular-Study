import { Component, OnInit } from '@angular/core';

// 通过js动态跳转路由时，需要引入路由模块
// get传值跳转路由，需要引入NavigationExtras
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goNewsContent() {
    // 跳转路由  【如果配置动态路由传值，这里是需要传入值的】
    this.router.navigate(['/newscontent/', '123']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goNews() {
    // 跳转并进行get传值
    const queryParams: NavigationExtras = {
      queryParams:{'aid': '123'}
    };

    this.router.navigate(['/news'], queryParams);
  }

}
