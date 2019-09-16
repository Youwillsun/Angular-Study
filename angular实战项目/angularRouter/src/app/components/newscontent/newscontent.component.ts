import { Component, OnInit } from '@angular/core';

// 引入路由模块，用于传值
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-newscontent',
  templateUrl: './newscontent.component.html',
  styleUrls: ['./newscontent.component.scss']
})
export class NewscontentComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.queryParams);

    this.route.queryParams.subscribe((data)=>{
      console.log(data);
    })
  }

}
