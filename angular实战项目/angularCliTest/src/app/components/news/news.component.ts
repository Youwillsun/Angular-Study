import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public title = "我是新闻组件";

  msg = "我是一个新闻组件的msg";

  username:string = "张三";

  public student:any = "我是一个学生的属性";

  public userinfo:object = {
    username:'张三',
    age:20
  }

  public message:any;

  public content:any = "<h2>我是一个html标签</h2>";

  public arr = ['111','222','333'];

  public list:any[] = ['我是一个新闻','22222','我是第三个新闻'];

  public items:Array<any> = ['我是一个新闻','我是第三个新闻'];

  constructor() { 
    this.message = "这是给属性赋的值，改变属性的值";

    // 获取属性的值
    console.log(this.msg);

    // 改变属性的值
    this.msg = "这是改变后的msg的值"
  }

  ngOnInit() {
  }

}
