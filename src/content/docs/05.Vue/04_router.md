---
title: '第一节、前端路由的发展历程'
---

# 第一节、前端路由的发展历程

> 路由其实是网络工程中的一个术语：

- 在架构一个网络时，非常重要的两个设备就是路由器和交换机。

- **路由器主要维护的是一个映射表**；

  > ip 和 key 之间的映射

- 映射表会决定数据的流向；

- 路由的概念在软件工程中出现，**最早是在后端路由中实现的**，原因是web的发展主要经历了这样一些阶段
  - 后端路由阶段；
  - 前后端分离阶段；
  - 单页面富应用（SPA）



## 后端路由

> 早期的网站开发整个HTML页面是由服务器来渲染的.

- 通过浏览器发送网络请求url

- 后台接收到网络请求调用对应的Api，根据指定的 path 或者 query 来决定返回怎样的 html

- 后台通过一些模板引擎，jsp 或者 thyleaf 生成可以在浏览器显示的文件或者代码。

- **总结：当发送不同的url，会请求不同的路径内容**

  > 因此在后端渲染中的路由映射关系可以理解为 path 和 html



- #### 优势

  >  后台会根据模板引擎**渲染好的页面, 不需要单独加载任何的js和css**, 可以直接交给浏览器展示, 这样也**有利于SEO的优化**



- #### 缺点

  1. 整个页面的模块由后端人员来编写和维护的

  2. 前端开发人员如果要开发页面, 需要通过PHP和Java等语言来编写页面代码

     > 学习成本过高

  3. **HTML代码**和**数据**以及对应的**逻辑会混在一起**, 编写和维护都是非常糟糕的事情



## 前后端分离阶段

> 后台只负责提供数据 Api，前端通过html、css、js 编写保存在静态服务器上，使用ajax 获取数据

- 客户端的**每一次请求**，都会从静态资源服务器请求文件；



- #### 优势

  > 最大的有点就是职责清晰，分工明确，后台专注数据处理，前台专注交互和可视化。

  - 当移动端(iOS/Android)出现后，后端不需要进行任何处理，依然使用之前的一套API即可



- #### 单页面富应用spa

  > SPA最主要的特点就是所有的样式都是在一个页面当中进行显示。各种交互都交由js处理

  - 还有一个特点就是，在前**后端分离的基础上加了一层前端路由**



## 前端路由

> 前端路由的核心是就是，**改变URL，但是页面不进行整体的刷新**；

- 会通过 history 和 hash 锚点的方式修改url ，这样的话页面就不会触发 reload

- **映射关系**：组件 和 路径

- **总结：**通过 history 和 hash 的方式修改url ，在不导致页面刷新的情况下，修改url，通过不同的路径来显示不同的组件。

  > 前端路由: 由前端来维护映射关系,在不同的URL显示不同的组件



### URL的hash

> URL的hash也就是锚点(#), 本质上是改变`window.location`的href属性；

- 通过直接赋值 `location.hash` 来改变 `href` , 但是页面不发生刷新

- **优势**：hash的优势就是**兼容性更好**，在**老版IE中都可以运行**，改变`url`**不会**向服务器发送请求，无需服务端支持

- `hash`模式只有#后面的内容被修改才会添加新的记录栈

- 但是缺陷是有一个#，显得不像一个真实的路径。

  > 这种缺陷可以忽略



### HTML5的History

> history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面

- history模式的url发生变化时不会立即向服务器发起请求，刷新会立即请求。如果服务端没有匹配当前的url，就会出现404页面。

- 有六种模式，可以在修改url 的情况下不刷新页面

  > 之前都学过，在history 对象当的方法

  - replaceState
  - pushState
  - popState（前面BOM没提到这个方法）: 据说是路径的回退，没测过router也没有对应的方法
  - forward
  - back
  - go



# 第二节、vue-router介绍

> Vue Router 是 Vue.js 的**官方路由**.

- vue-router是基于路由和组件的
  - 路由用于**设定访问路径**, 将**路径和组件映射起来**
  - vue-router的单页面应用中, 页面**组件的切换就是由、url路径的改变**



- 目前前端主流的三大框架都有自己的路由实现
  - Angular 的 ngRouter
  - React 的 ReactRouter
  - Vue 的 vue-router



- 安装

  ~~~shell
  npm install vue-router
  ~~~





# 第三节、vue-router的基本使用



## 一、使用步骤

1. 创建路由对象

   - 导入 的对应的 hooks 函数，通过 `createRouter` 创建路由对象
   - **参数：对象类型**

2. 配置映射**模式**

   - 有 hash 和 history 模式，也是用过对应的 hooks 创建的
   - hash：`createWebHashHistory`
   - history：`createWebHistory`

3. 配置映射**关系**

   - **注意**：是通过，**`roters` 属性进行配置，注意key值不是routers**
   - **参数：Array数组类型**

   ~~~js
   import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";

   export  const router = createRouter({
     history: createWebHistory(),
     routes: [
       {
         path: "/",
         component: () => import("../views/HomeView.vue")
       }
     ]
   })
   ~~~



4. 在 `main.js` 主文件当中**进行注册**使用

   > 注意：在 `vue2` 之前，传入的**要是指定名称 `router` 的路由对象**，vue3中**不用了**，只要你是该类型的对象就可以，但是还是要规范一点

   ~~~js
   import {router} from './router'
   const app = createApp(App)
   //将创建的 router 进行使用注册
   app.use(router)
   app.mount('#app')
   ~~~



5. 通过 `<router-link>` 和 `<router-view>` 组件进行展示





## 二、`<router-link>` 和 `<router-view>` 组件的使用



### 1、router-view组件

> **概述**：`router-view` 组件，会**根据 `routes` 中定义的映射关系**，**显示 `path` 对应的组件。**

- name属性：

  > 用于显示对应 routes 中**name 属性的组件**

#### 知识点

1. router-view 显示那个组件是有 routes 中的 path 决定的而不是由在哪调用决定的

2. **path规则(重要)**：

   - 项目启动通常最先显示的是，根据 `index.html` **绑定的App根组件**。

     > 注意：这时还没有path ，url为 `http://loaclhost: port`



   - (**重点**)那么在**根组件下的所有后代组件中根据level级别查找最先** 出现 `router-view` 标签，所要显示的组件，由 `routes` 中的**一级path**来**决定**要显示那些组件

     > 根组件出现了 `router-view` ，哪么就是 `path` 的一级



   - 之后其他组件，需要 router-view 标签显示组件，哪便由二级 path ，来决定要显示的组件



   - **总结(重点)**：  **树结构组件自上置下，包含 router-view 标签的组件开始**，一直到最后一个 包含router-view的组件，形成的树结构，与**path路径是一一对应的**

     > 就是 path 的结构和 router-view 是对应的，path有两层的话，对应的是第一次出现的router-view的组件下的子组件出现的 reouter-view





### 2、router-link组件

#### 标签属性

- to属性：

  - 属性值：是一个**字符串**，或者是一个**对象**

  - **字符串类型**

    > 根据指定 `path` 显示对应的组件。

    ~~~html
    <router-link :to="'/home'">Home</router-link>
    ~~~



  - **对象类型**

    > 要是表述目标位置的对象

    - **注意**：传入对象类型的话要用 v-bind

    - **优势**：可以添加**命名path路由** 和 **查询字符串**

      > 就是传入一个 path 对象，并附带着 params 属性或者query、hash 属性。

    ~~~html
    //描述目标组件的对象
    <router-link :to="{ path: '/home' }">Home</router-link>
    //添加命名路径
     <router-link :to="{path:`/home/profile`,name: 'profile',params: {userId: 123}}">
         显示profile
    </router-link>
    ~~~





- replace属性：

  - boolean 类型

  > 设置 replace 属性的话，当点击时，会调用 router.replace()，而不是 router.push()
  >
  > - 就是直接替换掉当前路径，之前的历史也会被清空
  > - **导航后不会留下历史记录。**

  ~~~html
  <router-link to="/abc" replace></router-link>
  ~~~







#### css 属性

> router-link 标签点击**选中之后，会自动添加class**

- active-class属性：

  > 在 `router-link` 被**点击选中**的时候，**整个url路径所经过的 router-link 标签**，都会**存在一个 `router-link-active` 的class。**

  - **`active-class`** 标签属性就是**用来设置这个 class 的名字的**
  - `router-link-active`



- `exact-active-class`属性：

  > 这个只有点击选中的 router-link 标签会有该class，`router-link-exact-active`，或者说最后一个子路径做对应的 router-link才会有这个class。

  - **`exact-active-class`** 标签属性就是用来设置这个class 的名字的。
  - `exact-active-class`



- 注意：如果不点击选中的话，**在url上直接访问该路径也会给对应的 router-link 添加class**





# 第四节、vue-router 配置



## 一、redirect 重定向

> 当访问指定路径的时候，会直接跳转到重定向的`path`

- 应用起来最先显示的就是根组件。因此**根组件的path 为 /**

- 当在首页当中使用了 `router-view` 的话，并且想在让应用首次**显示的时候在根组件当中展示指定 path 的组件**，这个时候可以使用重定向 `redirect`



- **配置 `routes` 的思路**

  > path配置的是根路径: /
  > redirect是重定向, 也就是我们将根**路径重定向到/home的路径下**, 这样就可以得到我们想要的结果了

  - **例**：当**访问根 “/”** 的时候，会**直接跳转到 /home 路径**

  ~~~js
      {
        path: "/",
        redirect: "/home"
      },
  ~~~





## 二、路由懒加载

> **同异步组件一样**，打包的时候会将在 routers 中使用**懒加载方式配置的组件进行分包处理**。

- 就是将懒加载组件中js代码，分别打包成和组件对应的独立js文件。

- **优势：**这样不会在首次加载应用的时候一次加载全部js文件，当页面跳转的时候在进行下载展示组件所对应的js文件，进行执行

  > 会**提高首屏加载的速度。**

- **懒加载方式**：

  > routes 中component属性，可以接收一个 **返回值为promise的函数**，通过种方式配置routes ，**webpack就会将对应的组件进行分包**。

  ~~~js
      {
        path: "/",
        component: () => import(/* webpackChunkName: "group-user" */"../views/HomeView.vue")
      }
  ~~~





## 三、路由的嵌套

- `router-view` 所在组件的后代组件当中，使用`router-view`，**哪么 `path` 也会要相对应的层次路径**

- 在 `routes` 种使用 **`children`属性进行配置**

  - 属性值类型：Array
  - 属性值：path 对象

  ~~~js
   {
        path: "/home",
        component: () => import("../views/home.vue"),
        children: [
          {
            path: "profile",
            component: () => import("../views/home-profile.vue")
          }
        ]
      }
  ~~~



- **注意：**

  - 一级path 要添加name 属性，name是该path的唯一id，不可以重复



  - （**重点**）在配置 **children 属性对象的时候**，path 前面**不要添加 "/"**

    > 如果添加了 "/" 会被认为，是一个连续的路径，会直接去找 /home/profile，而不是先找第一层路径的组件，在找第二层，**会警告！**
    >
    > **简单说：就是会将 /home/profile 二级路径，当作一级路径来访问**，在 routes**顶层** Array 对象中**查找`/home/profile`  一级路径。**

    - **提示找不到匹配的路径。**

    - 例：

      ~~~js
          {
            path: "/home",
            component: () => import("../views/home.vue"),
            children: [
              {
               //这里添加 "/"
                path: "/profile",
                component: () => import("../views/home-profile.vue")
              }
            ]
          },
          {
            //会直接找到这个路径的组件，而不会找到home下的profile组件
            path: "/home/profile",
            component: () => import("../views/more.vue"),
          },
      ~~~

  - （**重点**）routes 对象中**顶层的对象设置了  "/home/profile"** 那么也会**在顶层的 router-view 中显示** 该路径对应的组件



## 四、路由的其他属性

### name属性

> name是该**path的唯一id**，不可以重复

- 使用一：在 **`router-view` 中可以显示 `routes`  中指定 `name` 的组件**这个时候，也可以解决重定向的问题。

- 使用二：可以通过 `$route.name` 获取这个**路径的唯一标识**

- 使用三：如果通过`to` 或者 `push` **传入 `path` 对象进行跳转的时候有定义 params 属性**，那么要**确保传入的path对象和routes中path对象要有对应的name**

  ~~~js
  //如果传入的 path 对象中有定义params 属性，那么要确保传入的path对象和routes中path对象要有对应的name
  router.push({path:`/home/profile`,name: 'profile',params: {userId: 123}})
  ~~~

- 使用四、在动态添加**子路由path**， 的时候需要**指定唯一的name**



### meta属性

> **在记录上附加自定义数据。**就是在**每个路径上自定义一些要使用的数据**



- 它可以在**路由地址**和**导航守卫上都被访问到**。



- **属性值**：对象类型

  ~~~js
   {
        name: "home",
        path: "/home",
        component: () => import("../views/home.vue"),
        meta: {
          author: "yanan.wang"
        },
   },
  ~~~





- js中获取：

  ~~~js
  import {useRoute} from "vue-router";
  const route = useRoute()
  const author = route.meta.author
  ~~~



- 导航守卫中获取

  > 只有在**动态路由的组件**在**进行复用的时候才会被触发**

  ~~~js
  onBeforeRouteUpdate((to, from) => {
    console.log("from:", from.meta)
    console.log("to:", to)
  })
  ~~~




## 五、vue-router的传值方式

### 一、path-query

- 在使用 `router-link` 和 `$router.push()` 进行跳转的时候，可以传入一个`path` 对象。

- `path` 属性：跳转到指定 `path` 的组件

- `params` 属性：携带参数，

  > 注意：如果需要使用params 携带数据的话，一定要**保证传入的 path 对象和 route 对象一定要有name属性**

  ~~~html
  <!--可以通过 $route.params 进行获取 -->
  <router-link
  :to="{path:`/home/profile`,name: 'profile',params: {userId: 123}}"
               >
      		显示profile
  </router-link>

  <script>
     //js写法
      $router.push({path:`/home/profile`,name: 'profile',params: {userId: 123}})
  </script>

  ~~~



- **query属性**：携带查询字符串，

  > `path` 和 `name` 有一个就可以带入，这个不必须指定 `name` 属性

  ~~~html
  <router-link
              :to="{path:`/list`, query: {name: 'zhangsan', age: '34'}}"
              >list
  </router-link>
  <script>
     //js写法
      $router.push({path:`/list`, query: {name: 'zhangsan', age: '34'})
  </script>
  ~~~



### 二、name-params



- **注意**：**`Params`  搭配 `name` 进行使用。否则无效**



- **使用路径参数和不使用路径参数的区别**：

  `params` 可以绑定多个属性，但是**不使用路径参数: 进行占位**的话，页面一**刷新**，没有占位的变量都会**清除**



- **优先级**：使用`params` 的时候**必须**要传入和路径参数 **对应** 的属性

  > `params` 的优先级高于 `path`，两者**同时占位**的话会**优先使用 `params`** 中的值进行**路径拼接**




~~~js
//params传参 使用name
$router.push({
  path: `/test/zhangsan` ,
  name: `test`,
  params: {
    id: `lisi`
  	}
  })

//params接收参数
this.id = this.$route.params.id;
this.name = this.$route.params.name ;
~~~



### 三、路径参数(重要)

> 通过动态的 `path` 字段，也叫**路径参数(官方）**，对应一个组件，当**来回切换子路径**的时候，都会进入到同一个组件当中

- (**重点**)可以将一个子路径设置一个可以改变动态的路径，并且可以**通过 `$route.params.属性` 进行获取。**

- ##### 获取路径参数

  ~~~js
  $route.params.属性名
  ~~~



#### 1、定义动态path

- 定义动态路由：路径的两种写法

  > 使用分号语法 ":变量" 来定义动态路径

~~~js
//路由

routes: [
//第一种写法
    {
      path: "/about",
      component: () => import("../views/about.vue"),
      children: [
        {
          //使用':'可以定义一个路径变量，来接收子路径，定义的use值便是子路径同时放入route.param对象当中
          path: ":id/:name",
          component: () => import("../views/more.vue")
        }
      ]
    },
//第二种写法，这个会在顶层的 router-view 中显示
/*  {
      path: "/about/:id/:name",
      component: () => import("../views/more.vue")
    }*/
  ]

~~~



#### 2、使用路径参数

> 在路由声明好**路径参数**的时候，有两种方式可以将值传入到路径参数当中

> `vue-router` 会自**动获取与 :id 对应的路径值**，赋值到路径参数当中并封装为一个对象

~~~js
//这里通过 $route.params.属性名 获取的就是 {id：sss}
$router.push({path: `/test/sss` })

//可以使用模板字符串绑定变量
$router.push({path: `/test/${id}` })

//多个的话可以绑定多个
$router.push({path: `/test/${id}/${variable}` })
~~~





#### 3、应用场景

> 可以将**账户名**，或者**用户id** 设置为**动态路由**，**判断当前用户是否权限，使用该功能**

- 或者对用户进行友好提示





#### 4、NotFound

> 哪些**没有匹配到的路由**，通常会匹配到固定的某个提示页面

- 可**编写一个动态路由用于匹配所有的页面；**

  ~~~js
     {
        //这里的pathMatch变量的名字是自定义的
        path: "/:pathMatch(.*)",
        component: () => import("../views/warn.vue")
      }
  ~~~



- 可以通过 `$route.params.变量名` **将错误路径显示到页面上**

  ~~~html
  <template>
  	<div>{{$route.params.pathMatch}}</div>
  </template>
  ~~~







- **匹配规则`(/*)` 的后面加***

  > 在`(/*)` 的后面加* 的作用就是，会将动态路径**通过"/" 拆分成一个数组**

  ~~~js
  {
      // abc/cba/nba
      // 第一个*代表匹配所有路径；第二个*代表解析路径为数组，获取到的参数就会为数组，按需添加；
      path: "/:pathMatch(.*)*",
      component: () => import("../Views/NotFound.vue")
  }
  ~~~
## 六、$router 和 $route 对象

> 在使用 setup语法的使用，`通过import {useRoute, useRouter} from "vue-router";` 来获取



### 1、$route

> 当前活跃的路由对象，**通常保存一些和当前path 或者 当前组件存入的数据。**



### 2、$router

#### 2.1、路由跳转 api

> 应用的路由对象，用于控制路由的跳转返回，就是应用中**管理整个映射关系的实例**

- `push(）`

  >  同于跳转路由

- `replace()`

  > **push的特点是压入一个新的页面**，那么在用户点击返回时，上一个页面还可以回退，但是如果我们希望**当前页面是一个替换**
  > **操作，那么可以使用replace**

- go()

  > go（-1）回退，正数前进

- back()

  > 历史回退

- forword()

  > 历史前进

- addRoute()

  > 动态添加路由



- **用于管理所有的路由**



#### 2.2、动态添加路由 api

> router 实例对象还可以动态的添加path对象，实现动态添加路由

##### 2.2.1、添加路由

- `router.addRoute()`

  > 注意是`addRoute` 不是 `addRouter`

  - 参数一(可选)：添加**子路由**需要指定父级 `route` 的`name`

    > 注意：相同 name 的路由会进行**覆盖**，确保name是**唯一的。**

  - 参数二：path对象

  - 返回值：函数类型，用于删除创建的路由



- **一级路由**：直接传入 route 即可。

~~~js
  router.addRoute({
    name: "newHome",
    path: "/newhome",
    component: () => import("./newHome.vue")
  })
}
~~~

- **子路由**：添加子路由需要**传入**指定 route 的**name属性；**

~~~js
function addChild() {
  router.addRoute("newHome",{
    name: "newHomeChild",
    path: "newhomechild",
    component: () => import("./newHomeChild.vue")
  })
}
~~~





##### 2.2.2、删除路由



1. 函数：通过 `addRoute()`方法，可以**覆盖**相同 `name` 的 `route`。

2. 覆盖：`addRoute()` 方法会返回一个函数，**调用该函数会删除创建的 `route`**

   ~~~js
    const  removePath = router.addRoute("newHome",{
       name: "sss",
       path: "newhomechild",
       component: () => import("./newHomeChild.vue")
     })
    //删除当前路由
    removePath()
   ~~~



3. api删除：使用 `router.removeRoute()` 方法进行删除指定 `name` 的路由

   - **参数**：字符串类型的name，**删除指定的name的路由**

     ~~~js
     import {useRouter} from "vue-router";
     const router = useRouter()
     function del() {
       router.removeRoute("sss")
     }
     ~~~







##### 2.2.3、hasRoute()

> 检查路由是否存在，返回 `boolean` 值

- **参数： String|Symbol，路由的名称**

~~~js
  console.log(router.hasRoute("sss"));
~~~



##### 2.2.4、getRouters()

> **返回**一个包含**所有路由 “对象” 的记录 **是 **数组** 类型

~~~js
  console.log(router.getRoutes());
~~~





# 第六节、导航守卫

> 路由守卫就是，路由在触发，跳转、以及跳转组件加载复用，路由渲染前后期间，来监听和控制路由的不同时机下的状态。



## 一、全局前置守卫(重点)

> vue-router 提供的导航守卫**主要作用监听路由的跳转。**

- **全局**的前置守卫 `beforeEach` 是在**导航触发时会被回调的。**

- **参数：路由对象(重点)**

  - `to`：即将进入的路由Route对象；

  - `from`：即将离开的路由Route对象；

  - `next(不推荐使用)`：Vue2中的方法，**通过next函数来决定如何进行跳转的**

    > 不推荐的原因是，在开发中**容易调用很多次**

- **返回值(重点)**

  - 默认**没有返回值**的时候：也就是`undefined`

    > 为`undefined` 的时候会**进行默认导航(就是会继续执行跳转)**

  - 当返回一个**字符串路径**的时候，**会跳转到指定的路径**

  - 返回 false 的时候会**取消导航(就是回退到当前导航)**

- **例：**

  ~~~js
  //函数的默认返回值是undefined 会继续打印之后会继续进行跳转
  router.beforeEach((to, from) => {
    console.log("正在跳转");
  })
  //跳转到 login 路径对应的组件
  router.beforeEach((to, from) => {
    return "/login"
  })
  ~~~



- ~~~js
  router.beforeEach((to, from) => {
    console.log("正在跳转");
  })
  ~~~







## 二、其他导航或者钩子

### 组件内守卫

#### beforeRouteEnter(重点)

> **在渲染该组件的对应路由前调用**，笼统记：就是跳转前被调用

- 不能获取组件实例 `this` ！

  > 因为当前路由还没有渲染完

- （**重要**）在路由跳转完之后会调用 next参数中的回调函数，**创建好的组件实例会作为回调函数的参数传入。**

  - **注意：此时 dom也已经被渲染完了**，这是整个路由跳转的最后一步

  ~~~js
    beforeRouteEnter(to, from, next) {
        next(instance) {
            //这个参数是组件的实例，会在跳转完之后进行调用
        }
    },
  ~~~





#### beforeRouteUpdate(动态路由会用到)

> 当相同的组件重复跳转的时候才会触发，就是在**使用动态路由重复切换** 到一个路由的时候进行调用

- **在组件当中进行配置**



#### beforeRouteLeave

> **离开当前组件**的时候被调用。

- 整个是**最先触发的守卫**



### 路由独享守卫beforeEnter

- **在路由配置里调用 `beforeEnter`**

~~~js
    {
      path: "/:id(.*)",
      component: () => import("../views/warn.vue"),
      beforeEnter: (to, from)=> {
        console.log("这里是 beforeEnter");
      }
    }
~~~



### 全局解析守卫 beforeResolve (重点)

> **在跳转前**，同时在**所有组件内守卫和异步路由组件(就是准备要跳转的懒加载组件)**被解析之后。



### 全局后置钩子afterEach

> 这些钩子不会接受 next 函数也不会改变导航本身：



## 三、完整的导航解析流程

1. 导航被触发。

2. 在失活的组件里调用 `beforeRouteLeave` 守卫。

   > 就是**在一个组件当中通过导航离开**，会先触发**组件内**导航  `beforeRouteLeave` 守卫。

3. 调用全局的 `beforeEach` 守卫。

   > 每次导航都会触发

4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。

5. 在路由配置里调用 `beforeEnter`。

6. 解析异步路由组件。

7. 在被激活的组件里调用 `beforeRouteEnter`。

8. 调用全局的 `beforeResolve` 守卫(2.5+)。

9. 导航被确认。

10. 调用全局的 `afterEach` 钩子。

11. 触发 DOM 更新。(重点)

12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。







