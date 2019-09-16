[TOC]

# AngularJS笔记

## 什么是 AngularJS？

AngularJS 使得开发现代的单一页面应用程序（SPAs：Single Page Applications）变得更加容易。

- AngularJS 把应用程序数据绑定到 HTML 元素。
- AngularJS 可以克隆和重复 HTML 元素。
- AngularJS 可以隐藏和显示 HTML 元素。
- AngularJS 可以在 HTML 元素"背后"添加代码。
- AngularJS 支持输入验证。

----

## AngularJS 表达式 与 JavaScript 表达式

类似于 JavaScript 表达式，AngularJS 表达式可以包含字母，操作符，变量。

与 JavaScript 表达式不同，AngularJS 表达式可以写在 HTML 中。

与 JavaScript 表达式不同，AngularJS 表达式不支持条件判断，循环及异常。

与 JavaScript 表达式不同，AngularJS 表达式支持过滤器。

---

## Angular Cli使用

### 使用angular cli创建项目

1. 找到要创建项目的目录，然后运行命令：

```js
ng new angulardemo
```

2. **注意：angular cli创建项目时，会默认的帮助我们去下载项目依赖，使用的是npm，所以可能会非常慢，如果不想使用angular cli帮助我们下载，我们可以在命令后面加上`--skip-install`跳过依赖安装。**

```js
// 跳过依赖安装
ng new angulardemo --skip-install
```

3. 项目创建完成及依赖安装完成之后，运行项目命令：`ng serve --open`

### 在angular cli中，创建组件

1. `ng g component 文件名【可以加上路径】`如果路径没有，会自动创建相应的文件夹，创建完成之后，默认在app文件夹下
2. 创建好组件之后，会自动在`app.modules.ts中引入`。
3. 我们只需要找到创建的组件的ts文件，看组件的名称`selector`,然后在根组件`app.component.html`中以标签的形式引入即可。

### 在angular cli 中，创建服务

angular cli的服务类似于VueX，可以用来存储我们的公共方法，以便供多个不同的组件来调用。

1. `ng g service 服务名称【可加路径】`，如果路径没有，会自动创建相应的文件夹，创建完成之后，默认在app文件夹下

2. 创建好服务之后，需要手动在`app.modules.ts`中引入,例如：`import {StorageService} from    "./services/storage.service" `

3. 然后在`app.modules.ts`中配置服务的地方`providers:[]`配置名称StorageService。

4. 配置完成之后，在哪个组件里使用，我们还需要手动的在相应的组件里引入这个服务,例如：`import {StorageService} from "../../services/storage.service" `。注意路径问题。

5. 然后在constructor中引用这个组件【初始化】即可：

   ```
   // 推荐使用这种引入组件的方法
     constructor( public storage:StorageService) { }
   ```

   使用服务内部的方法，只需要通过`this.stoage.方法名`()，即可;

###在angular cli 中配置表单双向绑定

1. 配置表单双向绑定，需要在`app.modules.ts`中引入:`import { FormsModule } from '@angular/forms' `
2. 然后在`app.modules.ts`配置模块的选项中`imports:[]`引入FormsModule 即可。

### 在angular cli 中获取dom节点

1. 在angular cli中获取dom节点，可以使用原生的js，但是写原生js建议放在`ngAfterViewInit (){}`这个生命周期函数中，这个`生命周期函数是在视图加载完成之后触发的方法，dom也就记载完成了`。

2. 使用angular 提供的viewChild方法

   - 首先在html中定义一个模板，给他起一个名字，例如：

     ```html
     <div #myBox>
         这是一个盒子
     </div>
     ```

   - 然后在对应的ts文件中，import引入viewchild：

     ```js
     import { Component, OnInit, ViewChild } from '@angular/core';
     ```

   - 然后只需要在业务逻辑中通过`@ViewChild('myBox',{static:false}) myBox:any; `定义即可，myBox为起的模板名称。

   - 然后在`ngAfterViewInit (){}`生命周期函数中通过`this.myBox.nativeElement` 即可获取到dom节点

   - 如果要获取节点里面的值，可以使用`this.myBox.nativeElement.innerHTML `

### 在angular cli中进行父子组件的传值

**父向子传值**

1. 因为在父组件中调用了子组件，所以第一步，把在父组件中定义的数据，通过`[变量名]="变量名"`的形式绑定到子组件上，例如：`<app-header [title]="title"></app-header>`这样就把父组件中定义的数据绑定了。

2. 第二步，子组件要想使用父组件传过来的数据，要先导入`Input`模块，例如：

   ```js
   import { Component, OnInit, ViewChild, Input } from '@angular/core';
   ```

3. 然后在业务逻辑，通过`@INput() title:any`即可接受传递过来的值。

4. 在页面上直接使用`{{title}}`即可看到效果。

5. **这种方式不仅可以向子组件传递值，还可以向子组件传递一个方法。需要注意的是，在传递方法时，`[方法名] = "方法名"`,双引号的方法名不能加圆括号，不然代表方法执行。**

6. **也可以直接把整个父组件传递给子组件，`[父组件] = “this” `,注意，后边不在名，而是一个this，在子组件里接收的方法一样，接收完后，如果我们想调用父组件的一个方法，我们就可以通过`this.父组件.方法`**

### 在angular cli中配置http请求服务

1. 在angular cli项目中配置请求服务，首先要在`app.module.ts`中配置http请求模块：

   ```js
   // 引入angular的内置请求模块
   import {HttpClientModule} from '@angular/common/http'
   // 如果需要用到jsonp解决跨域请求问题，还需要引入HttpClientJsonpModule
   import {HttpClientModule,HttpClientJsonpModule} from '@angular/common/http'
   
   ```

2. 然后在模块配置中配置一下：

   ```js
   // 配置模块
     imports: [
       BrowserModule,
       HttpClientModule
     ]
   // 如果用到了JOSNP，那么也需要在模块配置中配置一下
     imports: [
       BrowserModule,
       HttpClientModule,
       HttpClientJsonpModule
     ]
   ```

3. 配置完成后，在哪个组件中使用http请求，则需要在相应组件中引入http请求服务：

   ```js
   // 在组件中引入http请求服务---get请求
   import {HttpClient} from '@angular/common/http'
   // 如果是post请求，还需要引入httpHeaders
   import {HttpClient,HttpHeaders} from '@angular/common/http'
   ```

4. 然后在constructor中声明一下即可。

   ```js
    constructor(public http:HttpClient) { }
   ```

5. get请求代码示例：

   ```js
   // get请求    
   let api:any = "http://a.itying.com/api/productlist"
       this.http.get(api).subscribe((response:any)=>{
         console.log(response);
       })
   ```

6. post请求代码示例：

   ```js
       // 首先定义请求类型【固定写法】
       const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   
       var api = 'http://127.0.0.1:3000/dologin';
   	// 第一个参数请求地址，第二个参数传输的数据，第三个参数就是定义的请求类型
       this.http.post(api,{"username":"张三","age":20},httpOptions).subscribe((response)=>{
         console.log(response);
       })
   ```

7. jsonp请求代码示例：

   ```js
     // 如果后台代码不允许跨域，那么我们就需要用到jsonP【现在把nodejs中的app.js中允许跨域的代码注释掉】
     // 前提是jsonp请求。服务器需要支持jsonp请求    
   let api:any = "http://a.itying.com/api/productlist";
       // 第一个参数是地址，第二个参数是回调【注意：有些服务器需要的callbackParam【就是callback】不一样，有些服务器叫callback，有些服务器叫cb，所以写的时候需要注意】
       this.http.jsonp(api,'callback').subscribe((response)=>{
         console.log(response);
       })
   ```


### 在angular cli中配置路由

**使用angular cli创建的带路由的项目里，存放路由的坑是**`<router-outlet></router-outlet> `

1. 把创建好的组件，在路由模块`app-routing.module.ts`中引入

   ```js
   import { HomeComponent } from './components/home/home.component';
   ```

2. 在 routes 模块中配置地址

   ```js
   // 配置路由
   const routes: Routes = [
     // 地址，动态加载的组件
     {
       path: 'home', component: HomeComponent
     }
   ];
   ```

3. 路由重定向

   ```js
     // 路由重定向的写法
     {
       path:'**',redirectTo:'home'
     }
   ```

4. 在根组件里使用路由，需要用到routerLink

   ```html
     <!-- 这样写里面的值是动态的 -->
     <a [routerLink]="[ '/home' ]" routerLinkActive="active">首页</a>
     <!-- 这样写里面的值是静态的 -->
     <a routerLink="/hime" routerLinkActive="active">首页</a>
   ```

   `routerLinkActive`是路由选中样式，在样式文件定义好我们需要的样式，然后直接把类名放过去就行了。

#### 路由get传值--通过url传值

1. 首先在父组件上，通过queryParams来进行传值

   ```html
   <ul>
      <!-- 遍历数组 -->
     <li *ngFor="let item of list;let key=index;">
       <!-- 通过url传值[get传值] -->
       <a [routerLink]="[ '/newscontent' ]" [queryParams]="{aid:key}">{{key}}--{{item}}</a>
     </li>
   </ul>
   ```

2. 在子组件上接收时

   - 先引入路由的一个模块

     ```js
     import { ActivatedRoute } from '@angular/router'
     ```

   - 声明一下

     ```js
     constructor(public route:ActivatedRoute) { }
     ```

   - 获取路由的值

     ```js
     this.route.queryParams.subscribe((data)=>{
       console.log(data);
     })
     ```


## Angular cli中集成 jquery+bootstrap+echarts依赖

### 集成jquery依赖

1. 下载jquery包：`cnpm i jquery -S`

2. 在`angular.json`文件的`scripts`里配置目录：

   ```js
   "node_modules/jquery/dist/jquery.js"
   ```

3. 在用到jquery的组件里：

   ```js
   import * as jQuery from 'jquery';// 这种方法使用$符号时，会出错，可以用jquery几个字母来代替
   // 或者
   declare var $: any;
   ```

### 集成bootstrap依赖

1. 下载bootstrap依赖包：`cnpm i bootstrap -S`

2. 在`angular.json`文件的`scripts`和`styles`里配置目录：

   ```js
   // styles
   "node_modules/bootstrap/dist/css/bootstrap.min.css"
   
   // scripts
   "node_modules/bootstrap/dist/js/bootstrap.min.js"
   ```

3. 需要注意的是，bootstrap对jquery有依赖，所以，一定要先引入jquery在引入bootstrap

### 集成echarts依赖

1. 下载echarts依赖包和ngx-echarts依赖包

   ```js
   // echarts
   cnpm i echarts -S
   
   // ngx-echarts
   cnpm i ngx-echarts -S
   ```

2. 在`angular.json`文件的`scripts`里配置目录：

   ```js
   "node_modules/echarts/dist/echarts.js"
   ```

3. 在`app.module.ts`里导入ngx-echarts包,并在imports模块里声明：

   ```js
   // 导入
   import { NgxEchartsModule } from 'ngx-echarts';
   
   // 声明
   imports: [
       BrowserModule,
       AppRoutingModule,
       NgxEchartsModule
   ]
   ```

4. 在需要用的组件里再次导入即可：

   ```js
   import * as echarts from 'echarts';
   ```

5. 需要注意的是：echarts使用时需要初始化，初始化里获取的dom节点，最好还是使用官方提供的原生js的获取方式，使用jquery获取，可能会出错。

