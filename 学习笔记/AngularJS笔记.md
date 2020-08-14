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

3. 然后在业务逻辑，通过`@Input() title:any`即可接受传递过来的值。

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

### angular cli中的路由

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

##### get传值通过js跳转路由

1. 在父组件里设置点击事件.

2. 在对应的TS文件里写逻辑

   1. 要通过get传值的方法通过js跳转路由，除了需要引入 Router 模块外，还需要引入 NavigationExtras  模块。

      ```js
      // 通过js动态跳转路由时，需要引入路由模块
      // get传值跳转路由，需要引入NavigationExtras
      import { Router, NavigationExtras } from '@angular/router';
      ```

   2. 在点击事件函数里写

      ```js
        goNews() {
          // 跳转并进行get传值
          const queryParams: NavigationExtras = {
            queryParams:{'aid': '123'}
          };
      
          this.router.navigate(['/news'], queryParams);
        }
      ```

      【在不引入NavigationExtras模块的情况下，依然是可以通过get传值跳转路由的，不过引入NavigationExtras更加标准】

#### 动态路由传值及获取参数

##### 动态路由routerLink跳转

1. 首先在需要配置路由，在需要跳转到的路由中配置。【重点在aid】

   ```js
     {
       path: 'newscontent/:aid', component: NewscontentComponent
     }
   ```

2. 在父组件即【点击跳转的组件】中，通过路由传值。

   ```html
   <ul>
     <li *ngFor="let item of list;let key = index;">
       <a [routerLink]="[ '/newscontent/', key ]">{{key}} --- {{item}}</a>
     </li>
   </ul>
   ```

   上面的 `key`即为传递的值。

3. 获取路由的值。【和上面get传值获取值的配置基本相同，不同点在于获取路由的值】

   ```js
   // 动态路由获取值
   this.route.params.subscribe((data) => {
     console.log(data);
   });
   ```

##### 动态路由js跳转

1. 在父组件上通过路由跳转，设置点击事件

   ```html
   <!-- 跳转到商品详情，并传入了静态的值123 在页面里跳转 -->
   <a [routerLink]="[ '/productcontent', '123' ]">跳转到商品详情</a>
   
   <!-- 在商品详情页，设置点击事件，通过js跳转路由 -->
   <button (click)="goNewsContent()">js跳转路由到商品详情【动态路由】</button>
   <button (click)="goHome()">js跳转路由到首页【普通路由】</button>
   ```

2. 在父组件相应的TS文件里配置

   1. 首先要先引入 路由模块

      ```js
      // 通过js动态跳转路由时，需要引入路由模块
      import { Router } from '@angular/router';
      ```

   2. 在constructor里声明一下

      ```js
      constructor(public router: Router) { }
      ```

   3. 跳转路由

      ```js
        goNewsContent() {
          // 跳转路由  【如果配置动态路由传值，这里是需要传入值的】
          this.router.navigate(['/newscontent/', '123']);
        }
      
        // 普通路由，没有配置动态路由传值
        goHome(){
          this.router.navigate(['/home']);
        }
      ```

#### angular cli 中的父子路由嵌套

**父子路由嵌套的应用场景：[参考链接](https://angular.cn/docs)**

> 这是angular的文档模块，是一个很好的父子路由嵌套案例：

+ 当用户点击导航栏的文档时，跳转到文档模块
+ 同时，文档模块下，有分为左右两个模块，点击左侧的菜单模块，右侧的区域随之改变，并且页面不刷新。
+ 这就是angular的父子嵌套，在文档这个父组件下，又嵌套了一个子组件。

**父子路由用法注意事项**

1. 首先要配置路由模块，与以往配置模块不同，如果是父子嵌套路由，那么子组件的路由，我们可以配置在`children[]`数组里。

   ```js
     {
       path: 'home', component: HomeComponent,
         children: [
           { path: 'XXX', component: XXX },
           // 路由重定向
           { path: 'XXX', redirectTo: XXX }
         ]
     }
   ```

2. 然后在父组件里，设置路由连接。

   ```html
   <!-- home是父组件，welcome是子组件 -->
   <a [routerLink]="[ '/home/welcome']">跳转</a>
   ```

   注意写路径的时候，路径是`/父路由/子路由`

3. 到此，我们的路由还是无法跳转的，无法去加载子路由。

   + 在根组件，我们知道，路由的显示，是通过`<router-outlet></router-outlet> `。

   + 所以，在父组件里也是一样的，我们需要给子组件设置一个在父组件中显示的坑。

     我们需要在父组件右侧区域的盒子里也配置

      ```html
     <router-outlet></router-outlet>
      ```

如果想要增加点击显示效果，就增加一个`routerLinkActive="active" `；

【注意，我们在创建子组件时，建议直接创建在父组件的文件夹里，这样看起来更有逻辑。】

### 在angular cli 中自定义模块

1. 创建模块的命令

   ```js
   // 创建一个module文件夹，并创建了一个user组件
   ng g module module/user
   
   // 如果在模块中，需要使用路由的话，我们需要使用命令
   ng g module module/user --routing
   ```

2. 在模块里创建组件【创建服务也是基本一样】，用法笔记中有，模块里引入服务，需要手动创建`providers`

   ```js
   // 在user模块里创建了一个components文件夹，在components文件夹下创建了一个profile组件
   ng g component module/user/componetns/profile
   // 在user模块里创建了一个service文件夹，在service文件夹下创建了一个common服务
   ng g service module/user/service/common
   ```

   如果我们直接，在user模块里创建一个user组件,则会直接在user模块增加html scss等文件，这就和根模块结构类似了。

   ```js
   ng g component module/user
   ```

   **此时，我们的user组件，就相当于在user模块中的根组件，其他组件是子组件**

3. 如果我们想在外部使用我们自定义的模块中的组件，那么我们需要手动暴露出去

   ```js
   //在@NgModule里  []里是组件名称
   exports：[UserCompomemt]
   ```

4. 暴露之后，在外部使用我们的模块里的组件时，先引入我们自定义模块，然后挂载到imports里

   ```js
   // 在根组件里引入自定义模块,挂在到imports里
   import { UserModule } from './module/user/user.module'
   
   // 挂载
    imports: [
       UserModule
     ],
   ```

   这样我们就可以在外部组件中使用了。

   **但是，这是暴露了我们user模块里的user根组件，我们现在在外部依然使用不了模块里的子组件。当然，如果我们把子组件挂载到user根组件上是可以显示的。**

5. 如果要在外部使用我们自定义模块里的子组件，我们也需要把自定义模块里的子组件暴露出来，这样，我们在外部的组件中就能使用了。【注意，由于在外部我们引入了当前自定义模块，所以不需要在引入自定义模块里的子组件】

#### 自定义模块实现路由懒加载

1. 首先我们需要创建一个带路由的自定义模块

   ```js
   ng g module module/article --routing
   ```

2. 在自定义模块的路由文件里，配置路由

   ```js
   // 由于模块里没有子组件。所以路径是空的
   const routes: Routes = [
     { path: '', component: ArticleComponent }
   ];
   ```

   + 如果在自定义模块里还有其他子组件，想要加载时，只需要在对顶的父组件路由模块引入，然后配置即可

   ```js
   const routes: Routes = [
     { path: '', component: ArticleComponent },
       
       // 如果在这个定义模块中还存在profile和plist组件，我们只需这样配置
     { path: 'profile', component: ProfileComponent },
     { path: 'plist', component: PlistComponent }
   ];
   ```

   + 这样我们就可以通过路由，跳转到，我们自定义模块里的子组件上。

   **如果我们只是单纯的这样做，我们自定义模块里的子组件，其实还是挂在到了外部的根组件上。**

   + 所以我们可以参照前面的父子路由嵌套，把自定义模块里的子组件挂在到自定模块的父组件上。

     ```js
     const routes: Routes = [
       {
       	path: '', component: ArticleComponent,
       	children:[
             { path: 'profile', component: ProfileComponent },
             { path: 'plist', component: PlistComponent }
       	]
       }
     ];
     ```

     **注意别忘了在自定义模块的父组件html文件，加上`<router-outlet></router-outlet> `**

3. 在外部的组件，html里，设置routerlink，别忘了要有`<router-outlet></router-outlet> `

   ```html
   <a [routerLink]="[ '/article' ]">路由懒加载【文章模块】</a>
   ```

4. 然后在外部组件的路由里，配置自定义模块路径。

   【注意：不需要在外部的组件里引入自定义模块了】

   ```js
   const routes: Routes = [
     { path: 'article', loadChildren: './module/article/article.module#ArticleModule' }
   ];
   ```

   **注意写法：path里直接就是自定义模块的名称，然后loadChildren里是模块的路径，路径后面要带一个#号，#号后面是模块的类名。【可以参考自定义模块的TS文件里的最后一行的那个名称】**

   + 如果想让页面打开时，默认加载指定的自定义模块，就需要用到重定向

     ```js
     const routes: Routes = [
       { path: 'article', loadChildren: './module/article/article.module#ArticleModule' },
       // 重定向
       { path: '**', loadChildren: 'article' }
     ];
     ```

### 路由守卫

#### 路由守卫使用情况简介：

1. 只有当用户已经登录并拥有某些权限的时候才可以进入某些路由。
2. 一个由多个表单组件组成的向导，例如注册流程，用户只有在当前的路由组件中填写了满足要求的信息才可以导航到下一个路由
3. 当用户未执行保存操作而试图离开当前导航时提醒用户。

#### 路由的三种守卫

1. CanActivate：处理导航到某路由的情况。
2. CanDeactivate：处理从当前路由离开的情况。
3. Rsolve：在路由激活之前获取路由数据。

#### 使用路由守卫

##### CanActivate 实现登录判断用户是否合法

1. 新建写路由守卫ts文件，例如：login.guard.ts

2. 实现CanActivate接口：

   ```js
   import {CanActivate} from "@angular/router"
   
   export class LoginGuard implements CanActivate {
   	// 这个方法，返回bool值，以此来决定路由请求是否通过
       canActivate(){
       	// 这里写逻辑
       	-------------例如-------------
       	// 如果loggedIn值大于0.5，判断为用户登录
       	let loggedIn：boolean = Math.random() < 0.5;
       	if(!loggedIn){
               console.log("用户未登录");
       	}
           return loggedIn;
           ------------------------------
       }
   }
   ```

3. 修改路由配置，加到对应的路由上

   ```js
   // 随便写的路由
   {path："\",component:"gen",canActivate：[LoginGuard]}
   
   // canActivate是数组，可以指定多个路由守卫，届时路由守卫会逐个判断
   ```

4. 在router.js里，把LoginGuard进行依赖注入

   ```js
   @NgModule({
       providers:[LoginGuard]
   })
   ```

---

##### CanDeactivate 实现用户离开时弹窗提示

1. 新建写路由守卫ts文件，例如：unsave.guard.ts

2. 实现CanDeactivate接口

   ```js
   // 需要引入两个文件
   import {CanDeactivate} from "@angular/router"
   import {yourcomponent} from "yourcomponent-path"
   // CanDeactivate需要一个泛型，就是受保护的组件类型
   export class UnsavedGuard implements CanDeactivate<yourcomponent>{
       CanDeactivate(component: yourcomponent){
           // 这里写逻辑
           return window.confirm("是否要离开？"); // 为了简单，这里就直接返回了一个confirm
       }
   }
   ```

接下来就同 **实现登录判断用户是否合法** 第三四步，把`UnsavedGuard`加到对应的路由上，然后在providers里声明

---

##### Rsolve 解决请求加载较慢，页面上差值表达式值未显示，交互不好的问题、

resolve守卫会在进入路由之前，预先从服务器上读取信息，在页面加载时，带着信息进到路由里，从而避免标题所说的问题。

1. 新建一个resolve守卫文件，例如：product.resolve.ts

2. 实现Resolve接口

   ```js
   import {Resolve} from "@angular/router"
   // Resolve守卫同样需要一个泛型，这个泛型是你返回的信息的类型，例如：product类
   
   @Injectable() // 只要不是component都需要被@Injectable装饰器装饰
   export class ProductResolve implements Resolve<Product>{
       
       // 只有被@Injectable装饰器装饰了，才能把路由注入进来
       constructor(private router:Router){}
       resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Observable<Product> {
       	// 这样就可以拿到路由中的数据 【这是例子】
       	let id：number = route.params["id"];
       	//逻辑：如果id是1，怎么样，id是2怎么样。。。。
           if(id === 1){
   			return new Product(1, "ipone7");
   		} else {
       		// 跳转路由
   			this.router.navigate('/');
               return undefined;
           }
   	}
   }
   
   // 声明的这个类，最好写在其他文件里，然后在resolve守卫文件里导入即可
   export class Product {
   	constructor(
   		public id:number,
   		public name: string
   	){}
   }
   ```

3. 把resolve守卫加到对应的路由上

   ```js
   {path："\",component:"gen",resolve：{
       product：ProductResolve
   }}
   ```

4. 在providers里声明

   ```js
   @NgModule({
       providers:[ProductResolve]
   })
   ```

5. 然后在接收的界面，我们要根据传过来的值，定义接收的值

   ```js
   // 比如在ProductComponent里接收
   public proId:number;
   public proName:string;
   
   ngOinit(){
   	// 订阅传进来的数据
       this.routeInfo.data.subscribe((data:{product:Product}) => {
           this.proId = data.product.id;
           this.proName = data.product.name;
       })
   }
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

## 升级Angular-CLI

1. 卸载angular-cli

   ```
   npm uninstall -g angular-cli
   ```

2. 清除缓存

   ```
   npm cache clean -f
   ```

3. 到安装目录查看是否卸载干净

   ```
   find/usr -name ng
   ```

   若未卸载干净(第三步有内容输出)，则去到对应的目录删除；如若卸载干净(第三步未有内容输出).

4. 安装最新版本

   ```
   npm install -g @angular/cli@latest
   ```

   