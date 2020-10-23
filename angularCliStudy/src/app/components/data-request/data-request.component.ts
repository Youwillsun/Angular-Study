import { Component, OnInit } from '@angular/core';

// 在组件中引入http请求服务
import {HttpClient,HttpHeaders} from '@angular/common/http';

// 引入自定义服务
import {HttpserviceService} from '../../services/httpservice.service';

@Component({
  selector: 'app-data-request',
  templateUrl: './data-request.component.html',
  styleUrls: ['./data-request.component.scss']
})
export class DataRequestComponent implements OnInit {

  public list:any[] = []
  constructor(public http:HttpClient,public httpService:HttpserviceService) { }

  ngOnInit() {
  }

  getData(){
    // alert('执行get请求');
    let api:any = "http://a.itying.com/api/productlist"
    this.http.get(api).subscribe((response:any)=>{
      console.log(response);
      this.list = response.result;
    })
  }

  doLogin(){
    // 首先定义请求类型【固定写法】
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

    var api = 'http://127.0.0.1:3000/dologin';
    // 第一个参数请求地址，第二个参数传输的数据，第三个参数就是定义的请求类型
    this.http.post(api,{"username":"张三","age":20},httpOptions).subscribe((response)=>{
      console.log(response);
    })
  }

  // 如果后台代码不允许跨域，那么我们就需要用到jsonP【现在把nodejs中的app.js中允许跨域的代码注释掉】
  // 前提是jsonp请求。服务器需要支持jsonp请求
  getJsonpData(){
    let api:any = "http://a.itying.com/api/productlist";
    // 第一个参数是地址，第二个参数是回调【注意：有些服务器需要的callbackParam【就是callback】不一样，有些服务器叫callback，有些服务器叫cb，所以写的时候需要注意】
    this.http.jsonp(api,'callback').subscribe((response)=>{
      console.log(response);
    })
  }

  getAxiosData(){
    let api:any = "http://a.itying.com/api/productlist";
    this.httpService.axiosGet(api).then((data)=>{
      console.log(data);
    })
  }
}
