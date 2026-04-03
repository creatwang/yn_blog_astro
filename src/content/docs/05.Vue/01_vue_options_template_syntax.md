---
title: 'Vue options|template 基础语法'
---

# 第一节、vuejs介绍

> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的**渐进式** JavaScript框架。在国内的占用率是最多的。



- 全称是 `Vue.js` 或者 `Vuejs`；

- 它基于标准 `HTML`、`CSS` 和 `JavaScript` 构建，并提供了一套**声明式的、组件化**的编程模型；

  > `Vue`的本质，就是一个`JavaScript`的库：

- **可以高效地开发用户界面**，无论任务是简单还是复杂；

- **渐进式 `javaScript` 框架**

  > 主张最少，并不强制性的使用 vuejs 中的所有功能。可以自由的选择需要 vuejs 那部分功能，在进行引入使用即可。**可以分步逐渐引入和使用 vuejs。**



- **声明式编程**

  - 声明式编程，更多关注的是需要什么，就声明什么。之后交由 vue 处理

    > **不需要明确的指定需要操作的对象**，只需要声明自己的变量，代码之后按照特殊的语法，**放到指定的位置进行执行来实现特定的功能的一种编程方式。**



  - 命令式编程

    > 命令式编程的主要思想是关注计算机执行的步骤，即一步一步告诉计算机先做什么再做什么。




- 找后端的工作：优先推荐 Java、其次推荐Go、再次推荐Node（JavaScript），可能不推荐PHP、C#；
- 找前端的工作：优先推荐 JavaScript（TypeScript）、其次Flutter、再次Android（Java、Kotlin）、iOS（OC、Swift）；



### 1、vue2-vue3 区别

> 尤雨溪：直接学vue3即可基础概念是一样的

> 13年 尤玉溪开发了seed
>
> 14年对外正式发布 0.8版本的vue
>
> 2016年的5月份发布的vue.js2.0
>
> 在2020年的9月19日，万众期待的Vue3终于发布了正式版，命名为“One Piece”。

1. 更小的包体积，速度更快，性能高，**重写了虚拟dom的实现**
2. 更友好的ts集成
3. 新增`compositionApi`，使**业务逻辑更加具有内聚性**
   - 写法**更接近原生JS**，，写出的代码更易维护
4. 更好的Api，声明周期函数，指令的声明周期函数
5. 最重要的，重写了vue的响应式系统
6. 指令的声明周期已经更改和组件生命周期相同了
7. 新增特性，多根，`teleprot`
8. 全局和内部 `API` 已经被重构为可 `tree-shakable`
9. vue2中的minix已经使用hooks代替

> vue2中采用了，defineProptis 实现了响应式，vue3 使用es6 Proxy 通过数据的监听实现了响应式系统

10. 修改样式的区别也不一样---这个是vue-loader的区别
11. vue2中不能使用可选连
12. vue2 template 中不能添加key，vue3可以
13. @linerner 和 attr 对象已经合并了

#### 1.1、vue 3.5更新

1、以前defineProps解构出来的值并不是响应式，需要通过toRef这种工具来变成响应式，现在vue3.5更新了这方面的不足，现在可以直接从defineProps解构出来的值就是响应式的了。

2、useId() 是一个 API，用于生成在服务器和客户端渲染之间保持稳定的唯一应用程序 ID。这些 ID 可用于生成表单元素和无障碍属性的 ID，并且可以在 SSR 应用程序中使用而不会导致水化不匹配：

3、`useTemplateRef()` 以前我们在获取dom元素都是用的ref属性，现在官方引出来这个函数来操作我们的dom.



### 2、MVVM模型及响应式数据，深度响应式

> MVVM是一种架构模式，`view` 和 `model` 不会直接进行沟通，**通过`model-view`，来监听页面，在绑定指定的模型进行数据banding**。这样当页面发生改变的时候模型可以立刻监听到，模型发生改变的时候，页面也随着改变



- `view` 和 `model` 数据之间的沟通是通过 `view-model` 来进行操作的。

  > view-model-指的就是框架，由 vue 内部来进行页面和数据之间的沟通。

  - 这个**数据绑定的过程**其实就是，Vue的响应式系统**数据劫持**

- Vue官方其实有说明，Vue虽然并没有完全遵守MVVM的模型，但是整个设计是受到它的启发的。

- MVC(View-controller-Model)：有控制器将数据装换成对应的模型，在由 controller 传到 view 将数据展示

  > **整理好的数据即模型**，整理数据传送到view即 controller，界面或html 为view。



- **提示**：vue中的响应式编程是深度的，对象**属性**及数组**元素**进行改变之后，同样**相应的元素**也会随之改变，数组的添加删除的响应式有对应的 push.... 方法



### 3、weex框架

- 一份代码编译成不同目标文件分别在 Web、Android 和 iOS 平台上运行。
- 有些相似 react native



# 第二节、vuejs options对象

> 创建 vue 实例的时候需要传入的参数，**可选择需要提供的哪些属性对象。**这些**选项**就是options



## 一、methods

- **类型：**`methods: { [key: string]: Function }`

- **详情**

  - `methods` 将被混入到组件实例中。可以直接通过 VM(虚拟dom-表示组件) 实例访问这些方法，或者在指令表达式中使用。

  - **方法中的 this 自动绑定为组件实例**

    - 底层是**通过 bind() 函数来绑定this**的。

    > 因此 methods 中的所有函数，不能使用箭头函数，--（箭头函数不绑定this）。

    - 可以使用 this（vm）访问其他的 options





## 二、data

> data 函数会返回一个data对象，vue3  vm 会通过 **创建一个 proxy 代理对象的方式来监听data对象**。vue2 使用的是存取属性描述符defineProperty



- 类型：`function`

- 以 `_` 或 `$` 开头的 `property` 不会被组件实例代理，因为它们可能和 `Vue 内置`的 `property、API` 方法冲突。

  > 可以使用例如 vm.$data._property 的方式访问这些 property。

- `data` 函数中的 `this` **默认会绑定到当前组件的实例**。

  > 因此，这里**不能使用箭头函数**-(箭头函数不绑定this)



- 实例创建之后，**可以通过 `vm.$data` 访问原始数据对象**。**组件实例** 也 **代理了 data 对象上所有的 property**，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

  > `vm` 就是当前组件的实例对象



## 三、computed计算属性

> 主要用于处理 data 当中的复杂类型

- 对于任何**包含复杂逻辑的响应式数据**，你**都应该使用计算属性**；

- 特点

  - 计算属性在 **直观使用上是一个属性**，但实现上是函数的形式，使用**语法糖是函数的形式**，**完整写法是对象的形式**

    > **属性的调用，是不加 () 的**，并且属性定义好了之后，**可以重复使用不会重新计算**，除非修**改了属性会进行重新计算**

  - 并且计算属性是有缓存的；

    > 在数据**不发生变化时**，**计算属性是不需要重新计算的**，只会计算一次。
    >
    > - 如果**依赖的数据发生变化**，在使用时，计算属性**依然会重新进行计算；**

  - 底层使用的 proxy 进行实现的



### 1、mustache 语法使用表达式的弊端

- 当对 `data` 数据进行运算在`{{}}` 中进行运算、三元运算符来决定结果、数据进行某种转化后显示。

  > 设计它们的**初衷是用于简单的运算，非常方便的实现；**

  - 模板中放入太多的逻辑**会让模板过重和难以维护**，并且如果多个地方都使用到，那么会有**大量重复的代码；**



- 对于这样的复杂数据就可以用 `computed` 和 `method` ，将逻辑抽离出去进行实现



### 2、computed 的使用

- options 选项：computed
- 类型：{ [key: string]: Function | { get: Function, set: Function } }



#### 2.1、语法糖写法(主要用法)

~~~js
    //直接当作属性来用
	//div class="box">{{reMessage}}</div>
    computed: {
      reMessage() {
        return this.message.split(" ").reverse().join(" ")
      }
    }
~~~



#### 2.2、完整写法

> 不要和 watch 搞混

- vue 会进行判断是否是一个函数，是函数直接取get，不是函数在options 里取get 和 set
- **注意**：`computed` 虽然是深度监听，但是他依然是属性，因此只有重新赋值的时候才会触发`set`方法

~~~js
    computed: {
      reMessage: {
          get() {
              return this.message.split(" ").reverse().join(" ")
          },
          set(value) {
              this.message = value
          }
      }
    }
~~~



#### 2.3、computed 和 methods的区别

1. `methods` **有多少个模板语法，就会调用多少次。**
2. `computed` 只会计算一次，是有缓存的，**当依赖的数据和本身不发生改变的时候是不会进行计算的**
3. `computed` **在使用上也会更加的直观**，`methods` 在模板语法当中使用表达式的方式只是重复的调用函数。
4. `wacth` 可以发送异步请求，但是`computed`不可以



## 四、侦听器watch

> watch主要用于，**在代码逻辑中监听某个数据(例：data, 或者计算属性）的变化**。

- **特点**：当**修改相同数据**的情况下**不会重复执行**
- 使用场景：
  - 用户在**input中输入**一个问题；
  - 每当用户输入了最新的内容，**通过监听内容获取到最新的内容**，并且使用该问题去服务器查询答案；
  - 来**实时的去获取最新的数据变化**。

- 选项：watch
- 类型：`{ [key: string]: string | Function | Object | Array}`



### 1、watch 基本使用

> 默认是**没有开启 deep** 监听的，**默认watch监听不会进行深度监听**

- 默认会有**两个参数**

  > 果监听过的是 **对象类型的数据**的话，这里的**参数对象是一个 proxy 代理对象。**

  - **(重点)**可以**通过 `Vue.toRaw(val)`  获取到源对象**

    > 在 vue-cli 当中因为是用导入的方式，使用createApp方法 所以需要 Vue 对象的时候需要重新导入下 `import  Vue from 'vue'`

  1. 修改后的值
  2. 修改前的值

- **基本监听**使用的时候 **函数的形式**



- 基本监听

~~~js
    watch: {
      message(val, oldval) {
        console.log(val, oldval, "被监听的值");
      },
    }
~~~



- **监听对象中的属性**

  > 支持字符串的写法

```js
  "info.bookname" (val, oldval) {
    console.log(val, oldval);
  }
```



### 2、watch 完整写法

> 完整写法是**对象形式的**

- 可以进行**深度监听**：`deep: true`

  > 引用对象内部的属性发生改变也会进行监听，`mustach` 和计算属性默认就是深度监听

- 决定**是否页面加载的时候就触发监听**： `immediate：true`

- 注意：方法是 `handler`

- **注意：**这里的 `val` 和 `oldval` 都是同一个对象, 因为并没有改变整个对象。

~~~js
    watch: {
      info: {
        handler(val, oldval) {
          console.log(val, oldval);
        },
        deep: true,
        immediate: true
      }
    }
~~~



### 3、$watch 进行监听

> 可以在组件进行加载的时候，**在组件vm实例中** 当**获取到 `watch` 实例进行监听**

- 在声明周期函数中进行定义

- 参数一：监听的变量名，String 类型

- 参数二：callback 函数 发生改变是会调用

- 参数三：对象类型，在这里定义 deep 和 immediate

  ~~~js
      created() {
        this.$watch("info", (val, oldval) => {
          console.log(val, oldval);
        }, {deep: true, immediate: true})
      }
  ~~~



### 4、watch 其他的监听

- 当想要监听**对象中**的**某些属性**的时候可以使用 `String` 的写法

- 指定数据改变时需要调用 `methods` 中指定的函数

  > 可以在**数据改变**的时候**更新重复的代码逻辑。**



  ~~~js
      watch: {
         //指定数据发生改变的时候，会调用methods 中的函数但是默认并不会 deep 监听
        "info.content": "changeFc",
      },
      methods: {
        btn() {
          this.info.content = "sss"
        },
        changeFc(val, oldval) {
          console.log(val, oldval);
        }
      },
  ~~~



- **深度监听写法**

  ~~~js
    watch: {
        info: {
          handler: "changeFc",
          deep: true
        },
      },
  ~~~



- ##### 数组形式（不常用）

  > 可以**同时使用**   **字符串的形式**，调用**methods函数**形式，**对象形式**，**handler形式**

  ~~~js
  watch: {
        "info.content": [
            //调用method
          "changeFc",
            //handler
           function handler(val, oldval){
              console.log(val, oldval);
            },
           //对象形式深度监听
            {
              handler(val, oldval) {
                console.log(val, oldval);
              },
              deep: true,
              immediate: true
            }
        ]
      },
        changeFc(val, oldval) {
          console.log(val, oldval);
        }
      },


  ~~~




### 5、watch和computed的区别

1. computed 页面加载会**立即执行**，采用懒加载的方式，**返回值依赖的数据**发生了变化，才会重新计算，**不支持异步操作**
2. watch **主动**监听的，**监听对象发生变化**才会计算，**支持**异步操作，需要**配置立即执行**



## 五、name

1. 调试的时候用于展示组件的名字
2. 做**组件递归**的时候要设置自己的名字
3. `keep-alive` 用于做组件缓存用的



# 第三节、template 模板语法

- `React`的开发模式：
  - **React使用的jsx**，所以对应的代码都是编写的类似于js的一种语法；
  - **之后通过Babel将jsx编译成 React.createElement 函数调用；**



- `Vue`也支持 `jsx` 的开发模式（后续有时间也会讲到）：
  - 但是**大多数情况**下，使用**基于vue自身HTML的模板语法；**
  - 在模板中，允许开发者以**声明式的方式将DOM和底层组件实例的数据绑定**在一起；
  - 在**底层的实现中**，Vue**将模板编译成虚拟DOM渲染函数**，这个我会在后续给大家讲到；





## 一、mustache 语法

> 使用最多的语法是 “`Mustache`”语法 (双大括号) 的文本插值。

- `Mustache` 中的**变量会默认读取 data代理对象中的数据**

- `Mustache`中**不仅仅可以是data中的属性**，也可以是一个**JavaScript的表达式。**

  > 但不可以是代码片段



## 二、指令语法

### 1、简单指令

#### 1.1. v-once指令（了解）

> `v-once` 用于指定元素或者组件只渲染一次：

- 当**数据发生变化**时，元素或者 **组件以及其所有的子元素** 将视为静态内容并且 **跳过**
- 该指令可以用于性能优化；



#### 1.2. v-text指令（了解）

- 用于**更新元素的 `textContent`：**



#### 1.3. v-html

> `v-html` 中 `html` 结构的内容会被 `vue` 解析。

- **相当于 `innerHtml`** 会替换掉所有子元素



#### 1.4. v-pre

> `v-pre` 用于跳过**元素**和**它的子元素**的编译过程，**显示原始的Mustache标签**

- 跳过不需要编译的节点，加快编译的速度；

  > 使用该指令的节点，并不会编译 `Mustache` 语法



#### 1.5. v-cloak

> 这个指令保持在元素上直到关联组件实例结束编译。

- 当组件实例 js 编译较慢data数据并没有加载完，造成的由 Mustache 语法标签展示到页面上，会降低用户体验

  > 可以将外层的 组件 添加 `v-cloak`。设置display：none，只后等待实例编译完成 移除v-cloak在展示页面

  ~~~css
  [v-cloak]: {
  display: none
  }
  ~~~



#### 1.6. v-memo (比较新3.2+)

> `memo` 记事本备忘录的意思，当 `memo` **数组中指定 `variable` 改变**的时候，**才会重新渲染**该标签**后代节点中的变量**

- 用于性能优化

- **预期**：`Array`
- 当组件**重新渲染**，如果 `valueA` 和 `valueB` 都**保持不变**，这个 `<div>` 及其子项的所有更新**都将**被**跳过**。

~~~html
<div v-memo="[valueA, valueB]">
  ...
</div>
~~~



### 2、v-bind指令

- 语法糖：`:`

- 动态地**绑定标签 `attribute`**，或一个**组件 `prop` 到表达式**。

  > `v-bind`用于绑定**一个或多个**属性值(对象的写法)，或者向另一个组件传递props值



#### 2.1. v-bind的绑定属性值

> v-bind可以动态绑定元素属性的值

~~~html
<div class="album"><img :src="flag ? imagesUrl : imagesUrl1" alt=""></div>
~~~

- 切换图片 `三元运算符`。



#### 2.2. v-bind绑定属性名

> 语法：注意绑定属性名的时候**不识别驼峰标识 **
>
> - 驼峰表示法，会被全部转换为小写，所以注意绑定属性的时候**data对象中的变量要小写**
> - 短横线的语法- 不支持会被认为是两个变量，**会报错，声明了两个变量也报错**
> - 值：记得用双引号区分，否则会被认为是变量

~~~html
<!--这里会被认为是两个变量：定义了两个变量也不生效-->
 <div class="box" :[attr-name]="'wangwu'">这里是box</div>
<!--这里会解析为attrname-->
 <div class="box" :[attrName]="'wangwu'">这里是box</div>
~~~





#### 2.3. v-bind直接将对象属性绑定到元素（批量绑定直接绑定一个对象）

> 直接使用 v-bind = "variable" 批量绑定

- **可以使用语法糖**

~~~html
<!--template-->
<div class="box" v-bind = 'infos'>这里是box</div>
<!--绑定之后的效果-->
<div class="box" :name="name" :addr="addr" :profession="profession">这里是box</div>

<!--script-->
<script>
   export default {
       data() {
           infos: {
               name: "zhangsan",
               addr: "天津市 曲艺协会"，
               profession: "相声演员"
           }
       }
   }
</script>
~~~



- 注意：这里**不能使用数组批量绑定**

  > 使用数组绑定的话会将，索引当做属性key ，**属性中的key的标识符 不能使用数字开头，因此会报错**





#### 2.4. v-bind绑定class

> 绑定 `class` 有两种方式：**对象语法、数组语法**



##### 对象绑定

> 语法：
>
> - `key` 可以是字符串也可以不是。
>
> - `value` 如果是变量的话就不能是字符串。

1. 基本绑定 `class`，使用表达式

   - 三元运算符

   ~~~html
   <button :class="flag ? 'active' : ''" @click="toggle">toggle</button>
   ~~~

   - 函数

   ~~~html
   <button :class="toggleStyle()" @click="toggle">toggle</button>
   ~~~



2. `class` 绑定对象用法

   > 有 `value` 决定是否显示 `key`，**`value`一般为 `boolean`**

   ~~~html
   <!--这里的active 可以不加单引号 -->
   <button :class="{ 'active' : flag }" @click="toggle">toggle</button>
   ~~~

   - **可以添加多个属性**: 并不会影响 正常的 `class`

   ~~~html
   <button class="box" :class="{active: flag, feature: flag, topic: flag}" @click="toggle">toggle</button>
   ~~~



##### 数组绑定

> 语法：
>
> - 数组中定义的类要是字符串类型，**注意单双引号的区分**
> - 数组中也可以使用 **对象绑定的写法**

- ##### 优点

  > 可以省去，**手动添加**一个普通的 `class` 标签属性来**定义其他的class**，**且**还可以将数组中的**其他普通 `class`**属性进行**动态绑定**



- ##### 可以绑定的值

  1. **变量**或者**字符串**，关键是可以绑定变量
  2. **三元**运算符
  3. **对象**

~~~html
<button :class="['topic', {active: flag}]" @click="toggle">toggle</button>
<!--flag为ture 的时候-->
<button class="topic active" @click="toggle">toggle</button>
~~~



#### 2.5. v-bind绑定style

- **注意**：绑定style 的时候**一定要注意样式的格式**，否则出现不可遇见的错误，
  - 规范样式属性值的格式
  - 不要在后面加布尔值

> `CSS property` 名可以用**驼峰式 (camelCase)** 或**短横线分隔 (kebab-case，记得用引号括起来)** 来命名；
>
> - 驼峰式**不用**加引号，短横线**需要**加引号



1. 变量

   ~~~html
   <div class="box" :style="boxStyle"> 这里是box </div>
   ~~~



##### 对象语法

> **注意：要记得区分**，不要和原生的 style 记混，**原生**的是直接添加css属性字符串，**不是对象**

~~~html
<!--这里的size 是变量 不会给变量自动加单位-->
<div class="box" :style="{fontSize: size + 'px'}">这里是box</div>
~~~



##### 数组语法

~~~html
<div class="box" :style="[boxStyle, {fontSize: size + 'px'}]">这里是box</div>
~~~



##### String写法

- **不可以**绑定字符串的样式
- 但是可以使用原生的 `style` 标签，
- `react`中原生的也是不支持的

#### 2.6. v-bind修饰符



## [`.sync` 修饰符](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)

> 2.3.0+ 新增

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```js
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

```html
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

### 3、v-on

> 用来实现 `vue` 中的绑定事件监听

- 绑定事件函数的时候，**可以省略  `()`**；
- 语法糖： `@`

- 非on事件：`$listeners`

#### 动态绑定事件

- `vue` 当中**不能动态绑定事件**



- **也可以用 原生 `JavaScript` 进行事件的动态绑定和取消。**

  > 要在当前组件 **挂载** 到 `vue`上之后**才可以获取 dom节点进行操作**，也就是VNode 转换为真实dom显示到页面上的时候
  >
  > `mounted` 之后，进行手动添加事件



  - **注意**：虽然**可以使用原生的 js 的 Api 进行事件绑定**，但是并**不符合**vue **声明式开发规范**，在修改内容的时候**会和动态绑定的数据产生冲突。**

    > 在开发中**可以使用原生js** 但是**不要使用 querySelector() 进行修改元素内容，**



- **解决方案**：可以使用 vue 内置的 ref 属性

  - `ref` **既**可以获取**原生的 `dom` 元素**，**也**可以**获取组件的实例对象**，通过 `this.$refs` 的方式来实现动态绑定

  - 所以在vue中**没有必要使用 `querySelector`**，`ref`就够用了

    > **提示**：使用 `qureySelector` 添加事件可以，但是不要修改 `mustach` 语法

- ##### 解决方案

  - **动态定义**事件类型，在特定的业务逻辑下**修改事件类型**相当于**取消原有的事件**



#### 3.1、基本绑定-表达式和函数

- `v-on`绑定函数

  ~~~html
      <button @click="btn">toggle</button>
  ~~~



- `v-on`绑定**表达式**

  ~~~html
      <button @click="counter++">toggle</button>
  ~~~



#### 3.2、动态定义事件类型

> 这种方式，只能在加载 `VRdom` 的时候添加，就是在页面加载的时候读取变量添加事件，**加载完之后并不能修改事件类型**。

- 应该还是同理，驼峰转小写，短横线不识别

~~~html
  <div class="box" @[eventvar]="addBox">
      这里是box
    </div>
~~~



#### 3.3、添加多个事件-对象绑定

1. 基本绑定

~~~html
  <div class="box" @mousemove="move" @mousedown="down">
    这里是box
  </div>
~~~



2. 对象绑定

~~~html
  <div class="box" @="{mousedown: down, mousemove: move, mouseup: up}">
    这里是box
  </div>
~~~



#### 3.4、v-on参数传递

1. `v-on`绑定的函数 **不添加() **的时候，默认传入 event 事件对象。
2. 绑定的函数有参或者 **填加()** 的时候，需要**手动传入 `$event`**



#### 3.5、v-on修饰符

- `.stop` ——调用 `event.stopPropagation()`。

- `.prevent` ——调用 `event.preventDefault()`。

- `.capture` ——在捕获模式添加事件监听器。

- `.self` ——只有事件从元素本身发出才触发处理函数。

- `.{keyAlias}` ——只在某些按键下触发处理函数。

- `.once` ——最多触发一次处理函数。

- `.passive` ——默认`false`，如果为`true`的话提前告诉浏览器不会阻止默认行为，不要把 `.passive` 和 `.prevent` 一起使用会触发警告。

  ~~~text
  我们在滑动页面的时候触发了touch相关事件，开发者可以通过preventDefault来阻止滑动行为，浏览器需要等待绑定事件执行完（假设耗时200ms），才知道，“哦～原来你没有阻止默认行为，好的，我马上滚”，这样就导致滑动流畅度上有延迟。

  而passive作用是开发者可以提前告诉浏览器，我不调用preventDefault阻止事件默认行为，浏览器就可以快速生成事件行为，从而提升页面性能。

  在最新的DOM规范中，事件绑定的第三个参数变成了对象：
  target.addEventListener(type, listener[, options]);

  options里传入passive:true就是明确告诉浏览器，该事件不会调用preventDefault来阻止默认滑动行为。
  ~~~




#### 3.6、`$listeners` 封装已有组件事件

> 通过 `v-on` 绑定父组件的事件

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



### 4、v-model

> `v-model` 指令通常在在表单 `input`、`textarea`以及 `select` 元素或者组件属性上创建**双向数据绑定；**

- 它会**根据控件类型自动选取**控件上**正确的属性和方法来更新元素**；
- 但 **`v-model` 本质上不过是语法糖**，它负责**监听用户的input事件来更新数据**，并在某种极端场景下进行一些特殊处理；
- 对绑定空间输入的数据进行双向绑定



#### 4.1、v-model的原理

> 官方有说到

vue2

> 默认绑定的事件是 `input`

- `v-bind` 绑定 `value` 属性的值；
- `v-on` 绑定 `input` 事件监听到函数中，函数会获取最新的值赋值到绑定的属性中；
- 事实上还要复杂



vue3

> 默认绑定的是 `update:moduleValue`



#### 4.1、v-model绑定textarea

~~~html
  <textarea name="figure" id="area" cols="30" rows="10" v-model="message"></textarea>
~~~



#### 4.2、v-model绑定checkbox

1. `checkbox`**单选框**: 绑定到属性中的值是一个 **Boolean**;

2. `checkbox`**多选框**: 绑定到属性中的值是一个 **Array**;

   > **注意**: 多选框当中, **必须明确的绑定一个value值**，**且** v-model **绑定的值**初始化**声明**要是**Array类型**，否则自动转换为Boolean



#### 4.3、v-model绑定radio

> 注意：单选框要进行 name 互斥，虽然 v-model 本身就能实现互斥。

- **v-model 绑定相同的data属性**的时候，会自动互斥

~~~html
<div id="app">
  <label for="man">男
    <input id="man" type="radio" name="man" v-model="sex">
  </label>
  <label for="girl">女
    <input id="girl" type="radio" name="girl" v-model="sex">
  </label>
  {{sex}}
</div>
~~~



#### 4.4、v-model绑定select

> `select` 也分单选和多选两种情况

1. **单选**的时候，会将字符串类型**选中的 value 赋值给 `v-model` 绑定的变量**
2. **多选**的时候  `v-model` **绑定的是一个数组**，保存选中 `value` 的集合。



#### 4.5、v-model修饰符

##### 1.lazy

> 在 `v-model` 后跟上 `lazy` 修饰符，那么会将绑定的事件切换为 `change` 事件，只有在提交时（比如回车）才会触发；



##### 2.number

> 只允许输入 `number` 类型

- 在之前的版本中 `input` 为 `number` 类型获取的也是 `String` 类型的值。
- 现在 `input` 的 `number`类型 和 `v-model.number` 效果一样
- 这个修饰符也可以在别的控件中使用



##### 3.trim

> 作用去除两边空格



#### 4.6、绑定的v-module的常见问题

1. 绑定 `v-for` 中循环的对象的场景，由于你并没有在 `data` 中声明所以**不会绑定成功**；

2. `vue2`在子组件中 `v-model` 绑定 `props` 中的数据时，避免打破单项数据流可使用 `computed` 和 `proxy` 回调 `emit`

   > 由于计算属性只会在重新赋值的情况下会触发set，所以当修改计算属性中的属性值时可以用`proxy`监听

   ~~~js
   computed: {
       attr() {
         return new Proxy(this.field, {
           get(target, p, receiver) {
             return Reflect.get(target, p, receiver)
           },
           set(target, p, newValue, receiver) {
             this.$emit("trigger", {
               ...target,
               [p]: newValue
             })
           }
         })
       }
     }
   ~~~





## 三、条件渲染

> 可以**根据当前的条件**决定某些**元素或组件是否渲染**。



### 1、template元素

> **`template`** 不会渲染到页面上

- **template** 的意义就是用于添加一些指令，或者条件判断

  > **当某些添加指令的元素没有存在意义**的时候可以使用 `template`

- 像小程序中的 **block**



### 2、v-if

> 根据条件判断是否将模板中元素或组件，添加到真实的dom上

- 同样遵循 js 中条件判断的规则

  > 会将条件隐式转换为 `boolean` 类型，进行判断——`undefined`, null, "", 0, NaN.

- v-if  \ v-else \ v-else-if

  ~~~html
  <div id="app">

    <div class="box">
        //if
      <div v-if="infoFlag">
        <template v-for="item in info">
          <div>{{item.movies}} - {{item.price}}</div>
        </template>
      </div>
  	//else if
      <div v-else-if = "bookFlag">
        <template v-for="item in books">
          <div>{{item.bookname}} - {{item.price}}</div>
        </template>
      </div>
  	//else
      <div v-else>
        <span>李四</span>
      </div>

    </div>
  </div>
  ~~~





### 3、v-show

- **重点：v-shwo 不支持tempalte，v-if 是支持的**

~~~html
    <div class="box" v-show="!flag">
      这里是 v-show
    </div>
~~~



### 4、v-show和v-if的区别

1. v-show 只是在元素的样式上面，**添加了 display: none  元素节点依然是存在的**

   > 当页面频繁的进行切换的时候，建议使用v-show

2. **v-show 不支持 template 标签语法**

3. v-if **条件为 false** 会将这个元素节点进行**移除，不会渲染到 dom 上**

   > 用于添加判断展示dom结构，不频繁切换的情况下使用v-if
   >
   > - 其实很容易判断使用场景，**页面加载的时候使用 v-if** 只展示需要的。这样还可以**避免加载不必要的元素，提高下加载速度**
   > - 元素**切换的话就v-show**



### 5、vue2和vue3中v-if的区别

1. vue2 中的 v-if 需要添加key，vue3中不需要，会自动生成

   ~~~html
   <!-- Vue 2.x -->
   <div v-if="condition" key="yes">Yes</div>
   <div v-else key="no">No</div>

   <!-- Vue 3.x -->
   <div v-if="condition">Yes</div>
   <div v-else>No</div>
   ~~~

2. 优先级也改变了，v-if优先级高于v-for



## 四、列表渲染v-for

> v-for类似于 JavaScript 的for循环，用于遍历一组数据，**配合其他指令**生成对应的**元素集合显示到页面上**



- **可以遍历对象，数组，Number类型，可迭代对象**
- 语法： `v-for"item in list"`  和 `v-for = "item of list"` 都是一样的效果
- **多参记得加括号**



#### 1、遍历数组

> 遍历数组的时候，**可以遍历 `元素` 和索引 `index`**

~~~html
  <div id="app">
    <template v-for="(item,index,s) in books">
      <div>{{item}} - {{index}}}}</div>
    </template>
  </div>
~~~



#### 2、遍历对象

> 遍历对象的时候， **可以遍历 value，key，index**

~~~html
    <template v-for="(value, key, index) of info">
      <div>{{value}} - {{key}} - {{index}}</div>
    </template>
~~~



#### 3、遍历Number 和 字符串

> 会**根据 num 数字的大小**，来**决定遍历的次数，**每个 id 是一个数字。字符串遍历字符。

~~~html
  <template v-for="id of num">
    <div>{{id}}</div>
  </template>
~~~



#### 4、虚拟节点VNodes(Virtual Node)

> 整个的 app 元素模板会交由vue处理**解析模板语法**，转换成 render 函数，执行render中的h函数，创建 VNode ，在有Vnode转换成真实的dom元素。



**本质(重要)**：虚拟dom：就是用javaScript对象描述DOM的层次结构，DOM中的一切属性都在VNode中有对应的属性，维护在内存中



- **template ->render-> VNode -> dom**

- **VNode 本质其实就是一个JavaScript对象**。会有 **children 对应子元素**(也是一个VNode），会根据VNode对象嵌套**最终形成一个树结构**

  > 根据template 对应**转换为对象的形式的 VNode**

  ~~~html
  <body>
    <div class="title" style="font-size: 30px; color: red;">哈哈哈</div>
  </body>
  <!--这里将div转换成 javaScript对象-->
  <script>
    const vnode = {
      type: "div",
      props: {
        class: "title",
        style: {
          "font-size": "30px",
          color: "red"
        }
      },
        //根据children 形成嵌套关系
      children: "哈哈哈"
    }
  </script>
  ~~~



- 最后**根据 VNode 对象的信息**，<u>生成真实的dom然后渲染到页面</u>



##### virtual Node 的作用(重点)

1. 方便进行 diff 算法

2. 方便对于**当前所写的代码进行跨平台**

   > 既然能根据 VNode 对象生成浏览器结构的html，**也可以生成其他平台所需要的结构**

   - 例如：
     - 根据 VNode 转换成移动端小程序的 view、image
     - IOS UIButton、UIView
     - 也可转换成 vr的结构
     - 之后在根据原生控件显示到页面上



#### 5、diff算法 v-for中key的作用

> `diff` 算法是发生在虚拟 `dom`上的  ——diffing 就是比较的意思；



- 每次`vue`监听到 `template`，被修改了，都会重新执行当前组件的 `render` 生成新的虚拟`dom`

  - **元素改变**的时候，**虚拟dom**肯定是**改变**的，但是**真实dom只会只更新它需要更新的部分**

  > 当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。运行时渲染器**遍历这棵新树**，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。



- 方便diff算法对比，只需要将不同的元素内容，进行统一批量修改即可

  > 新的`VNode`和老的 `VNode` 进行 `diff` ——精细比较，算出虽小量更新，最后反映到真实的`dom`上。



- vue会做了优化，如果父组件中的数据变化了，子组件没有变化，那么**只会重新生成父组件的 VNode**，其他的组件不会变化。



##### 5.1、render函数

> `template`模板 经过`vue-compile-time`编译之后，会转为 `render()` 函数**会包含对应结构的h函数**。

- **`render`作用**： 是用来执行 h函数的，

- **`h`函数作用**：的只是创建虚拟dom，不会渲染到页面上

- **`patch`** 是diff算法的核心函数，patch 才是让虚拟节点渲染到页面上变成真实的 dom

  > `patch` ——修修补补，不是整个替换，更不是批量的意思

  - 参数一：

    - 会先判断是否是虚拟节点

    > 如果是**真实节点**的话，会转换虚拟节点在进行判断是不是同一个
    >
    > 是**虚拟节点**的话，会进行补丁——修修补补，将不同的进行合并，实现最小量更新

    - 对比key和选择器之后来决定是修改还是替换
    - 创建子节点是需要递归的

  - 参数二：需要挂载的VNode



##### 5.2、有 `key` 值得情况下

> 作用：确定唯一DOM元素，对新老节点进行区分，让diff算法更加高效，
>
> 通过key，进行**新老 VNode 的 key 对比**，当元素改变的时候最大可能得复用相同得节点。

- ##### 触发diff算法的判断条件

  1. 判断条件**选择器**相同**且** `key` 相同，否则暴力更新
  2. 只进行同层比较（显而易见，不同层，选择器就不一致了）
- ##### 知识点

  - 有 `key` 值的情况下，就算是**乱序也会命中**的，也会进行复用的
  - `key` 中如果放入的是 **对象**的话**应该会**转换成**字符串**



##### 没有key值

> 会在**最后面**添加一个元素，之后将指定元素所在位置之后的**所有元素进行修改**，`a->b`，`b->c`，会造成大量的 `DOM` 操作。

- 避免使用数组索引作为 `key`。**因为索引会变的**
- 不能使用 `Symbol()` 因为每次获取的 `Symbol()` 都是不一样的



#### 6、数组更新检测(7个)

> vue 会指定一些修改数组的方法进行侦听，这些方法在改变数组的时候会触发视图的更新

- 注意：不修改原有数组而是**产生新数组的方法**进行调用的时候下**不会触发视图更新**

1. push()
2. pop()
3. shift()
4. unshift()
5. splice()
6. sort()
7. reverse()



#### 7、vue2和vue3中的v-for的区别

1. vue2中的v-for的key不能设置在template标签中要设置在子元素中，**vue3允许设置到template中了**

   ~~~html
   <!-- Vue 2.x -->
   <template v-for="item in list">
     <div :key="item.id">...</div>
     <span :key="item.id">...</span>
   </template>

   <!-- Vue 3.x -->
   <template v-for="item in list" :key="item.id">
     <div>...</div>
     <span>...</span>
   </template>
   ~~~



## 五、Scoped

> `vue scoped`，子组件的**根**节点**依然**受其父组件的CSS 的影响

- 子组件**根节点样式**会受到父组件样式影响，这样设计是为了让父组件可以从**布局的角度**出发，**调整其子组件**根元素的样式
