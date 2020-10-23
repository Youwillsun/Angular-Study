import { Component, OnInit } from '@angular/core';

import {StorageService} from "../../services/storage.service"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keywords: string;

  public historyList: any[] = [];

  constructor( public storage:StorageService) { }

  // 页面刷新会触发这个生命周期函数
  ngOnInit() {
    var searchlist:any = this.storage.get('searchlist');

    if(searchlist){
      this.historyList = searchlist;
    }
  }

  doSearch() {
    if (this.historyList.indexOf(this.keywords) == -1) {
      this.historyList.push(this.keywords);
      this.storage.set('searchlist',this.historyList);
    }
    this.keywords = "";
    console.log(this.keywords);
  }

  deleteHistory(key){
    this.historyList.splice(key,1);
    this.storage.set('searchlist',this.historyList);
  }

}
