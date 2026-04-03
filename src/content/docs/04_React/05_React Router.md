---
title: 'react-router'
---

# 第一节、前端路由 react-router介绍

> 前端路由的核心就是，改变URL，但是页面不进行整体的刷新。

- 方式一：`H5` 的 `history`

- 方式二：`hash` 锚点

  > hash的优势就是兼容性更好，在老版IE中都可以运行，但是缺陷是有一个#，显得不像一个真实的路径
  >
  > hash 兼容性好，



## 一、React-router 6 -21年底更新

> `React Router`在最近两年**版本更新的较快**，并且在**最新的 `React Router6.x` 版本中发生了较大的变化**

- 目前`React Router6.x`已经非常稳定，我们可以放心的使用；

  - 安装时选择`react-router-dom`，`react-router`会包含一些`react-native`的内容，`web`开发并不需要

  ~~~shell
  npm i react-router-dom
  ~~~



## 二、React-router5 的使用区别



### 1. withRouter获取路由参数

- `router6` 全部使用的`hooks`，

- 已经没有 `withRouter` `hoc` 了，

- 所以要在类组件当中使用的话，

  >  需要根据相关hooks手动封装一个 withRouter
  >
  > 例如： `{ useLocation, useNavigate, useParams, useSearchParams }` ... 一些hooks 对 props 进行扩展



  - 因为 `hooks` 只能在函数组件或者自定义的hooks的顶层中使用

- router5 为什么要使用 withRouter

  > 因为当路由跳转到的组件是一个普通渲染(就是非路由跳转的)组件，那么不可以直接获取history、location、match对象

  - **需要手动封装hoc的场景**，因为 router6中已经全部都是使用hook获取history对象，hooks只能在函数组件或者自定义hooks中使用，**不能在class组件中使用**，这个时候可以手动封装withRouter



#### router5-手动跳转

- 方式一：如果该组件是**通过路由直接跳转**过来的，那么可以**直接获取**history、location、match对象；

- 方式二：如果该组件是**一个普通渲染的组件**，那么**不可以直接获取**history、location、match对象；、
  - App组件必须包裹在`Router`组件之内；
  - App组件使用`withRouter`高阶组件包裹；
    - `router6` 就需要自己封装了。

- 使用

  > 通过上述两个方式完成之后，可以直接使用 history 进行跳转

  - `react-router` 会将 `history`、`location`、`match` 这3个对象存放到 `props` 属性中

  ~~~js
  this.props.history.push("/profile");
  ~~~





#### router5-传递参数

> 传递参数有三种方式：

##### 动态路由的方式；

> 同vue相似、使用路径参数进行占位

~~~typescript
<Route path="/detail/:id" component={Detail}/>
~~~



**获取**：通过 `match` 对象中的 `params` 进行获取

~~~typescript
<h2>Detail: {this.props.match.params.id}</h2>
~~~



##### search传递参数；

> 就是 queryString 的传值方式

~~~typescript
<NavLink to="/detail2?name=why&age=18">详情2</NavLink>
~~~



**获取**：通过 `location` 对象中的 `search` 属性进行获取

~~~typescript
    console.log(this.props.location.search); // ?name=why&age=18
~~~



##### to传入对象；

~~~typescript
<NavLink to={{
    pathname: "/detail2",
    query: {name: "kobe", age: 30},
    state: {height: 1.98, address: "洛杉矶"},
    search: "?apikey=123"
  }}>
 {/*直接获取location对象*/}
 console.log(this.props.location);
~~~





### 2、路由组件的使用

#### router5

1. 使用的是 `Switch` 组件，

   > 作用排他思想，当有一个路由组件匹配到了，其他的就不要匹配了，从上到下



2.  `Route` 可以单独使用，

   > 不使用 `Switch` 的情况下，也能单独使用，**例**：`/about` 和  `/:userid` 这两个组件都会匹配到且都能显示



3. 抽取配置文件需要额外引入插件

4. 引入组件使用的 `component`

   ~~~typescript
   <Switch>
       {/*另外这里的路由指定的组件是没有标签包裹的*/}
     <Route exact path="/" component={Home} />
     <Route path="/about" component={About} />
     <Route path="/profile" component={Profile} />
     <Route path="/:userid" component={User} />
     <Route component={NoMatch} />
   </Switch>
   ~~~

5. 路由嵌套

   > 所有的`Route` 组件都是在同一个层级



6. exact：boolean 类型，精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；

   ~~~typescript
   <Route exact path="/" component={Home} />
   ~~~

   `Router6.x`不再支持该属性

7. 路由配置

   > 需要下载对应的库 `react-router-config`

   - 之后将 `Switch` 配置，换成 `react-router-config` 中提供的 `renderRoutes(routes)` 函数：

   ~~~js
   import Home from "../pages/home";
   import About, { AboutMessage, AboutProduct } from "../pages/about";
   import Profile from "../pages/profile";
   import Login from "../pages/login";
   import User from "../pages/user";
   import Detail from "../pages/detail";
   import Detail2 from "../pages/detail2";
   import NoMatch from "../pages/nomatch";

   const routes = [
     {
       path: "/",
       exact: true,
       component: Home
     },
     {
       path: "/about",
       component: About,
       routes: [
         {
           path: "/about",
           exact: true,
           component: AboutProduct
         },
         {
           path: "/about/message",
           component: AboutMessage
         },
       ]
     },
     {
       path: "/profile",
       component: Profile
     },
     {
       component: NoMatch
     }
   ];

   export default routes;
   ~~~



#### router6

1. 使用的是 `Routes` 组件

2. 按 `Route` 只能存在 `Routes` 组件内部，

3. 默认支持将路由抽取成配置文件

4. 引入组件使用的 `element`

   > 这里指定的路由组件是有包裹的

5. 路由嵌套

   > 是 `Route` 又包裹了 `Route`

6. 手动跳转

   > 这个就需要利用相关的 hooks 封装writeRouter hoc了





# 第二节、React-Router6

- 应用开启路由的功能，需要使用 `react-router-dom` 中指定的组件包裹

  - `BrowserRouter`组件包裹 使用`history`模式；

    > **注意**：该组件**一定要包裹 `App` 组件**，如果被`App`组件包裹，**在使用 `useRoutes` 的时候会报错**

  - `HashRouter`组件包裹 使用`hash`模式；



## 一、路由配置

> 在react 中的路由配置是使用路由组件进行配置的



**注意**：所有的路由组件 `route` 都由 `routes` 包裹的

- `path` 属性定义访问路径

- `element` 定义该路径需要渲染的组件

  > **注意**：一定要是**`React` 组件元素**，不能是 `class`

  - `router5` 传入的是类

- `router5 `中 `exact`精准匹配，否则两个组件都会显示，router6已经取消了

~~~typescript
const App = memo(() => {
  return (
    <BrowserRouter>
      <div className="container">
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>
        <Link to="/message">message</Link>

        <div className="box">
          <Routes>
            <Route path="/" element={<About/>}/>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/message" element={<Message/>}></Route>
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
})
~~~



### 1、动态路由

- 同 `vue` 动态路由，**路径参数相同**

~~~typescript
<div className="box">
    <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home/:id" element={<Home/>}></Route>
    </Routes>
</div>
~~~





### 2、NotFound Page

- `path` 属性值： `*` 代表**通配**，当所有路由**都匹配不到**的时候，**会匹配 `*` 的路由**

~~~typescript
<Routes>
    <Route path="/" element={<Navigate to={"/home"}/>}/>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
</Routes>
~~~







## 二、Link、Navlink组件

- ##### Link 组件的属性

  - `replace`：`Boolean` 类型，配置之后代表**替换当前路径**

  - `state`：`any` 类型，当前`url`保存的状态

  - `to`：`String`类型，指定点击之后要跳转的路由

  - `reloadDocument`：`Boolean` 类型，默认 `false` 不刷新

    > 表示路由切换的时候是否需要重新加载。基本不用配置

    - `react` 中没有 `keep-alive`，也没有导航守卫



- ##### Navlink

  > 和 `link` 的区别就是，会给**选中**的 `a`元素(`Link`和`NavLink`渲染之后就是`a`元素) **添加一个指定的 ` active class`**

  - 一般不怎么用，**如果是 `button` 的就不会自动添加class了**

    - 限用于 a 标签属性，太长的话放到一个函数里



  - ##### 支持自定义

    > Style 属性可以传入一个函数

    ~~~typescript
    <NavLink to={"/about"}
        className={
            //传入一个函数，形参是一个对象，形参的isActive 属性，来判断是否选中
            		({isActive} ) => isActive ? "link-active" : ""
        		  }
    >
        about
    </NavLink>

    <NavLink to={"/message"}
        className={
            		({isActive} )=> isActive ? "link-active" : ""
                  }
    >
        message
    </NavLink>
    ~~~



## 三、Navigate组件



### 展示组件

> `Naviage` 组件展示的时候会**自动切换**到 **`to` 属性对应的路由组件**

- **重点注意**：**只能**在**路由组件中使用**

- 和 `Link` 组件的区别就是，`Navigate` 需要 `back` 两次

  > `Navigate` 不是 ~~Navigator~~

~~~typescript
<div className="content">
    {flag ? <Navigate to="/message"/> :
       		<button onClick={e => this.trigger(e)}
            >
        		trigger
    		</button>
    }
    <Link to={"/message"}>message</Link>
</div>
~~~

​

### 重定向

> 也是相当于重定向

- 根据 `to` 属性跳转到指定的路由组件。
- 还有一个 `Navigate` 对象

~~~typescript
<Routes>
    <Route path="/" element={<Navigate to={"/home"} />}/>
    <Route path="/home" element={<Home/>} ></Route>
</Routes>
~~~



## 四、路由嵌套



### Router6

- 所有的嵌套**都在一个 `Routes` 一个组件中**

  > 相当于顶层的 `router-view` + 路由配置

- 之后**使用 `Outlet` 组件进行占位**

  > 相当于嵌套组件中的 `router-view`

- **唯一的区别**：就是，`vue`**非**配置文件中的 `children` 路由是**不添加父级路由的`path`的**，`react` 标签中**需要添加**

  - ##### 否则报错，把这个区别记下来基本就没事了

  - 跳转也是同样，**就记住：加全路径**

~~~typescript
<Routes>
    <Route path='/home' element={<Home/>}>
        <Route path='/home' element={<Navigate to="/home/recommend"/>}/>
        <Route path='/home/recommend' element={<HomeRecommend/>}/>
        <Route path='/home/ranking' element={<HomeRanking/>}/>
        <Route path='/home/songmenu' element={<HomeSongMenu/>}/>
    </Route>
</Routes>
~~~





### Router5 了解

- 如果在 `home`下嵌套的话

  ~~~typescript
  <Switch>
      <Route path='/home' element={<Home/>}/>
  </Switch>
  ~~~



- 需要在 `Home` 组件中进行嵌套

  ~~~typescript
  //home组件
  return (
      <div>
          <Link to="/zhangsan">切换</Link>
          <Link to="/lisi">切换</Link>
          <Switch>
              <Route path='/zhangsan' element={<Zhangsan/>}/>
              <Route path='/lisi' element={<Lisi/>}/>
          </Switch>
      </div>
  )
  ~~~





## 五、router6 hooks 跳转

> `Router6.x`版本之后，代码类的`API`都迁移到了**hooks的写法**

- ##### 仅支持函数式组件使用

- 类组件的话需要**手动实现 `hoc` 高阶组件**对 `props` 进行**扩展**

- 注意：react-router-dom6中**没有 query 对象**

- 传值方式之有 search ，动态参数，和state

- state传值是隐藏的



### 1、useNavigate

> 还`hook`，返回一个函数，创建函数的主要功能就是进行页面跳转

~~~js
const navigate = useNavigate()
navigate(path, options)
~~~

- **参数一** `path`：将要跳转的路径
- **参数二** `options`：
  - `state`：保存当前 `url` 状态
  - `replace`：`boolean` 是否替换当前历史
- **参数三** `delta`：`Number`类型，回退的级别,
- 注意：只能拼查询字符串

~~~js
  trigger(path, id) {
      //state 在location 对象中获取
      this.props.route.navigate(path, {state: {id},replace: true})
  }
~~~



### 2、useLocation

> 获取 `location` 对象

- **返回值**：`Object` 对象

  > 使用场景：当使用state传惨的时候，获取state

- router5中会有query对象，router6里面没有

~~~js
 localtion:{
    hash: ""
    key: "r5qxvly1"
    //path
    pathname: "/home/more"
    //查询字符串
    search: "?name=yanxiaoliu"
    //当前路由状态
    state: {id: 1}
}
~~~



### 3、useParams

> **获取**路径**动态参数**

- **返回值**：`Object` 类型，路径参数为`key`，路径`path` 为 `value`

  ~~~typescript
  //1、定义
  <Route path="/profile/:id" element={<Profile/>}></Route>
  //2、跳转
  this.props.route.navigate(“/home/zhangsan”)
  //3、获取动态参数
  const params = useParams()
  //4、打印
  console.log(params)
  //output {id: "zhangsan"}
  ~~~



### 4、useSearchParams

> 获取查询字符串，**标准的 `hook` 函数**

- ##### 返回值：`Array`类型

  - **索引`0`**：获取值值, 主要就获取值

    > 索引 0 的位置，保存的是一个 `URLSearchParams` 类型的实例对象

  - **索引`1`**：设置值

    > 基本没有使用场景，设置的也是当前url的param

  ~~~js
  //组件一：
  const navigate = useNavigate()
  navigate("/home/about?name=zhnagsan&age=15")


  ~~~

//组件二:
  import {useSearchParams} from 'react-router-dom'
  	//获取索引0
  const [search] = useSearchParams()
  console.log(Object.fromEntries(search));
  ~~~





## 六、类组件路由跳转 writeRouter 的实现

- 通过，高阶组件进行扩展
- router5 默认会有这个函数，在exports对象里面

​~~~typescript
import React, { memo } from 'react'
import { useNavigate, useParams, useLocation, useSearchParams} from 'react-router-dom'

const wirteRouter = function (Cpn) {

  return memo((props) => {

  const navigate = useNavigate()
  const params = useParams()
  const localtion = useLocation()
  const query = useSearchParams()

    return (
      <Cpn {...props} route={{navigate, params, localtion, query: query[0]}}/>
    )
  })
}

export default wirteRouter
  ~~~





# 第三节、路由配置文件

> 所有的路由定义都是直接使用Route组件，并且添加属性来完成的，这样的方式会让路由变得非常混乱。
>
> 可以放到配置文件集中管理。

- **router5之前**，Router并且**没有提供相关的API**，我们需要借助于`react-router-config`完成；
- 在`Router6.x`中，为我们提供了`useRoutes` API可以完成相关的配置；
- 和vue-router的区别就是，component 换成了 element



## 一、配置 routes 文件

~~~js
import {lazy} from 'react'
import { Navigate } from "react-router-dom";

const Profile = lazy(() => import(/* webpackChunkName: "profile" */'../pages/Profile') )
const Home = lazy(() => import(/* webpackChunkName: "home" */'../pages/Home'))
const Message = lazy(() => import('../pages/Message'))
const NotFound = lazy( () => import('../pages/NotFound'))
const MoreProduct = lazy( () => import('../pages/subPages/MoreProduct'))

export const routes = [
  {
    path: "/",
    element: <Navigate to="/home"/>
  },
  {
    path: "/home",
    element: <Home/>,
    children: [
      {
        path: "home/more",
        element: <MoreProduct/>
      }
    ]
  },
  {
    path: "/message",
    element: <Message/>
  },
  {
    path: "/profile/:id",
    element: <Profile/>
  },
  {
    path: "*",
    element: <NotFound/>
  },
]
~~~



### useRoutes

- **前提一**：`BrowserRouter` 组件是否包裹了  `App` 根组件
- **前提二**：`Suspense`  由于是懒加载，需要下载组件文件之后才进行渲染，所以要使用 `Suspense` 组件，在下载 `js` 期间显示一个同步等待的组件。
- **注意**：只能在函数组件中使用

~~~typescript
<div className="box">
	{useRoutes(routes)}
</div>
~~~



## 二、懒加载

- 懒加载， Route 也能懒加载
- 在 `react` 包中 提供了一个 `lazy`  函数
- 同样也能应用在组件路由上

~~~js
import {lazy} from 'react'
const About = lazy(() => import(/* webpackChunkName: "about" */'../pages/About'))
~~~



## 三、Suspense

> 撒死笨死，用于异步组件渲染完成前等待过度期间需要展示等待页面

- **注意**：目前只支持路由懒加载

- `fallback` 元素属性

  - 值类型：`React` 元素

    > 该元素会在路由**懒加载切换页面**的时候展示

- 也是路由配置懒加载的一个**必要**组件

  > ##### 包裹异步路由组件

  ~~~typescript
  <Suspense fallback={<h3>zhangasn</h3>}>
      <div className="container">
          <Link to="/home">home</Link>
          <div className="box">
              {useRoutes(routes)}
          </div>
      </div>
  </Suspense>
  ~~~





## 四、router5 配置文件

> 安装react-router-config：npm i react-router-config



### 路由配置文件

~~~js
const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About,
    routes: [
      {
        path: "/about",
        exact: true,
        component: AboutProduct
      },
      {
        path: "/about/message",
        component: AboutMessage
      },
    ]
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/detail/:id",
    component: Detail
  },
  {
    path: "/detail2",
    component: Detail2
  },
  {
    component: NoMatch
  }
];

export default routes;
~~~



### renderRoutes

> router5 的api，同useRoutes()做用相同

~~~typescript
<div class="container">
	{renderRoutes(routes)}
</div>
~~~























