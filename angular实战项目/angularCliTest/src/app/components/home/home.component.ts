// ViewChild功能：
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public picUrl: string = "https://www.baidu.com/img/bd_logo1.png";

  constructor() { }

  // 组件和指令初始化完成，dom为加载
  ngOnInit() {
    // 所以在这个生命周期函数里，获取dom元素会出现问题，可能会获取不到
  }


  // 获取dom节点
  @ViewChild('myBox',{static:false}) myBox:any;
  ngAfterViewInit(): void {
    console.log(this.myBox.nativeElement);
    console.log(this.myBox.nativeElement.innerHTML);
  }


  // 视图加载完成之后触发的方法，dom加载完成（建议把原生dom操作放在这里）
  // ngAfterViewInit(): void {
    
  //   var box:any = document.getElementById('box');
  //   console.log(box);
  // }


  // 传递给header子组件的值
  public title:any = "这是一个传递过去的值"

}
