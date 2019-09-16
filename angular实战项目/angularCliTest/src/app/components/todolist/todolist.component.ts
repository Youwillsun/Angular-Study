import { Component, OnInit } from '@angular/core';

// 引入服务
import {StorageService} from "../../services/storage.service";
// var storage = new StorageService;// 不推荐这种用法

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  public keywords: string;
  public todolist: any[] = [];

  // 推荐使用这种引入组件的方法
  constructor( public storage:StorageService) { 
    
  }

  ngOnInit() {
    var searchlist = this.storage.get('searchlist');

    if(searchlist){
      this.todolist = searchlist;
    }
  }

  doAdd(e) {
    if (e.keyCode == 13) {

      if (!this.todilistHasKeyWord(this.todolist, this.keywords)){
        console.log(132);
        this.todolist.push({
          title: this.keywords,
          status: 0 // 0表示待办事项
        });
        this.keywords = "";

        this.storage.set('searchlist',this.todolist);
      }else{
        alert("数据已经存在");
        this.keywords = "";
      }
    }
  }

  deleteData(key) {
    this.todolist.splice(key, 1);
    this.storage.set('searchlist',this.todolist);
  }

  todilistHasKeyWord(todolist: any, keywords: any) {
    // 异步，会有问题
    // todolist.forEach(value => {
    //   if (value.title == keywords) {
    //     return true;
    //   }
    // });
    // return false;

    for(var i = 0; i<todolist.length; i++){
      if(todolist[i].title == keywords){
        return true;
      }
    }
    return false;
  }

  checkbox(){
    this.storage.set('searchlist',this.todolist);
  }

}
