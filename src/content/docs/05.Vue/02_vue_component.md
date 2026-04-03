---
title: '第一节、组件化开发模式'
---

# 第一节、组件化开发模式

> 现在可以说整个的**大前端开发都是组件化的天下，**
> 无论从**三大框架（Vue、React、Angular），还是跨平台方案的Flutter**，甚至是**移动端**都在**转向组件化开发**，包括**小程序**的开发也是采用组件化开发的思想。



## 1、组件化的概念

> 组件化提供了一种抽象概念，让我们可以开发出**一个个独立可复用的小组件**来构造应用程序；

- 任何的应用都会被抽象成一颗组件树；

- 将一个完整的页面**分成很多个组件**，每个组件都用于实现页面的一个**功能块**，而每一个组件又可以进行细分，且组件本身又可以在多个地方进行复用；

- 总结：

  > 将一整块的代码逻辑抽象为，多个独立且可复用的小的组件来构建一个应用，组件也可以继续划分子组件，负责各自的功能点。
  >
  > 这样实现的应用可被抽象为组件树

  

### 优势

1. 组件的复用性，一个组件可以复用于多个页面

2. 低耦合，每个组件都是独立实现的有自己的作用域，不会和其他代码进行冲突。

3. 职责清晰，标记鲜明，容易维护

   > 每个组件实现指定的功能，将复杂的代码逻辑进行细分，单独实现。

4. 提高开发效率，逻辑结构清晰。

- 总结：高复用，低耦合，结构清晰，职责明确，提高开发效率便于维护



### app 注册 options选项的特点

##### 全局注册 都是单数形式的

##### 局部注册 是双数加 `'s'` 的  



## 2、vue中注册组件的方式

> 组件本身也可以有自己的代码逻辑，**options 对象 和 模板语法**



### 组件的命名方式

1. 使用**大驼峰标识符**的方式命名

   > 在进行组件使用的时候，html是不区分大小写的，**可以使用链接符的方式进行使用**

   

2. 或者直接使用**短横线连接符**的方式进行命名



### 全局组件



- 特点：
  1. 在任何其他的组件中都可以使用的组件
- 注意：使用组件实例创建全局组件的时候属性使用的是 `component` 属性没有s，`options` 注册的时候是 `components`。
- 缺点：
  1. 在进行打包的时候无论全局组件会不会用到都会进行注册，这样打包工具在进行打包也会将其打包。会增加js包的大小，影响访问速度
     - 因此在开发中经常使用的是局部组件
- 使用：使用vue根实例中的 `component` 方法
  - 参数一：组件名字符串类型
  - 参数二：组件对象

~~~js
  const pro = {
    template: `#tem`
  }
  const app = Vue.createApp({
    data() {
      return {
      }
    }
  })
  //创建全局组件
  app.component("ProductItem", pro)
  app.mount("#app")
~~~



### 局部组件

- 特点：
  1. 在那个组件注册的，就只能在那个组件使用。
  
     > 别的组件需要的时候，使用模块化在进行注册即可
  
     优点：根据需要创建对应的子组件，可读性高，更加的灵活。
  
- 使用：components 也是一个 options 选项
  - components 是一个对象类型，key：作为组件名，value：是组件对象
  - 注意：使用短横线分割符的方式定义key记得要使用字符串类型。JavaScript中变量 和 key 的定义不允许使用短横线分隔符



~~~js
  const ProductItem = {
    template: `#temp`,
    data() {
      return {
        message: "张三"
      };
    }
  }
  const app = Vue.createApp({
    data() {
      return {
        message: ""
      }
    },
  //在 components options 选项中声明子组件对象
    components: {
      ProductItem
    }
  }).mount("#app")
~~~





## 3、vue单文件开发模式

> single-file components (单文件组件) 会将，并且可以使用webpack或者vite或者rollup等构建工具来对其进行解析处理。

- 使用模块化将模板、脚本逻辑、样式进行抽取为一个后缀名为 `.vue` 组件文件。

  > 意味着每个组件都会有自己的模板、脚本逻辑、样式等；

  - 会解决命名冲突，作用域的问题
  - 编写代码完成之后，通过工具对代码进行构建



### 单文件的特点



1. **代码的高亮；**

2. ES6、CommonJS的**模块化**；

3. 结构清晰

4. **组件作用域的CSS**；

   > 通常会在 .vue 单文件当中添加 scoped 属性，声明当前 css 作用域，这样**可以避免父子组件之间的样式冲突**

   ~~~html
   <!--声明css作用域-->
   <style scoped>
   </style>
   ~~~

   

5. 可以更加方便的使用**预处理器**来构建更加丰富的组件，比如`TypeScript`、`Babel`、`Less`、`Sass`等；



#### 使用 SFC 的方式

方式一：使用Vue CLI来创建项目，项目会默认帮助我们配置好所有的配置选项，可以在其中直接使用.vue文件；
方式二：自己使用webpack或rollup或vite这类打包工具，对其进行打包处理；



# 第二节、Vue CLI脚手架

> 脚手架其实是建筑工程中的一个概念，在我们软件工程中也会将一些帮助我们搭建项目的工具称之为脚手架；

- 用来搭建基本的项目结构

  > `Vue CLI`已经内置了`webpack`相关的配置.

- `CLI`是`Command-Line Interface`, 翻译为命令行界面；

- 创建项目 `vue create my-vue-app`



### 1、vue cli 修改内部使用的包管理工具

- windows 可以使用gitbash 

  > 时候 inset 进行i需改 packageManager
  
- 因为有的时候使用 pnpm 会死机

~~~shell
vi ~/.vuerc
##########################
{
  "useTaobaoRegistry": false,
  "latestVersion": "5.0.8",
  "lastChecked": 1657635650739,
  "packageManager": "pnpm"
}
~~~



### 2、vue create 项目的过程



[![j2RQ0K.png](https://s1.ax1x.com/2022/07/12/j2RQ0K.png)](https://imgtu.com/i/j2RQ0K)



### 3、Vue-cli中默认使用vue的版本

> 在vue-cli创建的vue项目当中，默认使用的**没有编译 `template` 语法的代码的runtime版本**

- 因为这vue项目中会由 webpack中的 **vue-loader 来处理 .vue 文件**，所以不需要 comiple 得代码。

  > 这样的话打包的时候会**减少部署包的大小。提高性能**

  - 因此在 js 当中使用字符串编写template的时候是不会进行编译的，包括绑定的 html 元素标签

    > 原因就是是在js中绑定的，在js绑定的话，就不会由vue-loader处理而是交由，vue进行处理

  

- 如果需要完整版的vue代码得时候需要**引用 /dist/bunlder/vue.esm.js**

  - 来引入 `runtime+comiple` 的完整版本
  



### 4、vue.config.js map文件

> vue项目中的配置文件，若是想配置`webpack`的话，在 `configureWebpack` 中配置

~~~js
  configureWebpack: {
    productionSourceMap: false, 
        // 生产环境是否生成 sourceMap 文件，一般情况不建议打开,怕泄露源码
        //map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
~~~



### 5、Vite 创建vue项目

1. npm init vue@latest

   > 表示下载最新的vue项目

   - 执行之后会提示是否安装一个 创建vue项目的工具

     > 选中 yes 之后，正常选中需要的组件

   - 在 vite 创建好的项目当中是没有下载依赖的需要手动执行 npm install



- **注意事项**：vite 创建的项目，**在懒加载导入组件的时候不能省略 后缀名**







### 6、目录结构

- public

  > 项目中的公共资源，index.html 模板，favicon.ico

- src

  > 源代码目录

- browserslistrc

  > 设置适配目标浏览器

  - `> %1`：市场份额大于百分之1的浏览器
  - `last 2 versions`：匹配浏览器后面的两个版本
  - `not dead`：不会匹配不维护的浏览器
  - not ie 11：不提供ie的支持

- gitignore

- **jsonconfig.js**

  > 最开始的时候是在 TypeScript 当中使用的，后来又提供了一个子集，也可以在js当中进行使用。

  - vscode 需要读取的文件来提供更好的语法提示，webstorom 语法提示

    > 注意：**这里是json文件。**

  ~~~js
  {
    "compilerOptions": {
      //最终打包的 js 版本
      "target": "es5",
      //esnext 表示的是EcmaScript最新的版本，表示编写代码的时候采用最新的ES module 语法
      "module": "esnext",
      //配置 paths 属性的基本路径
      "baseUrl": "./",
      //编写代码的时候，按照node 的模块查找规则进行提示
      "moduleResolution": "node",
      //通配路径：在进行 import variable from "@/vuefile.vue" 的时候 '@/' 默认匹配的是 baseurl 属性的路径
      "paths": {
        "@/*": [
          "src/*"
        ]
      },
      //在整个项目开发的过程中，所需要的语法库
      "lib": [
        //最新的es语法
        "esnext",
        //编写一些dom操作的时候提供一些友好提示
        "dom",
        //提供一些可迭代属性方法的提示：节点元素的集合，children
        "dom.iterable",
        //在不同浏览器进行开发会提示，当前浏览器中一些特殊的Api进行提示
        "scripthost"
      ]
    }
  }
  
  ~~~

  

- babel.config.js

- vue.config.js

  - 对于项目webpack中一些自定义的配置，所配置项会替换原有的默认配置



# 第三节、父子组件之间的通信



## 一、Props 父传子

> 用于将父组件的数据通过 Attribute 的方式，传递给子组件



### 1、props 的使用

- 在组件上注册一些自定义的 `attribute`；

- 父组件给这些 `attribute` 赋值，子组件通过 `attribute` 的名称获取到对应的值；

  > 在父组件当中使用 **`props` options选项进行接收数据**
  
  
  
- **(重要)**：在`data` 和 `prop`存在相同变量的时候会**按照代码执行的顺序进行覆盖**

  > 后面的变量会替换前面的变量

  - **注意**：虽然会进行覆盖，但是**会报警告**，所以在**规范中不要**造成 `props` 和 `data` 的**变量覆盖**

  

- **(重要)Prop 的大小写命名(camelCase vs kebab-case)**

  > **HTML 中的 attribute 名是大小写不敏感的**，所以浏览器会把所有大写字符解释为小写字符；
  > 这**意味着**当你使用 DOM 中的模板时，**camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名；**



### 2、单向数据流

> 所有的 `prop` 都使得其父子 `prop` 之间形成了一个**单向下行绑定**

- **父级 prop 的更新**会向下**流动到子组件中**，但是**反过来则不行**。这样会防止从子组件意外变更父级组件的状态，从而**导致你的应用的数据流向难以理解。**



- 这里会后流动到后代组件当中，**如果需要的话使用 `provide` 和 `inject `** options选项



- 另外，每次**父级组件发生变更时**，**子组件**中**所有的 prop 都将会刷新为最新的值**。这意味着你**不**应该在一个子组件内部改变 `prop`。

  > **解决：**如果需要修改 `props` 中的时候**要使用 `$emit()` 发出事件在父组件当中进行修改，使用这样的方式更新 props 数据**



- **总结：**重点想要表达的是 `prop` 传值是单项数据流，**不可以**让子组件**修改**父组件的**流动到子组件 `prop` 当中的数据**



### 3、props 数组类型

- 这里可以用 String 类型的字符串来接收对应的标签属性。

  > 个人理解：<u>js 中的属性key的值，只能使用 String 和 Symbol 类型</u>，而Symbol 不能明确的给出 key 的值

- 前面使用的 v-bind 用法可以批量绑定

~~~html
<!--这里是父组件-->
<template>
    <!--在这里进行绑定data中的数据-->
  <about :arr="arr"></about>
</template>

<!--这里是子组件-->
<script>
<!--使用 props options 选项进行接收自定义属性-->
export default {
  name: "about",
  props:["arr"]
}
</script>

~~~



### 4、props 对象类型

> props options 也可以使用对象来接收对应的标签属性



#### 优势：4个

1. 可以**指定**接收数据的类型

   > **注意***：指定接收数据类型的时候，**不**是字符串，而**是变量的形式编写的**，否则会未知错误

   

   - 可配置的数据类型： `String`，`Number`，`Boolean`，`Array`，`Object`，`Date`，`Function`，`Symbol`
   - **注意**：这里如果设置除了字符串以外的其他类型的话 可以**使用v-bind，这样定义属性的值就是js代码。就可以表示其他类型**

   ~~~js
     props: {
       profession: {
         //这里的 String 是不添加引号的
         type: String,
         default: 'xx'
       }
     }
   ~~~

   

2. 可以设置**默认值**

   > **注意：** 当默认值为一个**对象类型**的时候要**使用函数进行定义默认值。**

   - 在一个组件当中只会调用一次默认值函数。

   - 函数的方式防止，其他的组件修改默认值，因为对象类型传递的是地址值。有被修改的风险

     > 使用函数的话，每创建一个组件都会调用默认值的函数这样的话每次那到的对象类型的默认值都是最新的。

   

3. 指定当前参数是**否是必填项**

   - `required：true`

   ~~~js
    props: {
       profession: {
         /*限制指定类型 这里的Sting 没有引号*/
         type: String,
         required：true
       },
     }
   ~~~

   - 这样没有传指定属性值的时候会弹出警告

   ~~~js
   //警告信息
   Missing required prop: "message" 
     at <PropObjectTest> 
     at <App>
   ~~~

   

4. ##### 自定义验证函数

   > 会验证：接收属性的值。

   - **validator**：将 prop 值作为唯一参数传入的自定义验证函数。在开发模式下，如果该函数返回一个[假值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) (即验证失败)，一个控制台警告将会被抛出。
   
   ~~~js
       props: {
         title: {
           type: String,
           required: true,
           default: "zhangsan",
           //测试不会打印res
           validator: res => console.log("这里是校验",res) return ture
         }
       },
   ~~~
   
   
   
   



#### 指定接收数据的类型



~~~js
//方式一
 props: {
    /*限制指定类型 这里的Sting 没有引号*/
    profession: String
  }

//方式二：有默认值的时候可以使用这个方式
 props: {
    profession: {
      /*限制指定类型 这里的Sting 没有引号*/
      type: String,
    },
  }
~~~



#### 设置默认值

~~~js
//方式一：设置基本数据类型的默认值
  props: {
    profession: {
      /*限制指定类型*/
      type: String,
      /*设置默认值*/
       default: "德云社相声演员",
      /*进行校验，实参就是传入的值*/
    },
        
        
//方式二：设置Object 类型的默认值
  props: {

   work: {
      type: Object,
      //这里要是个函数
      default: () => ["zhangsan", "lisi", "wangwu"]
      },
    },

  }
~~~



#### 自定义验证函数

- 验证函数**会在属性 ”接收值后、赋值前“ 触发**，参数就是当前属性接收的值

  > 注意：要有返回值否则会报错。

  ~~~js
      profession: {
        /*限制指定类型*/
        type: String,
        /*设置默认值*/
        default: "德云社相声演员",
        /*进行校验，实参就是传入的值*/
        validator: function (data) {
          return data === "张三"
        }
      },
  ~~~

  

### 5、$attrs 非Prop的Attribute

> 当父组件**传递给子组件**一个组件**某个属性**，但是**该属性**并**没有定义对应的props或者emits时**，就**称之为 非Prop的Attribute**；

- **这个也算是父组件的值传递给子组件**



#### 5.1. Attribute继承单个根节点

> 当组件有**单个根节点**时，**非 **`Prop` 的 `Attribute` 将**自动添加**到 **当前组件 **根节点的 `Attribute` 中：

- 单个根节点就是，`template` 的**直接子元素**只有一个div 这个div就是这个组件的根，当有**两个直接子元素的时候就是两个根**



- **使用**：可以使用 `$attrs.` 自定义的属性名来进行获取自定义属性值

  - **注意**：这里父组件定义的**class属性 可以直接在子组件**当中使用 **$attr 进行获取**  。

    > **但是 style 不行**，style比较特殊，它保存的样式是对象类型的。不能进行接收
    
    ~~~html
    <!--父组件-->
    <noprops-attr addr="天津市" profession="小生" class="{color: #333}" style="{color: #999}">
      </noprops-attr>
    
    <!--子组件 ：这里在没有使用props options接收的情况下可以使用$attrs对象直接获取值-->
    <template>
      <div>
         <span :class="$attrs.class" :style="$attrs.style">{{$attrs.addr}}-{{$attrs.profession}}</span>
      </div>
    </template>
    ~~~
    
    
    
  - 一定要 `style` 的话，可以尝试 `v-bind`
  
    ~~~html
    <label>
        <input type="text" v-bind="$attrs" />
    </label>
    ~~~
  
    
  
  - `js` 当中也可以直接获取
  
    ~~~js
    console.log(this.$attrs.info);
    ~~~
  
    
  



#### 5.2. Attribute 继承多个根节点

- 多个根需要 **手动 **决定要将自定义属性**那个根元素上面**否则会报错

  > 就是说当有两个根元素的时候，**一定要**使用 `$attrs` 将自定义属性**明确显示的绑定要一个节点上**，无论是 v-bind=`"$attrs"` 还是 `:class="attrs.class"` ,都可以明确的绑定一个也可以，就是不能不绑定
  
  ~~~html
  <template>
  <!--多个根需要手动决定要将自定义属性那个根元素上面否则会报错-->
    <div v-bind="$attrs">
      <span :class="$attrs.class" :style="$attrs.style">{{$attrs.addr}}-{{$attrs.profession}}</span>
    </div>
    <div class="box">
      这里是第二个根
    </div>
  </template>
  ~~~
  
  



#### 5.3.禁用Attribute继承和多根节点

- 如果不希望，组件的自定义的 `Attribute` 添加到根节点上在组件中设置 `inheritAttrs: false：`

  > 注意：设置了 `inheritAttrs: false` 之后**也可以正常绑定**，就是**多**根节点**没有明确绑定**自定义属性的时候**不会报错了**，**单**根节点的话不会默认根上了，需要手动绑定
  >
  > - 当你需要封装组件的时候，需要手动绑定 `$attr` 到**指定**节点的时候，需要设置 `false` ，不然**就算**手动绑定了，默认**也**回给根阶段传一份

- 这个也是 `vue` 的一个 `options` 选项

  > 在子组件当中进行设置

  ~~~js
  export default {
    name: "noPropsAttr",
    inheritAttrs: false,
  }
  ~~~






## 二、$emit()-发出 子传父

> 根据创建自定义事件的方式进行传值。

- 子组件 `$emit()` 发出事件，**父组件 v-on 监听事件并接收子组件传的参数**
- 子组件 `$emit("add", variable)` **发出事件的名称**，就是父组件所**监听的事件类型**



### 1、emits options

> 在多人协同开发的时候，其他开发人员**不能立刻找到当前组件所自定义的事件**，在**vue3中新增了一个 emits options 选项**，可以**标记该组件当中所定义的事件类型**

- 不使用 `emits optons` 的话也可以发出事件

- 优势

  1. 协同开发的时候，其他开发者可以很快的知道该组件有哪些**可用的自定义事件**，提高代码的阅读性

     >  其实就是在别人阅读的时候更加的方便一点

  2. 声明 `emits options` 选项的话**开发工具(vscode)**会根据该选项**进行自定义时间的提示**

  3. `emits options` 格式类型：数组，对象

  ~~~js
  export default {
    emits:["add", "sub"],
    inheritAttrs:false,
    name: "emitTest",
    props: {
      num: Number
    },
    methods: {
      increment() {
        //这里的实参会赋值到父组件监听函数的形参
        this.$emit("add", "递增")
        console.log(this.$attrs.info);
      },
      decrement() {
        this.$emit("sub", "递减")
      }
    }
  }
  ~~~

  

### 2、自定义事件的参数和验证

> 在 `vue3` 当中，我们可以对传递的参数进行验证：

- `emits options` 格式为 `Object` 类型的时候可以**配置验证函数**

  > 同样和 `validator` 函数一样，该函数会**在执行事件前进行触发**

- 返回值：必须配置否则会异常

  ~~~js
    emits:{
      //sub 是自定义发出的事件
      sub: function (data) {
        console.log("事件参数进行校验", data);
        return true
      }
    },
  ~~~




### 3、组件方法总结

1. ref 和 $attr
2. props 和 emit
3. provide 和 inject
4. 作用域插槽
5. 事件总线
6. 状态管理



# 第四节、插槽

> 作用：封装可复用组件，会让这个组件具备更强的通用性，在父组件当中**可以定义子组件指定节点的元素类型。**

- 插槽的使用过程其实是抽取共性、预留不同；
- 会将**共同的元素**、内容依然在**组件内进行封装；**
- 同时会将**不同的元素使用slot作为占位**，让**外部决定到底显示什么样的元素；**
- 插槽插入什么内容**取决**于**父组件如何使用**；
- Vue中将 `<slot>` 元素作为**承载分发内容的出口**，使用特殊的元素`<slot>`就可以为封装组件开启一个插槽



## 一、默认插槽

> 作用： 在子组件中使用 slot 元素**预设一个特定位置**，用来**接收**在父组件调用时**组件标签 ''内容'' 中的节点元素**

- 注意：

  1. 多个默认插槽的话，会将**组件标签中的内容**分别**放入多个默认插槽当中**，会存在重复的数据

  2. 默认值：当 `<slot></<slot>` 中**存在元素节点**或者内容的情况下**会被当做默认值**。

     > 当组件标签没有内容传入的时候，会使用默认值

  3. `slot` 标签不会渲染到页面上

     > 组件标签中的内容会替换掉，slot 标签
  
  ~~~html
  <template>    
       <div class="info">
           <!--预留一个特定的位置，使用该组件的时候在内容的位置插入的元素会替换slot标签-->
            <slot></slot>
       </div>
  </template>
  ~~~
  
  

## 二、具名插槽

> 具名插槽顾名思义就是给插槽起一个名字，`<slot>` 元素有一个特殊的 `attribute：name`，**便于将指定的元素节点放到指定的预设插槽当中**

- **注意**：不带 `name` 的 `slot`，**会带有默认的插槽名 `default`**

- **使用**：`v-slot: slotname` v-slot 指令进行**设置插槽名**

- **重点注意**：**同名插槽会进行覆盖**

  ~~~html
    <minxDefaultSlot message="电影推荐">
      <template v-slot:left>
        <div>{{info.info}} </div>
      </template>
       <!--当既有默认插槽和剧名插槽同时存在的时候，需要手动指定默认的插槽名-->
      <template v-slot:default="info">
        <div v-for="item in info.info" :key="item">{{item.name}}</div>
      </template>
       <!--插槽的简写方式-->
      <template #right>
        <div>张三</div>
      </template>
    </minxDefaultSlot>
  ~~~
  
  



### 动态插槽名

> 就是动态的绑定插槽的名字

- 可以通过 `v-slot:[dynamicSlotName]`方式动态绑定一个名称；

  > 使组件标签的**内容**，可以**动态在不同的插槽之间进行切换**。
  
  - 注意：这里是中括号的形式
  - 可以使用语法糖。
  
  ~~~html
    <activeSlot>
       <!--动态的将以下内容，在不同的插槽当中进行动态的切换-->
      <template v-slot:[slotName] >
        <button>点击</button>
      </template>
    </activeSlot>
    <button @click="slotName = slotNameList[0]">左边</button>
    <button @click="slotName = slotNameList[1]">中间</button>
    <button @click="slotName = slotNameList[2]">右边</button>
  ~~~
  
  



## 三、作用域插槽

> 同作用域插槽，可以访问到子组件中的内容



- **(重点)总结**：

  1. 在**子组件**的作用域**提供数据**，**绑定到slot的标签属性当中**，
  2. **同时**会**生成**一个**包含所有slot标签属性集合的对象**，父组件在可以**使用自定义变量进行接收该对象**。

  

- **(重点)作用**：在**不同父组件进行复用**的时候，根据**相同数据(由子组件进行提供**，**否则在不同的父组件当中使用**的时候**要但单独重复的请求获取数据**)，**自定义数据的展示形式**

  > 就是**子组件携带数据**，之后**由父组件**进行复用的时候 ，**来决定数据在插槽内以怎样的方式进行展示**。



- **父子通讯的方法总结**
- 父传子 `$attrs` 和 `props`
  
- 子传父：`$emit()` 和 `作用域插槽slot`



### 渲染作用域

- 在 `Vue` 中有渲染作用域的概念：
  - 父级模板里的所有内容都是在父级作用域中编译的；
  - 子模板里的所有内容都是在子作用域中编译的；
- 就是正常思路，子组件数据，操作，都只能在子组件内进行操作，父组件也同样。



### 作用域插槽使用

> 注意要在外城包裹一个template, 不然的话父组件设置的样式有可能不生效

~~~html
<div>
  <div>电影推荐</div>
  <!--定义作用域插槽-->
  <slot name="left" :info="arr[0]"></slot>
  <slot name="center" :info="arr[1]"></slot>
  <slot name="right" :info="arr[2]"></slot>
</div>

<!--在使用的时候可以获取到 slot 中的属性-->
  <scopeSlot>
     <!--完整写法：会将slot 设置的属性进行封装，父组件自定义变量获取该属性对象，最后通过 . 的方式进行读取-->
    <template v-slot:left="info">
      <button>{{info.info}}</button>
    </template>
      <!--可以将包含 slot 属性对象进行解构-->
    <template v-slot:right="{info}">
      <h3>{{info}}</h3>
    </template>
      <!--v-slot 语法糖写法，和属性的解构-->
    <template #center="{info}">
      <span>{{info}}</span>
    </template>
  </scopeSlot>
~~~



### 独占默认插槽的缩写

- 当默认插槽携带自己作用域数据的时候可以使用 `v-slot:default="slotProps"` 来接收数据

  > **默认插槽的名字就是 `default`**

- 简写：

  1. `v-slot="slotProps"`

  2. `#=slotProps` 或者 `#default="slotProps"`
     - 个人比较喜欢后者 `#default`，因为 `#=` 看起来比较别扭

  ~~~html
  <!--子组件-->
    <div class="box">
      <div class="title">{{$attrs.message}}</div>
      <!--绑定好需要携带的数据 list-->
      <slot :info="list"></slot>
    </div>
  
  <!--父组件-->
    <defaultSlot message="个人信息">
      <!--获取默认插槽携带的数据对象 ’通过解构获取属性值‘-->
      <template  v-slot:default="{info}">
        <div class="info" v-for="item in info">
          <div>姓名：{{item.name}}</div>
          <div>职业：{{item.profession}}</div>
          <div>工资：{{item.score}}</div>
        </div>
      </template>
    </defaultSlot>
  
  ~~~

  



- 当**只有默认插槽时**，**组件的标签**可以被**当做插槽的模板**来使用，可以**将 `v-slot` 直接用在组件上**

  - 也就**是当只有一个插槽**的时候**不需要使用 template 和具名插槽来区分**，可以**直接作用在子组件的标签上**

  > **注意**：个人觉得还是**使用 `template` 好一点更规范一点**，之后**升级该组件的时候不需要重复的修改，已经使用该组件的父组件**

  ~~~html
   <!--这里使用的 # 简写的方式-->
   <defaultSlot message="个人信息" v-slot="{info}">
        <div  class="info" v-for="item in info">
          <div>姓名：{{item.name}}</div>
          <div>职业：{{item.profession}}</div>
          <div>工资：{{item.score}}</div>
        </div>
     </defaultSlot>
  ~~~

  



### 默认插槽和具名插槽混合

- 当**既有**默认插槽和具名插槽，那么**按照完整的template来编写**

  ~~~html
    <minxDefaultSlot message="电影推荐">
      <template #left="info">
        <div>{{info.info}} </div>
      </template>
      <template #default="info">
        <div v-for="item in info.info" :key="item">{{item.name}}</div>
      </template>
      <template #right="info">
        <div>{{info.info}}</div>
      </template>
    </minxDefaultSlot>
  ~~~




## 四、`$slots` 和 `$scopedSlots`

> 在使用具名作用域插槽时 `v-slot:btn="{ userName }"`, 该插槽无法用 `$slots` 获取到, 要使用 `$scopedSlots` 获取

- 通过 `$slots` 和 `$scopedSlots` 封装已有组件

~~~typescript
      <el-tree
        v-show="treeFlag"
        v-bind="$attrs"
        ref="treeSelectRef"
        class="filter-tree"
        v-on="$listeners"
      >
        <template v-for="slotName in Object.keys($slots)" :slot="slotName">
          <slot :name="slotName"></slot>
        </template>
        <template v-for="slotName in Object.keys($scopedSlots)" :slot="slotName" slot-scope="{ data }">
          <slot :name="slotName" :data="data"></slot>
        </template>
      </el-tree>
~~~





# 第五节、非父子组件之间的通信



## 1、Provide(提供)/Inject(注入)

> 有一些**深度嵌套的组件**，子组件想要获取**父或者祖先组件**的部分内容，可以使用 `Provide/Inject` 进行组件之间**共享数据**
>
> - 简单说：实际上就是 **Prop 的逐级透传**，inject 的使用方式同Props使用方式相同

- Provide(提供)/Inject(注入) **是两个 options 选项**
- 当后代组件需要当前组件的数据，如果仍然使用 props 沿着组件链逐级传递下去，就会非常的麻烦；
- 对于这种情况下，可以使用 `Provide` 和 `Inject` ：
- 可以将依赖注入**看作是“long range props(长范围的属性)”**



### 1.1、依赖注入特点：

- 父组件不需要知道哪些子组件使用它 `provide` 的 `property`
- 子组件不需要知道 `inject` 的 `property` 来自哪里



### 1.2、Provide和Inject的使用及注意事项：

- 注意：开发中使用的话**一定**要**添加注释**，否则可读性会非常的差

- 为了解决多个provide 出现变量冲突的问题，建议key值使用Symbol类型

  > 单独在一个 key.js中声明Symbol类型的变量

- 在vue3.2 版本不会对vue进行默认解包的 ，会弹出警告，在以后的版本，将不用解包了

  > 在 main 内添加`app.config.unwrapInjectedRef = true` 配置



#### 事项一：Provide 和 Inject 的写法

> `Provide` 有对象和函数的两种写法，`Provide` 提供的**数据是非响应式的**



**对象**：对象的写法可以提供一些自定义的数据，但是**并不能通过 this 获取到其他options 中的数据。**

> 因为 `provide` 是个对象，外层又是一个组件对象，因此 **this 并不能指向 vm**，所以**只能**传一些在 `provide`  对象中自定义的数据

- 需要获取其他 `options` 当中的数据，**要使用函数的写法**，这样this 才会指向当前组件

  ~~~js
  export default {
  	provide：{
  		product: "轮胎"
  	}
  }
  ~~~

  

**函数**：如果要**使用 data 当中的数据**的时候，要在进行定义 `Provide options` 选项的时候记得要使用 函数返回一个对象。

> vue 会将 data对象绑定到 vm 上，同时又将 options 的 this 绑定了vm，因此如果**使用对象的方式 `this`  就不会指向当前 options** ，所以就获取不到 vm 当中的data。

~~~js
  provide() {
    /*注意这里要使用函数返回一个对象，否则 this 不会指向 vm(当前组件实例) */
    return {
      list: this.list
    }
~~~



#### 事项二：处理响应式数据

- 这个时候 `porvide` 提供的数据**不是响应式的**。因为是将响应式对象的值传了过去

- 数组可以是响应式的是因为，数组**绑定的是地址值**，**同时 `vue` 会将一些操作数组的方法进行侦听，触发之后会更新视图** 

  > 如果**整个替换数组**的话就不会是响应式的了。

  

- 这个使用可以使用 `vue` 中单独的 `computed` 计算属性函数

  - `computed` 函数**使用回调函数的方式**返回数据

  > **注意**：这里的回调函数要使用箭头函数，**这样`this`会指向当前的 `options**` 这样的话才能获取到 vm中绑定的 `data` 对象

  ~~~js
   import {computed} from "vue"
  //这个options 是个函数，应该也可以是个对象
   provide() {
      return {
        /*注意：同样这里要使用箭头函数，否则同样获取不到 vm*/
        list: computed(() => this.list)
      }
    },
  ~~~



#### 事项三：Inject注入的写法

> 因为依赖注入也称为，`Prop` 逐级透传

- 同 `Prop` 一致，既可以使用 数组，也可以用对象
- 对象类型**同样也有**默认值，校验函数，类型限定
- data中可以访问到inject的属性

~~~js
export default {
  inject: {
    /* 本地属性名 */ localMessage: {
      from: /* 注入来源名 */ 'message',
        //相当给provide注入的message起了个别名叫localMessage，避免和prod或data中的数据冲突
      default: () => ({ name: 'John' }),
      //同样设置默认值为引用类型的时候要使用函数的方式
    }
  }
}
~~~





## 2、事件总线(非父子组件)

> 通常在进行非父子组件之间进行传值，会使用 `eventBus` 的方式进行传递



- 常用的事件总线库：`hy-event-store`、`mitt` 或  `tiny-emitter`

- 其实就是，创建一个事件中心，之后使用订阅发布的模式，进行emit 发出(发布)，和 on监听(订阅)

  > 简单来说 执行 on 的时候会注册一个事件类型和回调函数，在 emit 触发指定类型事件的时候传入参数，之后会调用指定事件类型的回调函数，接收参数。实现了参数传递。

- 使用：

  - 接收数据的组件，**在 `created` 当中进行**，注册监听事件

    > 就是将回调函数添加到事件中心里，等待emit调用并且返回需要的值

  - 数据的传送方，进行 emit 发出调用，同时传递参数

  

- 简单使用过程

  ~~~js
  import { HYEventBus } from 'hy-event-store'
  //创建一个事件中心
  const eventBus = new HYEventBus()
  export default eventBus
  
  //之后在使用的组件当中进行导入使用，这个时候是同一个实例
  import eventBus from './utils/event-bus'
  ~~~

  

- 注意事项：`import eventBus from ‘../*’`  的时候在加载的时候执行一次，之后在import的时候只会取出变量。不会重复执行
  - 这个是**模块化的知识点**，会有一个变量进行判断是否需要重新加载。
  - 模块的加载过程
    - 结论一：模块在被**第一次引入时**，模块中的j<u>s代码会被运行一次</u>
    - 结论二：模块被**多次引入时，会缓存**，<u>最终只加载（运行）一次</u>
      - 这是在 `node` 当中每一个使用 `commonjs` 的文件都会被抽象成一个`module`对象，**每个模块对象module都有一个属性：`loaded`。**
      - **为false表示还没有加载，为true表示已经加载；**
      - 已经加载执行过的代码就不会在执行了。
  - 因此：这个 `eventBus` 实例**在多次导出的时候。都是同一个实例。**





## 3、ref(非父子组件传值)

- 可以使用hooks进行组件的绑定



# 第六节、组件的生命周期

> 在 `vue` 中使用声明周期函数，记录了 `vue` 在每个阶段的状态。



### 1、beforecreate

- `Vue` 组件**创建前调用**

- **调用完**：之后会**进行组件的初始化，生命周期函数，和事件，还有一些基本的对象** 

  > 此时还**无法通过 `vm` 访问到 `data` 中的数据，`methods` 中的方法。**



### 2、created

- **初始化完**数据监测，数据代理，之后会**进行调用**

- 可以**通过vm访问到data和metods中的方法，**

- **注意**：created虽然已经初始化了一些 options 选项，但是vue**还没有开始解析模板生成虚拟dom（内存中）**

- 使用场景：

  > 所以通常会在组件创建成功之后**进行异步请求、数据监听**及**一些对数据进行的操作**，因为这个时候**对 options 选项**已经初始化完成了

- **调用完**：**开始解析**模板生成虚拟dom（内存中），页面还不能显示解析好的内容，页面呈现的是未经过编译的dom的结构还不都能对dom进行操作此时还是虚拟dom



### 3、beforemount

- **解析完template 和 编译完 el 的 innerHtml 之后**进行**调用**，
- **调用完**：Vue完成模板解析**将虚拟dom编译成真实dom并把将真实的dom元素挂载到页面后**



### 4、mounted 挂载

- 挂载完毕后**调用的mounted函数** $el就是编译之后的真实dom。

- 使用场景：mounted 指定的时候说明dom解构一定解析完成了，

  - 会对dom进行初始化操作的时候

  - **注意**：**修该dom 会造成严重的回流**，尽量避免dom的操作

    > 一般进行dom操作都会在这执行。

  

### 5、beforeUpdate

- 数据更新，页面尚未和数据保持同步并没有生成新的虚拟dom，和旧的虚拟dom进行比较之后在更新model-》view
- 就是这个时候**数据已经更新了**，但是没有渲染到页面上
- **数据更新后进行调用**



### 6、updated

- 此时数据是新的页面也是新的，即页面和数据保持同步
- 数据和页面(`dom`)**全部更新完成**了之后**进行调用**



### 7、beforeUnmount



- vue2 当中该事件为 `boforedestory`，现在叫 `beforeUnmount`

- 在**执行卸载操作前先调用** `beforeUnmount`
  - 所有的`data`，`methods`。指令等等都是可用的状态，马上要执行销毁过程，
- **调用完之后会将 VNode 在 VDom当中进行移除**，之后更新页面
- 使用场景：
  - 一般在此阶段**关闭定时器、取消订阅消息、解绑自定义时间、清空注册的事件总线** 等收尾操作



### 8、unmounted

- vue2 中该事件为 `destroyed` ，现在叫 `unmounted`
- 回收操作：**完全销毁一个实例清理它与其他实例的链接**，解绑他的全部指令及自定义事件。



## 父子组件生命周期加载过程

- ##### 加载过程

父beforecreate -> 父created -> 父beforemount -> 子beforecreate -> 子created -> 子beforemount -> 子mounted -> 父mounted

- ##### 更新过程

父beforeupdate -> 子beforeupdate -> 子updated -> 父updated

- ##### 销毁过程

父beforedestory -> 子beforedestory -> 子destoryed -> 父destoryed





# 第七节、$refs

> 作用：获取**真实 `dom` 进行操作**，也可以获取**组件的实例**或者**组件的真实dom**

- 其他Api：`$root`，`$parent`



## $refs知识点

- **(重点)**：`$refs`是一个对象`Object`，持有**注册过 `ref attribute`** 的所有 **`DOM` 元素**和**组件实例 == `vm`。**

  > 重点记下ref 获取组件的话**默认是vm**，**获取真实dom使用 `标识.$el`**

- **注意**：修改数据的时候要修改组件实例中的 `data` 对象，但是**不要获取真实 `dom` 直接修改 `textContent`**

  > 会和响应式数据，产生副作用

- 使用**流程**：

  - 在元素标签上**注册**一个 `ref` ，`String` 类型

    > 其实就是在元素标签上添加一个 `ref` 属性，属性值会被**当作该标签的标识保存到 $refs 对象当中。**

  - 最后**使用 `$refs.标识` 进行获取该元素，组件的话会获取该组件实例**

- 使用场景

  - 父组件**调用**子组件的方法，获取数据，**及一些其他 `options`**

    > 就是 `vm` 能做的，在父组件中都能做
    >
    > - 可以通过获取 `vm` 给子组件的**`data` 动态添加或修改数据**



## $refs获取-使用方法

1. 普通标签元素获取的是真实`dom`
2. 组件标签获取的是组件实例 `vm`
3. 获取组件的真实`dom` 通过 `.$el` 进行获取

~~~html
<!--模板-->
<template>
  <div>
  <button @click="trigger">trigger</button>
  <cpnRef ref="cpn"></cpnRef>
    <h3 ref="ss">这里是H3</h3>
  </div>
</template>
<!--Script-->
<script>
import cpnRef from "@/11_ref获取元素组件(掌握)/CpnRef";
export default {
  name: "App",
  components: {
    cpnRef
  },
  methods: {
    trigger() {
      //获取的是 组件实例 vm
      console.log(this.$refs.cpn.btn());
      //普通非组件标签的话，直接获取的就是dom
      console.log(this.$refs.ss);
      //获取组件的真实dom 使用$el
      console.log(this.$refs.cpn.$el);
    }
  }
}
</script>
~~~



### $ref 绑定函数

- **重点**：ref**绑定了一个函数**的时候，会**将**这个**ref组件的实例**传入到**形参**当中，函数会被**多次调用**

  ~~~html
  <detail-feature-area name="描述" :ref="getSectionRef" :data="mainPart.topModule"/>
  ~~~

  

- **注意***：组件**卸载之后**，也会**调用这个函数**

  > 所以在使用的时候判断是否存在这个实例

  ~~~js
  //获取组件实例,组装数组
    function getSectionRef( instance ) {
      if(!instance) return
      //组件被挂在的时候会二次调用
      instanceObject.value[instance?.$el.getAttribute("name")] = instance;
    }
  ~~~

  



## $parent和$root的使用

- `$parent`：获取当前组件的父组件实例 `vm`

  > 同样获取真实`dom` 使用 **.$el**

- `$root`：获取当前组件的根组件实例 `vm`

  > 同样获取真实`dom` 使用 **.$el**

~~~js
    trigger() {
      console.log(this.$parent);
      console.log(this.$parent.$el);
      console.log(this.$root);
      console.log(this.$root.$el);
    }
~~~



## $options

> 用于获取，`options` 选项

- 获取组件对象中 `name options` 的时候可以使用

  > `this.$options.name`



# 第八节、动态组件(component)

> 在 `vue` 中会默认提供一个**内置的** `component` 组件，来展示不同的组件。

- 通过 `is` 标签属性来**决定**展示那个组件，属性值为**已注册**的**组件标签名**

- **使用场景(重点)**：可以使用 `v-bind` 来绑定 `is` 来**动态切换**展示不同的组件。

  > 用来切换，页面当中不同的 `tab`，需要展示不同的信息

  ~~~html
  <template>
  <div>
    <bar #default="info">
      <button @click="trigger(item)" v-for="item in info.list">{{item}}</button>
    </bar>
     <!--这里绑定data中一个变量，之后动态修改这个变量来决定具体要展示那个组件-->
    <component :is="cpnName"></component>
  </div>
  </template>
  ~~~



## 动态组件的传值

- 动态组件进行 `props` 和事件监听的时候和普通组件使用方式是相同的

- (重点)也同样也可以使用 `ref`，**来获取组件实例和`dom`**

  ~~~html
  <template>
  <div>
    <bar #default="info" ref="bar">
      <button @click="btn(item)" v-for="item in info.list">{{item}}</button>
    </bar>
    <component @click="trigger" ref="abc" :message="title" :is="cpnName"></component>
  </div>
  </template>
  
  <script>
  import home from "@/12_动态组件的使用(了解)/home";
  import about from "@/12_动态组件的使用(了解)/about";
  import production from "@/12_动态组件的使用(了解)/production";
  import bar from "@/12_动态组件的使用(了解)/bar"
  export default {
    name: "App",
    data() {
      return {
        cpnName:"home",
        title: "购物街"
      }
    },
    methods: {
      btn(value) {
        this.cpnName = value
      },
      trigger(event) {
        console.log("子组件被点击了", event.currentTarget, this.$refs.abc.$el);
      }
    },
    components: {
      home,
      bar,
      about,
      production
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  ~~~

  





## 保持存活keep-alive

> `keep-alive` 是一个**内置组件**可以让被**包含的组件，保持存活加入缓存。**

- 在使用 `component` 组件的时候。每次进行**动态切换**的时候，都会进行**卸载**，之后**重新创建组件的实例**

  > 这样如果其中一个组件的**业务逻辑没有完成**，就被销毁了，这样每次**切回来的时候之前的逻辑就会被清空。**

- 组件标签的属性

  - `include`： string | RegExp | Array(String)。

    > 只有  , 名称(**组件对象中的 name optiongs**)  "**匹配** " 的组件会被缓存；

  - `exclude`：string | RegExp | Array(String)。

    > 任何名称匹配的组件都不会被缓存；

  - `max`：number | string。

    > 最多可以缓存多少组件实例，一旦达到这个数字，那么缓存组件中最近没有被访问的实例会被销毁；

    - max设置缓存的规则，切换到那个组件那个组件就会进行缓存，像是对列的结构，切换下一个组件就会插入队列上一个就会被顶出来

      > 例：如果两个组件`max 1 includ`包含两个组件 那么两个组件在相互切换的时候会不断的进入队列之后在被顶出，只有选中切换的当前组件才会在这个只有一个位置的队列里

  - **强调**：`keep-alive` 是**根据**组件对象中 **name options 选项**来**匹配缓存组件的**，并且使用 `String` 匹配**多个组件**使用**逗号隔开**的时候，**不能有空格！！！**
  
  > 想要加空格的话可以使用数组。**提示**：使用数组的话记得**使用 v-bind** 。
  
    - 匹配首**先检查组件自身**的 **`name` 选项**，因为不会有默认的 `name options`；
    -  **默认**会**将包含的所有组件**进行缓存
  
  ~~~html
  <template>
  <div>
  <!--这里的使用数组排除的话 要加v-bind-->
    <keep-alive :exclude="['about', 'home']">
  <!--会将 component 进行切换的组件进行缓存，默认全部缓存-->
      <component @click="trigger" ref="abc" :message="title" :is="cpnName"></component>
  </keep-alive>
  </div>
  </template>
  
  <!-- vue3中结合router-view组件的使用-->
  <router-view v-slot="{ Component }">
      <keep-alive :include=[a,b]>
        <component :is="Component" :key="$route.fullPath"/>
      </keep-alive>
  </router-view>
  ~~~
  
  

### keep-alive 缓存组件的生命周期

> 当一个组件进行缓存，保持存活的一个状态下，**是不会执行created或者mounted等生命周期函数的**，因此需要使用其他的 options **生命周期钩子函数**来监听侦听组件是否被切换了

- `activated()`：**当前组件**处于活跃状态

- `deactivated()`：非活跃状态

- 使用 `this.$options.name` 获取组件对象的`name`

  ~~~js
    activated() {
      console.log(this.$options.name, "组件活跃");
    },
    deactivated() {
      console.log(this.$options.name, "组件切换");
    }
  ~~~

  



# 第九节、Webpack的代码分包



- 默认的打包过程：

  > 在构建整个组件树的过程中，因为组件和组件之间是通过模块化直接依赖的，那么`webpack`在打包时就会根据依赖图，将所有组件模块打包到一起（打包到一个js文件里）

  - 这样**打包的js过大**，这样会在首次下载js，并加载js的时候，**造成首屏的渲染速度变慢；**

  - 同步组件打包之后的结构

    ~~~js
    ∇dist
      ∇js
      	//这里只会有一个js文件
        app.eaecfbe6.js
        //这里是供应商的js文件，就是所使用的第三方js文件
        chunk-vendors.38ac3691.js
      favicon.ico
      index.html
    ~~~

    

- 解决方案

  - 对于**非首次**渲染到屏幕上的组件，可以进行单独**拆分**为多个 `chunk.js` 文件

    > 拆分后的 `chunk.js` **会在需要时从服务器加载下来**，并且加载运行代码，显示对应的内容；

  - 通常在 `webpack` 的环境下使用的是异步组件和路由懒加载的方式。

    > 这样 `webpack` 在进行打包的时候进行拆分。



## 异步组件

- 使用创建异步组件函数( `defineAsyncComponent` )的方式进行导入
- `defineAsyncComponent` 接受**两种类型的参数**
  - 类型一：工厂函数，该**工厂函数**需要**返回**一个**`Promise`对象**
  - 类型二：接收一个**对象类型**，对**异步函数进行配置**；



### 定义异步组件一

- 使用工厂函数的方式

  ~~~js
  import {defineAsyncComponent} from "vue";
  const home = defineAsyncComponent(() => import("./home"))
  const profile = defineAsyncComponent(() => import("./profile"))
  const about = defineAsyncComponent(() => import("./about"))
  ~~~

  

- 异步组件打包后的结构

  ~~~js
  ∇dist
    ∇js
    	//根据每个组件分别进行打包
      28.d37c1bde.js
  	299.ec5e7a86.js
  	409.650ab78c.js
  	app.606f5885.js
  	//第三方js 打包的文件
  	chunk-vendors.d9649fa6.js
    favicon.ico
    index.html
  ~~~

  

### 定义异步组件二

- 对象类型，可以**对使用的组件**进行一些**深度配置**

~~~js
const math = defineAsyncComponent({
  //工厂函数
  loader: () => import("./utils/math"),
  //加载过程中显示的组件
  loadingComponent: Loading,
  //加载失败显示的组件
  errorComponent: Error,
  //在显示loadingComponent 之前的延迟 |默认：200
  delay: 200,
  //定义了组件是否挂起 | 默认值true
  suspensible: true,
  //如果提供了 timeout ,并且加载组件的时间超过了设定值，将显示错误组件
  //默认值：infinity （即永不超时，单位：ms）
  //timeout:0
})
~~~



# 第十节、组件的v-model

> 组件的 `v-model`，**即 **组件数据的双向绑定

- 通常在表单标签上会使用 `v-model` ，**vue也支持在组件上使用 `v-model`**。

  > 回顾：表单的本质就是，**`v-bind:value` 的数据绑定**和 **`@input` 的事件监听**

- 作用在不同的地方，底层的实现也是不同的

- **使用场景**：

  - 由于子组件不能直接修改父组件传入的值，因此可以使用v-mode来**实现父子组件的数据同步**
  
    > （这个是重点需求）父组件改了，子组件也会改，同样子组件改了父组件也会改。



## 组件v-model的本质(重点)

- `v-model` 作用在组件上时，会将绑定的值，**默认绑定一个 `modelValue` 属性上**，<u>传入到子组件当中</u>。



- **同时**会在组件标签上**自定义一个事件 `update:modelValue`** 并且监听该事件，**父组件通过监听该事件接收响应的值** 在赋值给所绑定的 `data` 属性
- 这里的事件类型标识的创建方式是**根据 `uptate:`** 加上 **`v-model` 所绑定的属性名称** 的结构**自动生成的**。
  - 这里的如果世界 v-mode="list" ,**默认绑定的就是 modelValue属性**
  
- **绑定多个属性**



### v-model 的事件对象

- `v-model` 绑定的事件类型，例：`update:modelValue` 的事件对象 `$event` 保存的就是被修改后的值

  - 如果事件**监听的 `methods` 传入了`$event`** 的话，那么 `$event` 只会代表**第一个参数**

  - 需要**接收多个参数**的时候，需要使用默认事件对象

    > 就是在 `html` 模板上监听的函数不添加小括号，之后在 `methods` 中直接 `trigger(...event)` 使用这个参数就好了。

- 因此可以直接进行修改

  ~~~html
  <!--给子组件绑定数据，子组件只需要 emit 提供要修改的数据就好，v-mode 会默认修改v-model帮定的值-->
  <home @update:info="info = $event" :info="info"></home>
  ~~~

  

### 默认绑定

~~~html
<!--父组件进行绑定-->

<template>
  <div>
    <!--这里可以绑定多个属性-->
    <childrenComponent v-model:title="info" v-model:message="message"></childrenComponent>
    <div>这里是父组件{{message}}</div>
  </div>
</template>

<!--这里是子组件-->
<template>
  <div>
    <label for="inp">这里是子组件
      <input id="inp" v-model="msg" @input="trigger" type="text">
    </label>
  </div>
</template>
<script>	
  methods: {
    //通过input事件获取实时更新的数据msg，这里也可以使用watch
    trigger() {
    //子组件根据指定格式发出事件类型，进行数据的传输。父组件获取到之后会自动更新message属性
    this.$emit("update:message", this.msg)
    }
  }
</script>
~~~





# 第十一节、Mixin

> 用来抽取组件和**组件之间**存在的**相同的代码逻辑**，单独**封装一个mixin对象**，当组件需要复用此逻辑时，将mixin对象进行**合并**即可。

- 一个**Mixin对象**可以包含**任何组件选项**；

  > 提示：`mixin` 是一个对象，单独封装 js 的时候**注意导出格式**

- 当组件使用`Mixin`对象时，所有**Mixin对象**的**选项**将被 **混合** 进入**该组件本身的选项中**；

- vue3中的混入已经使用hooks了



## 1、Mixin的合并规则

> 除生命周期函数外，都采用**组件优先原则**



- ###### 1、`data`对象

  - `data`返回的对象会进行合并，对象当中的**属性冲突**会**优先保留组件自身数据**

    

- ###### 2、生命周期 `life cycle`

  - 生命周期的钩子函数，会被**合并到一个数组当中**，**都会被调用**

    

- ###### 3、其他options，methods，watch，component....

  - 定义的方法**都会生效**，同理**冲突的话**还是会**优先使用组件自身的方法**



## 2、Mixin的使用



### 2.1、Mixin局部混入

- 通过 `mixins` `options`，接收需要合并的混入对象
  - 注意：局部混入是复数形式。带 `s` 局的不带

- 组件对象中 `mixins options` 选项**保存 mixin 的格式**，因为可以合并多个`mixin` 对象所以要是**数组形式**的需要迭代

~~~js
//定义mixin对象 导出
export const mixin = {
  data() {
    return {
      message: "hello zhangsan"
    }
  },
  methods: {
    trigger() {
      return this.message;
    }
  }
}

//组件对象进行合并
import {mixin} from "./mixin/index.js"
export default {
  name: "home",
  mixins: [mixin]
}
~~~



### 2.2、Mixin全局混入

- 通过app对象的 `mixin` 方法来完成注册；
- 一旦注册全局混入会将 mixin 对象**合并到所有组件当中**，包括app、keep-alive... 等组件

~~~js
import { createApp } from 'vue'
import mixin from "./mixin/index.js"
//创建 app
const app = createApp(App)
//进行注册：将 mixin 对象合并到全部组件当中
app.mixin(mixin)
app.mount('#app')

~~~



# 第十二节

> 通常在项目中，需要配置不同的开发环境方便进行不同的配置


## 一、环境变量

> 通过条件判断的的时候，可以利用 node 中的 env 属性类判断不同的环境配置 `process.env.NODE_ENV`

~~~js
//.env.development文件
//开发环境
NODE_ENV = 'development'
VUE_APP_BASE_API = '/dev-api'


//.env.production
//生产环境
NODE_ENV = 'production'
VUE_APP_BASE_API = '/prod-api'

//网络请求js
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
~~~





## .env 文件配置

> 在vue-cli 中可以使用 `.env` 文件进行环境的配置

- 在vue-cli 中会自动读取**特定**名称的文件，读取不同环境**特定**的变量

  > vue-cli 并不会随便读取变量，只会读取 `NODE_ENV` 、`BASE_URL` 。或者是`VUE_APP_自定义名称`

  

### 特定配置文件

> vue-cli 只会读取特定的环境文件中定义的变量， `webpack.DefinePlugin` 静态地嵌入到*客户端侧*的代码中。

1. `.env.development ` npm run serve
2. `.env.production`  npm run build
3. `.env.test` npm run test



### 特定环境变量

- 因此当需要定义除  `NODE_ENV` 、`BASE_URL`  之外的环境变量的时候，需要通过 `VUE_APP_自定义名称` 来自定义其他的变量
- 这样**定义的变量** 会被添加到 `process.env.***` 里
  - 使用的时候，也需要使用 `process.env.BASE_URL` 来进行读取

```js
axios.interceptors.request.use(  config => {    
    if (config.isBi) {      
        config.url = process.env.VUE_APP_BI_BASEURL + config.url    
    } else {      
        config.url = process.env.VUE_APP_BASEURL + config.url    
    }    
    return config  
},  err => {    
    return Promise.reject(err)  
           })
```

在js中配置，优点不用重启

```js
if (process.env.NODE_ENV === "development") {
  // 修改开发环境地址，如果在config中修改，还需要重启项目
  // host = "http://192.168.0.189:8082";
  // host = "http://192.168.0.186:8082";
   // host = "http://yaming.shenzhuo.vip:44677/";
   host = "https://www.data-sprite.com/";
   // host = "https://1622l288h9.zicp.fun";
} else if (process.env.NODE_ENV === "test") {
  host = "http://192.168.0.200:8082";
} else if (process.env.NODE_ENV === "production") {
  host = "https://www.data-sprite.com/";
}
```



# vue-cli 不好理解的配置

- publicPath

  > 相当于静态资源需要读取的路径。通常会在开发环境配置，以便于读取对应的静态资源文件。

  - 生产不需要改，因为默认打包的index.html中引入的js 文件路径是 / 。



# vue性能优化

1. `v-if` 避免和 `v-for` 在同一个元素中使用

   > 答案： 当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级 ， 这意味着 **v-if 将分别重复运行于每个 v-for 循环中，造成性能方面的浪费**。 所以永远不要把 v-if 和 v-for 同时用在同一个元素上。

   ~~~typescript
   <div id="app">
       {//避免这种情况，这样会for循环之后，在进行if判断}
       <p v-if="isShow" v-for="item in list">
           {{ item.name }}
       </p>
   </div>
   ~~~

2. vue3中的if优先级高于for了

   
# Faq

### vue中覆盖 UI (user interface) 样式的4种方法

1. 重写覆盖 :root 声明的变量。

   > 通常

2. 局部覆盖 :root 声明的变量

   > 因为 : `root` 没有 `scoped` ， 其他的子组件都可以获取。

3. 如果是插槽的样式，直接组件当中添加 class 修改即可

4. 通过 `:deep()` 进行修改

   > :deep(.class) 找到子组件的类, 让子组件的类也可以生效

   ~~~css
   //vue2 "vue-loader": "^13.3.0",
   /deep/ .el-loading-mask .el-loading-spinner{
      top: 50% !important;
      transform: translateY(-50%) !important;
   }
   
   //vue2
   ::v-deep .search-input .el-input__inner {
   	border: 0px;
   }
   
   //vue3
    :deep(.van-tabbar-item__icon) {
       font-size: 50px;
     }
   ~~~
   
   
