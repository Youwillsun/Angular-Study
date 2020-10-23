// 使用第三方模块axios来进行http请求
import { Injectable } from '@angular/core';

// 引入axios模块
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor() { }

  axiosGet(api) {

    return new Promise((resolve, reject)=> {
      axios.get(api).then(function (response) {
        resolve(response);
      })
    })

  }
}
