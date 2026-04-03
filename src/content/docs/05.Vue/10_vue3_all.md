---
title: '一、邂逅Vue.js开发'
---

# 一、邂逅Vue.js开发

## 1.1、认识Vue

* ##### vue的介绍：

  * 一套用于构建用户界面的渐进式 JavaScript框架；
  * 基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型；
  * 渐进式框架：
    - 在项目中一点点来引入和使用Vue，而不一定需要全部使用Vue来开发整个项目；

* ##### 官方对vue3的介绍：

  * 更好的性能；
  * 更小的包体积； （Tree shaking）
    * 按需打包，只有用到的api才会打包，很大程度地减少了开发中的冗余代码，提升编译速度。
  * 更好的TypeScript集成；
  * 更优秀的API设计：
    * Composition函数式开发，很大程度地提高为了组件、业务逻辑的复用性；高度解耦，提高代码质量、开发效率；减少代码体积。



## 1.2、声明式和命令式

- 原生开发和Vue开发的模式和特点，两种不同的编程范式：
  - 原生是命令式编程，命令“机器”如何去做事情 ；
    - 原生JavaScript和jQuery开发；
  - Vue是声明式编程，告诉机器你想要的是什么，让机器来完成过程；
    - Vue、React、Angular、小程序的编程模式；



## 1.3、MVVM模型

* ##### 是一种软件的体系结构；

* MVVM 是一种设计思想，将数据双向绑定作为核心思想。

  * Model：数据层，存储数据及对数据的处理；
  * View：视图层，主要负责数据的展示；
  * ViewModel：业务逻辑层，是一个同步 View 和 Model 的对象，进行数据与 DOM 的绑定。

## 1.4、data属性

* data属性是一个函数，并且该函数需要返回一个对象；

*  data中返回的对象会被Vue的响应式系统劫持，之后对该对象的修改或者访问都会在劫持中被处理；



## 1.5、methods属性

* ##### methods属性是一个对象：

  * 用来定义方法；
  * 方法可以被绑定到模板中；
  * 在方法中，可以使用this关键字来直接访问到data中返回的对象的属性；

* ##### 注：不能使用箭头函数；

  * Vue的源码当中就是对methods中的所有函数进行了遍历，并且使用bind函数将函数的this指向Vue实例上，若使用箭头函数，箭头函数会往上层作用域找this，所以this将不会按照期望指向组件实例；



# 二、Vue基础 – 模板语法

## 1.1、Mustache插值语法

* ##### 把数据显示到模板（template）中；

  * data返回的对象是有添加到Vue的响应式系统中；
  * 当data中的数据发生改变时，对应的内容也会发生更新；
  * 插值语法可以是data方法返回对象的属性、JavaScript的表达式、三元表达式、调用methods中的函数，computed的属性等；
    * 注：不能定义语句（如使用const、if等）

* 如果Vue.createApp方法传入的对象中没有template属性，那么会默认使用id为app的元素作为模板；



## 1.2、了解的指令

* ##### v-once：

  * ```html
    <h2 v-once>why</h2>
    ```

  * 用于指定元素或者组件只渲染一次；

  * 当数据发生变化时，元素或者组件以及其所有的子元素将视为静态内容并且跳过；

  * 该指令可以用于性能优化；

* ##### v-text：

  * ```html
    <h2 v-text="message"></h2>
    ```

  * 用于更新元素的 textContent；

  * 注：

    * 跟插值语法类似，不过插值语法可以插入到原有的文本中，而v-text会把原有的文本给覆盖；
    * 值为表达式；

* ##### v-html：

  * ```html
    <h2 v-html="content"></h2>
    ```

  * 把html字符串作为html来解析；

  * 注：
    * 在`插值语法`和`v-text`中，html字符串只会被当成文本来编译；
    * 也会覆盖元素原有的内容；
    * 值为表达式；

* ##### v-pre：

  * ```html
    <div v-pre>{{ message }}</div>
    ```

  * 用于跳过元素和它的子元素的编译；

    * 不会编译元素中的插值语法；
    * 跳过不需要编译的节点，加快编译的速度；

* ##### v-cloak：（斗篷）

  * 保持在元素上直到关联组件实例编译结束。

  * 和 CSS 规则一起用；

    * 如和 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的`插值语法`标签直到组件实例准备完毕。

    * ```js
      [v-cloak] {
          display: none;
      }

      <div id="app">
          <h2 v-cloak>{{message}}</h2>
      </div>
      //避免把未编译的插值语法标签显式出来；
      ```

* ##### v-memo：

  * 该指令接收一个固定长度的数组作为依赖值进行记忆比对。如果数组中的每个值都和上次渲染的时候相同，则整个该子树的更新会被跳过。

    * ```html
      <div v-memo="[name, age]">
          <h2>{{ name }}</h2>
          <h2>{{ age }}</h2>
          <h2>{{ height }}</h2>
      </div>
      ```

    * 如data返回对象中只有name属性添加到如上的数组中，如果name属性值没变化，即使age有变化也不会再次被渲染；



## 1.3、v-bind的绑定属性

* ##### 用于动态绑定属性；

  * 用于绑定一个或多个属性值，或者向另一个组件传递props值；

* ##### 绑定基本属性：

  * ```js
    //1.绑定img的src属性
    <img v-bind:src="showImgUrl" alt="">
    //语法糖: v-bind
    <img :src="showImgUrl" alt="">

    //2.绑定a的href属性
    <a :href="href">百度一下</a>
    ```



## 1.4、v-bind绑定class属性

* ##### 基本绑定class：

  * ```html
    <h2 :class="classes">Hello World</h2>
    ```

* ##### 三元表达式绑定class：

  * ```html
    <button :class=" isActive ? 'active': '' " @click="btnClick">我是按钮</button>
    ```

* ##### 对象语法的基本使用(掌握)：

  * ```html
    <button :class="{ active: isActive }" @click="btnClick">我是按钮</button>
    ```

  * 注：

    * 对象里的key代表要添加或移除的class，为字符串类型，若key要使用响应式数据，则要使用`[]`;
    * value为布尔值，true为添加，false为移除；

* ##### 对象语法的多个键值对写法：

  * ```html
    <button :class="{ active: isActive, why: true, kobe: false }" @click="btnClick">我是按钮</button>
    ```

* ##### 动态绑定的class是可以和普通的class同时的使用：

  * ```html
    <button class="abc cba" :class="{ active: isActive, why: true, kobe: false }" @click="btnClick">我是按钮</button>
    ```

  * 绑定的class可以是调用methods中的函数：

    * ```html
      <button class="abc cba" :class="getDynamicClasses()" @click="btnClick">我是按钮</button>

      getDynamicClasses: function() {
          return { active: this.isActive, why: true, kobe: false }
      }
      ```

  * 注：class不会覆盖；

* ##### 数组语法的使用(了解)：

  * ```html
    <h2 :class="['abc', className]">Hello Array</h2>

    //可以是三元表达式
    <h2 :class="['abc', className, isActive? 'active': '']">Hello Array</h2>

    //跟对象结合使用
    <h2 :class="['abc', className, { active: isActive }]">Hello Array</h2>
    ```



## 1.5、v-bind绑定style属性

* ##### style的对象语法：

  * ```html
    <h2 :style="{ color: fontColor, fontSize: fontSize + 'px' }">哈哈哈哈</h2>
    ```

  * 属性名可以用驼峰式或短横线分隔 (用引号括起来)来命名；

  * 对象里的属性为css属性；

  * 若要往css属性插入响应式数据，需要使用对象语法。

    * ```js
      <h2 :style="color: redcolor" >  //报错，错误写法；
      ```

  * key的类型默认是字符串，若key要使用响应式数据，则要使用`[]`；

* ##### style的数组语法：

  * 可以将多个样式对象应用到同一个元素上；

    * ```html
      <h2 :style="[objStyle, { backgroundColor: 'purple' }]">嘿嘿嘿嘿</h2>

      data: function() {
      	return {
      		objStyle: {
      			fontSize: '50px',
      			color: "green"
      		}
      	}
      },
      ```

  * 数组元素为字符串写法：

    * ```html
      <h2 :style="['color: red; fontSize: 50px']">{{message}}</h2>
      ```



## 1.6、动态绑定属性名

* 在某些情况下，属性的名称可能也不是固定的：

  * 可以使用`:[属性名]=“值”` 的格式来定义；

  * ```html
    <h2 :[name]="message">Hello World</h2>
    ```



## 1.7、绑定一个对象

* 将一个对象的所有属性，绑定到元素上作为元素的属性；

  * 使用 v-bind 绑定一个对象；

  * ```html
    <h2 :="infos">Hello Bind</h2>

    data() {
        return {
            infos: { name: "why", age: 18, height: 1.88, address: "广州市" },
        }
    }
    ```

## 1.8、v-on绑定事件

### 1.8.1、v-on用法

* ##### 基本写法：

  - ```html
    <div class="box" v-on:click="divClick"></div>
    ```

* ##### 语法糖写法(重点掌握)：

  - ```html
    <div class="box" @click="divClick"></div>
    ```

* ##### 可以绑定表达式(不常用, 不推荐)：

  - ```html
    <button @click="counter++">+1</button>
    ```

* ##### 绑定其他方法(掌握)：

  - ```js
    <div class="box" @mousemove="divMousemove"></div>
    ```

* ##### 元素绑定多个事件(掌握)：

  * `{ 事件：回调函数 }`；

  * ```js
    <div class="box" @click="divClick" @mousemove="divMousemove"></div>

    <div class="box" @="{ click: divClick, mousemove: divMousemove }"></div>
    ```



### 1.8.2、v-on参数传递

* ##### 若方法不需要额外参数，那么方法后的()可以不添加；

  * ```html
    <button @click="btn1Click">按钮1</button>
    ```

* ##### 没有传递任何的参数, 那么event对象会被默认传递进来；

  * ```html
    <button @click="btn1Click">按钮1</button>

    btn1Click(event) {
    	console.log("btn1Click:", event)
    },
    ```

* ##### 如果需要传入某个参数，同时需要event时，可以通过$event传入event对象；

  * ```html
    <button @click="btn3Click('why', age, $event)">

    btn3Click(name, age, event) {
        console.log("btn3Click:", name, age, event)
    }
    ```



### 1.8.3、v-on的修饰符

* ##### 修饰符相当于对事件进行了一些特殊的处理；

* ##### 如`.stop`：

  * ```html
    <button @click.stop="btnClick">按钮</button>
    ```

## 1.9、条件渲染

* ##### 使用方法：

  * ##### v-if：

    - ```html
      <div v-if=""></div>
      ```

  * ##### v-else：

    * ```html
      <div v-else></div>
      ```

  * ##### v-else-if：

    * ```html
      <h1 v-if="score > 90">优秀</h1>
      <h2 v-else-if="score > 80">良好</h2>
      <h3 v-else-if="score >= 60">及格</h3>
      <h4 v-else>不及格</h4>
      ```

* ##### v-if的渲染原理：

  * v-if是惰性的；
  * 当条件为false时，其判断的内容完全不会被渲染或者会被销毁掉；
  * 当条件为true时，才会真正渲染条件块中的内容；

* ##### v-show：

  * v-show和v-if的用法看起来是一致的，也是根据一个条件决定是否显示元素或者组件；

  * ```html
    <div v-show="isShowCode">
    ```

* ##### v-show和v-if的区别：

  * ##### 用法上的区别：

    - v-show是不支持template；
    - v-show不可以和v-else一起使用；

  * ##### 本质的区别：

    - v-show元素无论是否需要显示到浏览器上，它的DOM实际都是有存在的，只是通过CSS的display属性来进行切换；
    - v-if当条件为false时，其对应的DOM元素会被销毁，不会被渲染到页面中；

  * #####  如何选择：

    - 如果元素需要在显示和隐藏之间频繁的切换，那么使用v-show；
    - 如果不会频繁的发生切换，那么使用v-if；



## 2.0、template元素

* ##### template元素可以当做不可见的包裹元素，并且在v-if、v-for上使用，但是最终template元素不会被渲染出来；

* ```vue
  <template v-if="Object.keys(info).length">
      <div>姓名: {{info.name}}</div>
  	<div>年龄: {{info.age}}</div>
  </template>
  ```

# 三、模板语法(二) – 列表渲染

## 1.1、v-for遍历数组

* ##### 基本格式：

  * ```html
    <li v-for="movie in movies">{{ movie }}</li>
    ```

  * `item in 数组`；

  * item可以自定义别名；

* ##### 获取索引：

  * ```html
    <li v-for="(movie, index) in movies">{{ index + '' + movie }}</li>
    ```

  * `(item, index) in 数组`

* ##### 注：vue3开始也可以使用of，跟in的效果一样；



## 1.2、v-for支持的类型

* ##### 支持的其他类型：

  * ##### v-for也支持遍历对象：

    - 一共有三个参数；

    - ```html
      <li v-for="(value, key, index) in info">{{value}}-{{key}}-{{index}}</li>
      ```

  * ##### 遍历字符串：

    - ```html
      <li v-for="item in "Hello Vue"">{{item}}</li>
      ```

  * ##### v-for同时也支持数字的遍历：

    - ```html
      <li v-for="item in 100">{{item}}</li>  //1~100
      ```

* ##### 注：v-for也可以遍历其他可迭代对象(Iterable)；



## 1.3、template元素

* ##### 使用 template 元素来循环渲染一段包含多个元素的内容

* ```vue
  <template>
  	<ul>
          <template v-for="(value, key) in info">
              <li>{{key}}</li>
              <li>{{value}}</li>
          </template>
      </ul>
  </template>
  ```



## 1.4、数组更新检测

* ##### Vue将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。

* ##### 被包裹过的方法包括：

  * push()
  * pop()
  * shift()
  * unshift()
  * splice()
  * sort()
  * reverse()

* ##### 注：都是会修改原数组的方法；

* 当使用非变更方法时，可以用新数组替换旧数组；



## 1.5、VNode和虚拟DOM

* ##### VNode是虚拟节点；

  * 无论是组件还是元素，它们最终在Vue中表示出来的都是一个个VNode；
  * VNode的本质是一个JavaScript的对象；
    * children关联的是该虚拟节点的子节点或内容；

* ##### 虚拟DOM：

  * 多个VNode的嵌套形成VNode Tree，这个VNode Tree就是虚拟DOM；

* ##### 虚拟DOM的作用：

  * 方便进行diff算法；
  * 虚拟DOM作用之一：跨平台；


## 1.6、v-for中的key

- ##### key的作用：

  - 主要用做 Vue 的虚拟 DOM 算法的提示，以在比对新旧节点组时辨识 VNodes。
  - 如果不使用 key，Vue 会使用一种算法来最小化元素的移动并且尽可能尝试就地修改/复用相同类型元素。
  - 而使用 key 时，它会基于 key 的顺序变化重新排列元素，并且那些使用了已经不存在的 key 的元素将会被移除/销毁。

- ##### 注：有相同父元素的子元素必须有唯一的 key。重复的 key 会造成渲染错误。

  - ```html
    <!-- key要求是唯一: id -->
    <li v-for="item in letters" :key="item">{{item}}</li>
    ```



## 1.7、插入f的案例

* ```html
  <button @click="insertF">插入f</button>
  <ul>
      <!-- key要求是唯一: id -->
      <li v-for="item in letters" :key="item">{{item}}</li>
  </ul>

  data() {
      return {
      	letters: ["a", "b", "c", "d", "e"]
      }
  },
  methods: {
  	insertF() {
  		this.letters.splice(2, 0, "f")
  	}
  }
  ```

* ##### 没有key的diff算法：

  * 使用diff算法的 patchUnkeyedChildren方法；

* ##### 有key的diff算法如下：

  * ##### 第一步的操作是从头开始进行遍历、比较：

    * a和b是一致的会继续进行比较；
    * c和f因为key不一致，所以就会break跳出循环；

  * ##### 第二步的操作是从尾部开始进行遍历、比较：


  * ##### 第三步是如果旧节点遍历完毕，但是依然有新的节点，那么就新增节点：


  * ##### 第四步是如果新的节点遍历完毕，但是依然有旧的节点，那么就移除旧节点：


  * ##### 第五步是最特色的情况，中间还有很多未知的或者乱序的节点：


* ##### 总的来说：

  * 在没有key的时候效率是非常低效的；
  * 在进行插入或者重置顺序的时候，保持相同的key可以让diff算法更加的高效；



# 四、其他Options API

## 1.1、复杂data的处理方式

* ##### 复杂data：

  * 显示前需要进行转化的数据，或者需要与其他数据结合起来的数据；

* ##### 在插值语法中使用表达式处理的缺点：

  * 表达式写法设计的初衷是用于简单的运算；
  * 太多的逻辑会让模板阅读性差和难以维护；
  * 在多个地方使用时，代码无法复用；
  * 多次使用的时候，很多运算也需要多次执行，没有缓存；

* ##### 将逻辑抽取到一个method中处理的缺点：

  * 当模板多处使用到数据时，函数会被调用多次；
  * 多次使用方法的时候，没有缓存，也需要多次计算；

* ##### 计算属性处理：

  * 计算属性具有缓存；
    * 计算属性会基于它们的依赖关系进行缓存；
    * 在数据不发生变化时，计算属性是不需要重新计算的；
    * 但是如果依赖的数据发生变化，在使用时，计算属性依然会重新进行计算；



## 1.2、计算属性computed

* ##### 对于任何包含响应式数据的复杂逻辑，都应该使用计算属性；

* ##### 计算属性的用法：

  * ```js
    <h2>{{ fullname }}</h2>

    const app = Vue.createApp({
    	data() {
    		return {
    			firstName: "kobe",
              	lastName: "bryant",
    		}
    	},
    	computed: {
            // 1.计算属性默认对应的是一个函数，相当于对象写法的getter,只能读不能写；
            fullname() {
              return this.firstName + " " + this.lastName
            }

    		// 完整写法：（了解）
            //在大多数情况下，只需要一个getter方法即可
            fullname: {
              get: function() {
                return this.firstname + " " + this.lastname
              },
              set: function(value) {
                const names = value.split(" ")
                this.firstname = names[0]
                this.lastname = names[1]
              }
            }
    	},
        methods: {
            setFullname() {
                this.fullname = "kobe bryant"
            }
        }
    })
    ```



## 1.3、侦听器watch

* ##### 用于在代码逻辑中监听某个数据的变化；

* ##### 侦听器的用法：

  * ```js
    <button @click="changeMessage">修改message</button>

    const app = Vue.createApp({
        // data: option api
        data() {
            return {
                message: "Hello Vue",
                info: { name: "why", age: 18 }
            }
        },
        methods: {
            changeMessage() {
                this.message = "你好啊, 李银河!"
                this.info = { name: "kobe" }
            }
        },
        watch: {
            // 1.默认有两个参数: newValue/oldValue
            message(newValue, oldValue) {
                console.log(newValue, oldValue)
                //你好啊, 李银河! Hello Vue
            },
            info(newValue, oldValue) {
                // 2.如果是对象类型, 那么拿到的是代理对象
                console.log( newValue, oldValue)
                //Proxy {name: 'kobe'} Proxy {name: 'why', age: 18}

                // 3.获取原生对象
                // console.log({ ...newValue })
                console.log(Vue.toRaw(newValue))
            }
        }
    })
    ```

* ##### 侦听器watch的配置选项：

  * deep选项：

    * 默认情况下，watch只是在侦听info的引用变化，对于内部属性的变化是不会做出响应；
    * 可以使用选项deep进行深层侦听；

  * immediate选项：

    * 一开始的就会立即执行一次，无论数据是否有变化；

  * ```js
    watch: {
        // 进行深度监听
        info: {
            handler(newValue, oldValue) {
                console.log("侦听到info改变:", newValue, oldValue)
            },
            // 监听器选项:
            // info进行深度监听
            deep: true,
            // 第一次渲染直接执行一次监听器
            immediate: true
        },
    }
    ```

* ##### 监听对象的某个属性：

  * ```js
    watch: {
        "info.name"(newValue, oldValue) {
            console.log("name发生改变:", newValue, oldValue)
        }
    }
    ```

* ##### 使用 $watch 的API：

  * ```js
    // 生命周期回调函数: 当前的组件被创建时自动执行
    created() {
        this.$watch("message", (newValue, oldValue) => {
            console.log("message数据变化:", newValue, oldValue)
        }, { deep: true, immediate: true })
    }
    ```



## 1.4、与计算属性的区别

1. 支持异步操作，计算属性不支持异步操作
2. 计算属性有缓存，且不能修改
3. 一个是监听值的变化，一个是根据收集依赖的变化才变化



## 1.4、综合案例

* ```html
  <div id="app">
      <template v-if="books.length">
          <table>
              <tr>
                  <th>序号</th>
                  <th>书籍名称</th>
                  <th>出版日期</th>
                  <th>价格</th>
                  <th>购买数量</th>
                  <th>操作</th>
              </tr>
              //toggol形式给选中的tr添加背景，其他则清除背景；（:class）
              <tr v-for="(item, index) in books" :key="item.id" @click="changeCss(index)" :class="{active: currentIndex === index}">
                  <td>{{ index }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ formatData(item.price) }}</td>
                  <td>
                      <button :disabled="item.count <= 1" @click="item.count--">-</button>
                      {{item.count}}
                      <button @click="item.count++">+</button>
                  </td>
                  <td>
                      <button @click.stop="deleteData(index)">移除</button>
                  </td>
              </tr>
          </table>
          <h2>总价：{{formatData(total)}}</h2>
      </template>
      <template v-else>
          <div>无数据</div>
      </template>
  </div>

  <script src="../lib/vue.js"></script>
  <script src="./data/data.js"></script>
  <script>
      const app = Vue.createApp({
          data() {
              return {
                  books,
                  // 切换背景使用的变量
                  currentIndex: -1
              }
          },
          computed: {
              total() {
                  return this.books.reduce((preValue, item) => {
                      return preValue += item.price * item.count
                  }, 0)
              }
          },
          methods: {
              formatData(price) {
                  return "￥" + price
              },
              deleteData(index) {
                  this.books.splice(index, 1)
              },
              changeCss(index) {
                  this.currentIndex = index
              }
          }
      })
      app.mount("#app")
  </script>
  ```



# 五、Vue基础 – v-model表单

## 1.1、v-model

* ##### 双向绑定：

  * 用户在视图（View）层触发更改时能让数据模型（Model）检测到其更新并发生变化，同时数据模型（Model）层对数据的改变也能实时更新到视图层。

* ##### v-model：

  * v-model指令可以在表单 input、textarea以及select元素上创建双向数据绑定；
  * 根据控件类型自动选取正确的方法来更新元素；

  - v-model 本质上是语法糖，负责监听用户的输入事件来更新数据；

* ##### v-model的原理：

  * v-bind绑定value属性的值；
  * v-on绑定input事件，从事件的event对象中获取最新的value值，并赋值给value绑定的响应式数据；

* ##### 双向绑定的实现：

  * ##### 手动实现双向绑定：

    * ```html
      <input type="text" :value="message" @input="message = $event.target.value">
      ```

  * ##### v-model实现双向绑定：

    * ```html
      <input type="text" v-model="message">
      ```



## 1.2、v-model绑定textarea

* ```html
  <textarea cols="30" rows="10" v-model="content"></textarea>
  ```



## 1.3、v-model绑定checkbox

* ##### 单个勾选框：

  * v-model即为布尔值。

  * 此时input的value属性并不影响v-model的值。

  * ```html
    <label for="agree">
        <input id="agree" type="checkbox" v-model="isAgree"> 同意协议
    </label>

    data() {
    	return {
    		isAgree: true
    	}
    }
    ```

* ##### 多个复选框：

  * 当是多个复选框时，因为可以选中多个，所以v-model绑定的响应式数据是一个数组。

  * 当选中某一个时，就会将input的value添加到数组中。

  * ```html
    <div class="hobbies">
        <h2>请选择你的爱好:</h2>
        <label for="sing">
            <input id="sing" type="checkbox" v-model="hobbies" value="sing"> 唱
        </label>
        <label for="jump">
            <input id="jump" type="checkbox" v-model="hobbies" value="jump"> 跳
        </label>
        <h2>爱好: {{hobbies}}</h2>   //[ "sing", "jump" ]
    </div>

    data() {
    	return {
    		hobbies: []
    	}
    }
    ```

* ##### 注：

  * 是否受value的影响，是根据v-model绑定的响应式数据的类型来决定的；
  * 单勾选框的v-model也能使用数组来获取选中的勾选框的value值；
  * 多个相关联的checkbox正常来说需要使用相同的name属性关联起来，但是v-model已经对其进行了处理，因此不需要设置name属性；



## 1.4、v-model绑定radio

* 当选中某一个时，就会将input的value赋值给`v-model`绑定的响应式数据。

* ```html
  <div class="gender">
      <label for="male">
          <input id="male" type="radio" v-model="gender" value="male"> 男
      </label>
      <label for="female">
          <input id="female" type="radio" v-model="gender" value="female"> 女
      </label>
          //多个input的v-model绑定同一个响应式数据时也就代表以往所需设置的name相同；
      <h2>性别: {{gender}}</h2>
  </div>

  data() {
      return {
      	gender: "female"   //对应一个字符串
      }
  },
  ```



## 1.5、v-model绑定select

* ##### select也分单选和多选两种情况：

  * ##### 单选：只能选中一个值：

    * v-model绑定的是一个值；

    * 当选中option中的一个时，会将它对应的value赋值到`v-model`对应的响应式数据中；

    * ```html
      <select v-model="fruit">
          <option value="apple">苹果</option>
          <option value="orange">橘子</option>
          <option value="banana">香蕉</option>
      </select>
      <h2>单选: {{fruit}}</h2>

      data() {
          return {
              fruit: "orange"
          }
      },
      ```

  * ##### 多选：可以选中多个值：

    * v-model绑定的是一个数组；

    * 当选中多个值时，就会将选中的option的value值添加到数组中；

    * ```html
      <select multiple size="3" v-model="fruits">
          <option value="apple">苹果</option>
          <option value="orange">橘子</option>
          <option value="banana">香蕉</option>
      </select>
      <h2>多选: {{fruits}}</h2>

      data() {
          return {
              fruits: []
          }
      },
      ```



## 1.6、v-model的值绑定

* 将请求到的数据绑定到data返回的对象中，再通过v-bind来进行值的绑定，这个过程就是值绑定。



## 1.7、v-model修饰符

* ##### lazy：

  * 默认情况下，v-model在进行双向绑定时，绑定的是input事件，那么会在每次内容输入后就将最新的值和绑定的响应式数据进行同步；

  * 如果在v-model后跟上lazy修饰符，那么会将绑定的事件切换为 change 事件，只有在提交时（比如回车）或失去焦点时才会触发；

  * ```html
    <input type="text" v-model.lazy="message">
    ```

* ##### number：

  * 将内容转换成数字类型；

  * ```html
    <input type="text" v-model.number="counter">
    ```

* ##### trim：

  * 去除首尾的空格；

  * ```html
    <input type="text" v-model.trim="content">
    ```

* ##### 使用多个修饰符：

  * ```html
    <input type="text" v-model.lazy.trim="content">
    ```



# 六、Vue组件化基础 - 脚手架

## 1.1、Vue的组件化

* ##### Vue组件化：

  * createApp函数传入了一个对象App，这个对象其实本质上就是一个组件，也是应用程序的根组件；
  * 组件化提供了一种抽象，使得可以开发出一个个独立可复用的小组件来构造应用；
  * 任何的应用都会被抽象成一颗组件树；



## 1.2、注册组件的方式

* ##### 注册组件分成两种：

  * 全局组件：在任何其他的组件中都可以使用的组件；
  * 局部组件：只有在注册的组件中才能使用的组件；



### 1.2.1、注册全局组件

* ##### 注册全局组件：

  * 使用全局创建的`app对象`的`component方法`来注册组件；
  * `component方法`传入组件名称、组件对象即可注册一个全局组件了，组件本身也可以有自己的代码逻辑；
  * 可以在任何组件的template中使用这个全局组件；

* ##### 缺点：

  * 类似于webpack这种打包工具在打包项目时，对于没有使用到的全局组件依然会对其进行打包；

* ##### 注册和使用过程：

  * ```html
    <div id="app">
        <!-- <home-nav></home-nav> -->
        <HomeNav></HomeNav> // 在vue脚手架中可以使用，普通运行不了
        <home-nav></home-nav>

        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
    </div>

    <template id="nav">
        <h2>我是应用程序的导航</h2>
    </template>

    <template id="product">
        <div class="product">
            <h2>{{title}}</h2>
            <p>商品描述, 限时折扣, 赶紧抢购</p>
            <p>价格: {{price}}</p>
            <button @click="favarItem">收藏</button>
        </div>
    </template>

    <script src="../lib/vue.js"></script>
    <script>
        // 1.创建app
        const app = Vue.createApp({
            // data: option api
            data() {
                return {
                    message: "Hello Vue"
                }
            },
        })

        // 2.注册全局组件
        app.component("product-item", {
            template: "#product",
            data() {
                return {
                    title: "我是商品Item",
                    price: 9.9
                }
            },
            methods: {
                favarItem() {
                    console.log("收藏了当前的item")
                }
            }
        })

        app.component("HomeNav", {
            template: "#nav"
        })

        // 2.挂载app
        app.mount("#app")
    </script>
    ```



### 1.2.2、注册局部组件（开发中使用较多）

* ##### 注册局部组件：

  * 通过components属性选项来进行注册；
  * 该components选项对应的是一个对象，对象中的键值对是组件的名称: 组件对象；

* ##### 注册和使用过程：

  * ```html
    <div id="app">
        <product-item></product-item>
    </div>

    <template id="product">
        <div class="product">
            <h2>{{title}}</h2>
            <p>商品描述, 限时折扣, 赶紧抢购</p>
            <p>价格: {{price}}</p>
            <button>收藏</button>
        </div>
    </template>

    <script src="../lib/vue.js"></script>
    <script>
        // 1.1.组件打算在哪里被使用
        const app = Vue.createApp({
            // components: option api
            components: {
                ProductItem: {
                    template: "#product",
                    data() {
                        return {
                            title: "我是product的title",
                            price: 9.9
                        }
                    }
                }
            },
            // data: option api
            data() {
                return {
                    message: "Hello Vue"
                }
            }
        })

        // 2.挂载app
        app.mount("#app")
    </script>
    ```




### 1.2.3、定义组件名的方式有两种：

* 短横线分割符：`kebab-case`；
* 大驼峰：`PascalCase`；



### 1.2.4、Vue的开发模式

* ##### 组件化开发：

  * 每个组件都会有自己的模板、脚本逻辑、样式等，它们会共同作为一个整体；
  * 有自己的作用域，不容易出现变量命名冲突的问题；

* ##### 在真实开发中，可以通过一个后缀名为 .vue的single-file components (单文件组件)来解决，并且可以使用webpack或者vite或者rollup等构建工具来对其进行处理。

* ##### 单文件的特点：

  * 代码的高亮；
  * ES6、CommonJS的模块化能力；
  * 组件作用域的CSS；
  * 可以使用预处理器来构建更加丰富的组件，比如TypeScript、Babel、Less、Sass等；

* ##### 注：想要支持单文件可以使用Vue CLI来创建项目；



## 1.3、Vue CLI 安装和使用

* ##### 安装Vue CLI：

  * `npm install @vue/cli -g`

* ##### 升级Vue CLI：

  * `npm update @vue/cli -g `

* ##### 通过Vue的命令来创建项目：

  * `Vue create 项目的名称`

* ##### 注：

  * Vue CLI：用于快速构建vue开发环境和配置的一个工具；

* ##### 更改vue中使用的包管理工具的操作：

  * 命令：`vi ~/.vuerc`；
  * 按i键-->进入编辑模式；
  * 修改包管理工具；
  * 按Esc键退出编辑模式；
  * `shift+；`，再输入wq，按回车键，完成修改；



## 1.4、项目的目录结构

* ##### jsconfig.json的作用：

  * 给VSCode来进行读取, VSCode在读取到其中的内容时, 给我们的代码更加友好的提示；



## 1.5、vue不同版本的作用

* 在使用vue-cli创建的项目的main.js文件里：
  * 使用`import {createApp} from "vue"`引入的vue是有runtime，是会解析处理.vue文件的，里面已经配置好vue-loader用来解析.vue文件的template元素；
  * 若在main.js文件里在组件对象里使用template属性，main.js不是.vue文件，只有runtime是不会对template属性进行处理，所以需要导入`import {createApp} from "vue/dist/vue.esm-bundler"` ，其内部具有runtime和compile，compile用于解析处理模板template属性；



# 七、组件化 – 组件间通信

## 1.1、组件的嵌套和拆分

## 1.2、父子组件之间通信的方式

* ##### 父子组件之间进行通信：

  * 父组件传递给子组件：通过`props`属性；
  * 子组件传递给父组件：通过`$emit`触发事件；

## 1.3、父组件传递给子组件

* ##### 父子组件之间通信：

  * 通过props来完成组件之间的通信；

* ##### Props：

  * Props是在父组件上注册的一些自定义的attribute；
  * 父组件给这些attribute赋值，子组件通过attribute的名称获取到对应的值；

* ##### Props两种常见的写法：

  * 字符串元素的数组，数组中的字符串就是attribute的名称；
  * 对象类型，对象类型可以在指定attribute名称的同时，指定它需要传递的类型、是否必须传、默认值等等；（必须和默认值二选一）

* ##### 示例：

  * App.vue（父组件）：

    * ```vue
      <show-info name="kobe" :age="30" />
      ```

  * ShowInfo.vue（子组件）：

    * ```js
      export default {
      	// 作用: 接收父组件传递过来的属性
          // 1.props数组语法
          // 弊端: 1> 不能对类型进行验证 2.没有默认值的
          props: ["name", "age", "height"]

          // 2.props对象语法(必须掌握)
          props: {
            name: {
              type: String,
              default: "我是默认name"  // 默认值
            },
            age: {
              type: Number,
              required: true   // 必须传递
            }
      	  // 重要的原则: 对象类型写默认值时, 需要编写default的函数, 函数返回默认值；（数组一样）
      	  friend: {
              type: Object,
              default: () => ({ name: "james" })
            }
      	}

          // 3.补：这种写法也可以
          props: {
              name: String
          }
      }
      ```

* ##### type的类型：


* ##### Prop 的大小写命名：

  * attribute 名是大小写不敏感；
  * 驼峰命名法等价于短横线分隔命名；



## 1.4、非Prop的Attribute

* ##### 非Prop的Attribute：

  * 当传递给一个组件某个属性，但是该属性并没有定义对应的props或者emits时，就称之为`非Prop的Attribute`；

* ##### Attribute继承：

  * 当组件有单个根节点时，非Prop的Attribute将自动添加到根节点的Attribute中；

* #####  禁用Attribute继承：

  * 如果不希望组件的根元素继承attribute，可以在组件中设置：

    * ```js
      export default {
          inheritAttrs: false
      }
      ```

  * 可以通过`$attrs`来访问所有的`非props的attribute`；

    * ```vue
      <div class="others" v-bind="$attrs"></div>
      ```

* ##### 多个根节点的attribute：

  * 多个根节点的attribute如果没有显示的绑定，那么会报警告，所以必须指定其中一个节点：

  *  ```vue
    <h2 :class="$attrs.class">姓名: {{ name }}</h2>
    <h2>年龄: {{ age }}</h2>
    <h2>身高: {{ height }}</h2>
    ```



## 1.5、子组件传递给父组件

* ##### 操作步骤：(自定义事件的流程)

  * 在子组件中定义好在某些情况下触发的事件名称，同时可传入参数；
  * 在父组件中以v-on的方式传入要监听的事件名称，并且绑定到对应的方法中；
  *  在子组件中发生某个事件的时候，父组件根据事件名称触发对应的事件，同时获取到参数；

* ##### 实例：

  * 子组件：

    * ```js
      this.$emit("add", 100)
      ```

  * 父组件：

    * ```js
      <add-counter @add="addBtnClick"></add-counter>

      addBtnClick(count) {  //count = 100
          this.counter += count
      },
      ```

* ##### emits：

  * 用来定义一个组件可以向其父组件触发的事件。

  * 便于查看组件有哪些自定义事件；

  * ```js
    export default {
        // 1.emits数组语法
        emits: ["add"]

        // 2.emits对象语法，以对传递的参数进行验证
        emits: {
          add: function(count) {
            if (count <= 10) {
              return true
            }
            return false
          }
        }
    }
    ```



## 1.6、综合案例

* ##### 父组件：（App.vue）

  * ```vue
    <template>
      <div class="app">
        <!-- 1.tab-control -->
        <tab-control :titles="['衣服', '鞋子', '裤子']" @tab-item-click="tabItemClick"/>

        <!-- 2.展示内容 -->
        <h1>{{ pageContents[currentIndex] }}</h1>
      </div>
    </template>

    <script>
      import TabControl from './TabControl.vue'

      export default {
        components: {
          TabControl
        },
        data() {
          return {
            pageContents: [ "衣服列表", "鞋子列表", "裤子列表" ],
            currentIndex: 0
          }
        },
        methods: {
          tabItemClick(index) {
            this.currentIndex = index
          }
        }
      }
    </script>

    <style scoped>
    </style>
    ```

* 子组件：（TabControl.vue）

  * ```vue
    <template>
      <div class="tab-control">
        <template v-for="(item, index) in titles" :key="item">
          <div class="tab-control-item"
               :class="{ active: index === currentIndex }"
               @click="itemClick(index)">
            <span>{{ item }}</span>
          </div>
        </template>
      </div>
    </template>

    <script>
      export default {
        props: {
          titles: {
            type: Array,
            default: () => []
          }
        },
        data() {
          return {
            currentIndex: 0
          }
        },
        emits: ["tabItemClick"],
        methods: {
          itemClick(index) {
            this.currentIndex = index
            this.$emit("tabItemClick", index)
          }
        }
      }
    </script>
    ```



# 八、Vue组件化 - 插槽Slot/非父子通信

## 1.1、插槽Slot

* ##### 作用：

  * 让组件具备更强的通用性；
  * 自主决定使用导入组件的某一块区域存放的内容和元素；

* ##### 定义方式：

  * 抽取共性、预留不同；
  * 共同的元素、内容依然在组件内进行封装；
  * 将不同的元素使用slot作为占位，插槽插入什么内容取决于父组件；

## 1.2、插槽基本使用

* ##### 示例：

  * 父组件：（App.vue）

    - ```vue
      <show-message>
          <button>我是按钮元素</button>
      </show-message>
      ```

  * 子组件：（ShowMessage.vue）

    * ```vue
      <template>
      	<slot></slot>

          // 插槽的默认内容写法
          <slot>
              <p>我是默认内容, 哈哈哈</p>
          </slot>
      </template>
      ```

* ##### 多个插槽：

  * 一个组件中含有多个插槽，默认情况下每个插槽都会获取到插入的所有内容来显示；



## 1.3、具名插槽

* 给插槽起一个名字，`<slot> `元素有一个特殊的`attribute：name`；

* 一个不带 name 的slot，会带有隐含的名字 default；

* 注：可以实现多个插槽与插入内容一一对应的效果；

* ##### 示例：

  * 父组件：(App.vue)

    * ```vue
      <template>
      	<nav-bar>
          	<template v-slot:left>
                  <button>{{ leftText }}</button>
              </template>

              <!-- 简写，字符#替换(v-slot:) -->
              <template #left>
                  <button>{{ leftText }}</button>
              </template>
          </nav-bar>
      </template>
      ```

  * 子组件：（NavBar.vue）

    * ```vue
      <slot name="left">left</slot>
      ```

* ##### 动态插槽名：

  * ```vue
    <template v-slot:[name]>   //简写#[name]
    	<button>{{ leftText }}</button>
    </template>
    ```



## 1.4、作用域插槽

* ##### 渲染作用域：

  * 父级模板里的所有内容都是在父级作用域中编译的；
  * 子模板里的所有内容都是在子作用域中编译的；
  * 如：默认情况下，父组件模板里使用插值语法往子组件插槽插入内容，插值语法里的变量对应的是父组件的响应式数据；

* ##### 作用域插槽：

  * 在父组件模板里往子组件插槽插入内容时，使插入内容可以使用子组件的数据；

* ##### 示例：

  * 父组件：（App.vue）

    * ```vue
      <tab-control>
          <!-- props表示子组件<slot>元素内的所有Attribute组成的对象；-->
          <template v-slot:default="props">  <!-- #default="props" -->
              <button>{{ props.item }}</button>
          </template>

          <!-- 独占默认插槽的缩写：-->
          <!-- 1.只有一个默认插槽时，可以省去default；可同时存在其他插槽；-->
          <template v-slot="props">  <!-- #="props" -->
              <button>{{ props.item }}</button>
          </template>
      </tab-control>

      <!-- 独占默认插槽的缩写： -->
      <!-- 2.如果只有一个默认插槽，且不可存在其他插槽时, 那么template可以省略，而v-slot写在子组件元素上；-->
      <tab-control v-slot="props">
            <button>{{ props.item }}</button>
      </tab-control>
      ```

  * 子组件：（TabControl.vue)

    * ```vue
      <slot :item="item" abc="cba">
          <span>{{ item }}</span>
      </slot>
      ```

* ##### 默认插槽和具名插槽混合：

  * 如果同时有默认插槽和具名插槽，那么按照完整的template来编写；



## 1.5、非父子组件的通信

* ##### 两种方式：

  * 全局事件总线；
  * Provide/Inject；



### 1.5.1、全局事件总线mitt库

* Vue3从实例中移除了 $on、$off 和 $once 方法，需通过第三方的库：

  * 推荐一些库，例如 mitt 或 tiny-emitter；
  * hy-event-store；（自己封装）
    * `npm install hy-event-store`

* ##### 示例：

  * 创建文件event-bus.js

    * ```js
      import { HYEventBus } from 'hy-event-store'

      const eventBus = new HYEventBus()

      export default eventBus
      ```

  * HomeBanner.vue

    * ```js
      import eventBus from './utils/event-bus'
      export default {
          methods: {
              bannerBtnClick() {
                  eventBus.emit("whyEvent", "why", 18, 1.88)
              }
          }
      }
      ```

  * Category.vue

    * ```js
      import eventBus from './utils/event-bus'

      created() {
          eventBus.on("whyEvent",this.whyEventHandler)
      },
      unmounted() {
          eventBus.off("whyEvent", this.whyEventHandler)
      }
      ```



### 1.5.2、Provide和Inject

* ##### Provide/Inject用于非父子组件之间共享数据：

  * 无论层级结构有多深，祖先组件都可以作为其所有后代组件的依赖提供者；
  * 祖先组件有一个 provide 选项来提供数据；
  * 后代组件有一个 inject 选项来使用这些数据；

* ##### 注：仅用于祖先、后代组件共享数据；

* ##### 示例：

  * 祖先组件：（App.vue)

    * ```js
      <button @click="message = 'hello world'">修改message</button>

      import { computed } from 'vue'
      export default {
          data() {
              message: "hello"
          }
      	// provide一般都是写成函数，便于this指向组件实例
          provide() {
            return {
              name: "why",
              age: 18,
              message: computed(() => this.message)  // 用于把数据变成响应式；
            }
          }
      }
      ```

* 后代组件：（HomeContent.vue）

  * ```js
      //手动解包.value
      <h2>{{ name }}-{{ age }}-{{message.value}}</h2>

      export default {
      	inject: ["name", "age", "message"]   // message元素是ref对象，需要解包
      }
      ```

* ##### 把数据变成响应式：

  * 使用响应式的一些API来完成这些功能，比如说computed函数；

  * computed返回的是一个ref对象，需要用.vaule手动解包，取出其中的value来使用；

    * 也可以在入口文件main.js设置自动解包；

    * ```js
      app.config.unwrapInjectedRef = true
      ```

  * ##### 注：

    * 使用了`computed`方法的属性在后代组件里是不允许更改的；
    * `computed`方法让祖先组件改掉响应式数据后，使子组件对应的`inject`的数据也是响应式的；



# 九、组件化 – 额外知识补充

## 1.1、生命周期

* ##### 每个组件都可能会经历从创建、挂载、更新、卸载等一系列的过程；

* ##### 生命周期函数：

  * 是一些钩子函数（回调函数），在某个时间会被Vue源码内部进行回调； 可以在该生命周期中编写属于自己的逻辑代码了；



## 1.2、生命周期的流程

* ##### 生命周期的流程图：

* ##### 生命周期流程解析：

  * ##### 初始化：

    * ```js
      1.beforeCreate;
      2.创建组件实例;
      3.created //重要：发送网络请求；事件监听；this.$watch();
      ```

  * ##### template模板编译（将template的VNode挂载到虚拟DOM中）:

    * ```js
      1.beforeMount;
      2.将VNode挂载到虚拟DOM -> 生成真实的DOM -> 渲染到界面;
      3.mounted(重要：元素已经被挂载，可以获取DOM和使用DOM);
      ```

  * ##### 数据更新：

    * ```js
      1.beforeUpdate;
      2.根据最新数据生成新的VNode -> 生成新的虚拟DOM -> 真实的DOM;
      3.updated;
      ```

  * ##### 不再使用组件：（如：v-if="false"）

    * ```js
      1.beforeUnmount;
      2.将之前挂载在虚拟DOM中的VNode从虚拟DOM移除
      3.unmounted(回收操作(取消事件监听))
      4.将组件实例销毁掉；
      ```



## 1.3、$refs的使用

* ##### 直接获取到元素对象或者子组件实例：

  *  不推荐进行DOM操作；
  * 给元素或者组件绑定一个ref的attribute属性；

* ##### 组件实例有一个$refs属性：

  * 它是一个对象Object，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

* ##### 示例：

  * App.vue：

    * ```js
      <h2 ref="title">{{ message }}</h2>
      <banner ref="banner"/>

      // 2.获取元素
      console.log(this.$refs.title)

      // 3.获取组件实例
      console.log(this.$refs.banner)

      // 3.1.在父组件中可以主动的调用子组件的组件实例方法
      this.$refs.banner.bannerClick()

      // 3.2.获取banner组件实例, 获取banner中的根元素
      console.log(this.$refs.banner.$el)

      // 3.3.如果banner template是多个根, 拿到的是第一个node节点
      // 注意: 开发中不推荐一个组件的template中有多个根元素
      // console.log(this.$refs.banner.$el.nextElementSibling)

      // 4.组件实例还有两个属性(了解):
      console.log(this.$parent) // 获取父组件
      console.log(this.$root) // 获取根组件
      //在Vue3中已经移除了$children的属性
      ```



## 1.4、动态组件

* #####  动态组件是使用 component 组件，通过一个特殊的属性`is`来实现；

* ##### 示例：

  * 父组件：（App.vue）

    * ```js
      // is中的组件需要来自两个地方: 1.全局注册的组件 2.局部注册的组件
      // 动态组件的传值: 将属性和监听事件放到component上，与普通组件使用一样；
      <component name="why" :age="18" @homeClick="homeClick" :is="currentTab"></component>

      components: {
          Home,
          About,
          Category
      },
      data() {
          return {
              currentTab: "home"   // 修改currentTab对应组件名可以切换不同的组件；（写法如短横线对应驼峰）
          }
      }
      ```

  * 其中一个子组件：（home.vue）

    * ```js
      export default {
          props: ["name"],
          emits: ["homeClick"],
          methods: {
              homeBtnClick() {
                  this.$emit("homeClick", "home")  //自定义事件；
              }
          }
      }
      ```



## 1.5、keep-alive

* ##### 在某些情况使组件继续保持状态，而不是销毁掉；

* ##### keep-alive属性：

  * include：

    * string | RegExp | Array。只有名称匹配的组件会被缓存；

  * exclude：

    * string | RegExp | Array。只有名称不匹配的组件会被缓存；

  * max：

    * number | string。最多可以缓存多少组件实例，一旦达到这个数

    字，那么缓存组件中最近没有被访问的实例会被销毁；

* #####  include 和 exclude：

  * 字符串写法写入多个组件时，需要用逗号分割且不能有空格；`include="a,b"`
  * 上方的a,b对应的是组件Options API的name选项；
  * 数组写法：`:include="['home']"`

* ##### 缓存组件的生命周期：

  * 对于缓存的组件来说，再次进入时，是不会执行created或者mounted等生命周期函数的；
  * 可以使用 `activated` 和 `deactivated` 这两个生命周期钩子函数来监听；

* ##### 示例：

  * 父组件：（App.vue）

    * ```vue
      <!-- include: 组件的名称来自于组件定义时name选项  -->
      <keep-alive include="home,about">
          <component :is="currentTab"></component>
      </keep-alive>
      ```

  * 子组件：

    * ```js
      // 对于保持keep-alive组件, 监听有没有进行切换
      // keep-alive组件进入活跃状态
      activated() {
          console.log("home activated")
      },
      //失活
      deactivated() {
          console.log("home deactivated")
      }
      ```



## 1.6、Webpack的代码分包

* ##### 默认的打包过程：

  * 默认情况下，在构建整个组件树的过程中，因为组件和组件之间是通过模块化直接依赖的，那么webpack在打包时就会将组件模块打包到一起，app.js文件的内容过大，会造成首屏的渲染速度变慢；

* ##### 打包时，代码的分包：

  * 对于一些不需要立即使用的组件，可以单独对它们进行拆分；
  * 在需要时从服务器加载下来，并且运行代码；
  * 从而加快首屏的渲染速度；

* ##### 注：项目使用的第三方依赖会被打包到带有vendors文件名的js文件；

* ```js
  // import函数可以让webpack对导入文件进行分包处理
  import("./utils/math").then(res => {
    res.sum(20, 30)
  })
  // import函数返回的是一个promise;
  ```



## 1.7、Vue中实现异步组件

* 如果的项目过大了，对于某些组件希望通过异步的方式来进行加载（目的是可以对其进行分包处理），那么Vue中给提供了一个函数：`defineAsyncComponent`。

* `defineAsyncComponent`有两种类型的参数：

  * 工厂函数，该工厂函数需要返回一个Promise对象；
  * 接受一个对象类型，对异步函数进行配置；(了解)；

* ##### 示例：

  * ```js
    const AsyncCategory = defineAsyncComponent(() => import("./views/Category.vue"))

    components: {
        Category: AsyncCategory
    },
    ```



## 1.8、组件的v-model

* ##### 实际原理：

  * 绑定了`modelValue`属性；
  * 监听了 `@update：modelValue`的事件；

* ##### v-model的实现原理：

  * 父组件：（App.vue）

    * ```vue
      <counter :modelValue="appCounter" @update:modelValue="appCounter = $event"></counter>  //$event只指传递的第一个参数
      ```

  * 子组件：（Counter.vue）

    * ```js
      export default {
          //1.获取父组件传递过来的modelValue数据；
          props: {
              modelValue: {
                  type: Number,
                  default: 0
              }
          },
          //2.再自定义事件，向父组件传递数据；
          emits: ["update:modelValue"],
          methods: {
              changeCounter() {
                  this.$emit("update:modelValue", 999)
              }
          }
      }
      ```

* ##### v-model：

  * 父组件：（App.vue）

    * ```vue
      <counter v-model="appCounter"></counter>
      ```

  * 子组件与上方一样；

  * 注：会直接把子组件传递过来的参数赋值给对应的响应式数据；

* ##### `modelValue` 和 `undate:modelValue`是规定的默认属性和事件，修改方式：

  * 父组件：（App.vue）

    * ```vue
      <counter2 v-model:counter="appCounter" v-model:why="appWhy"></counter2>
      ```

  * 子组件：（Counter2.vue）

    * ```js
      export default {
          props: {
              counter: {
                  type: Number,
                  default: 0
              }
          },
          emits: ["update:counter"],  // 事件名需要与属性名一致
          methods: {
              changeCounter() {
                  this.$emit("update:counter", 999)
              }
          }
      }
      ```

  * 注：设置不同属性名后，可以绑定多个v-model；



## 1.9、Mixin

* 组件和组件之间有时候会存在相同的代码逻辑，可以使用Mixin对相同的代码逻辑进行抽取。

* 当组件使用Mixin对象时，所有Mixin对象的选项将被混合进入该组件本身的选项中；

* ##### Mixin的合并规则：

  * Mixin对象中的选项和组件对象中的选项发生了冲突，分成不同的情况来进行处理：

    * ##### 情况一：如果是data函数的返回值对象：

      * 返回值对象默认情况下会进行合并；
      * 若属性发生了冲突，那么会保留组件自身的数据；

    * ##### 情况二：如果是生命周期钩子函数：

      * 生命周期的钩子函数会被合并到数组中，都会被调用；

    * ##### 情况三：值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。

      * key不同，都会生效；
      * key相同，会取组件对象的键值对；

* ##### 示例：

  * 创建一个mixins文件夹，里面创建一个js文件；

    * ```js
      export default {
        data() {
          return {
            message: "Hello World"
          }
        },
        created() {
          console.log("message:", this.message)
        }
      }
      ```

  * home.vue：

    * ```js
      import messageMixin from '../mixins/message-mixin'

      export default {
          mixins: [messageMixin]
      }
      ```

  * 若要全局混入Mixin则：

    * 使用应用app的`mixin`方法来完成注册；

    * 全局混入的选项将会影响每一个组件；

    * ```js
      //main.js
      import messageMixin from '../mixins/message-mixin'

      app.mixin(messageMixin)
      ```



# 十、Composition API

## 1.1、Options API与Composition API的区别

* ##### Options API：

  * 在对应的属性中编写对应的功能模块；
  * 实现某一个功能时，对应的代码逻辑会被拆分到各个属性中；
  * 组件变得更大、更复杂，同一个功能的逻辑就会被拆分的很分散；
  * 不便于查找和处理单个逻辑关注点；

* ##### Composition API：

  * 能将同一个逻辑关注点相关的代码收集在一起；



## 1.2、setup函数

* ##### 两个参数：

  * props：
    * 父组件传递过来的属性会被放到props对象中；
  * context（包含三个属性）：
    * attrs：所有的非prop的attribute；
    * slots：父组件传递过来的插槽；
    * emit：当组件内部需要发出事件时会用到emit；

* #####  返回值：

  * setup的返回值可以在模板template中被使用；
  * 可以通过setup的返回值来替代data选项；

* ##### 注：默认情况下，一个普通定义的变量是不会引起界面的响应式操作；



## 1.3、Reactive API

* ##### 为在setup中定义的数据提供响应式的特性；

* ##### 原因：

  * 使用`reactive`函数处理数据之后，数据再次被使用时就会进行依赖收集；
  * 当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作；

* ##### 传入值的类型限制：

  * 必须传入的是一个对象或者数组类型（复杂数据类型）；

* ##### 使用场景：

  * reactive应用于本地定义的数据；
  * 多个数据之间是有关联的；

* ##### 示例：

  * ```js
    const account = reactive({
        username: "coderwhy",
        password: "1234567"
    })
    ```

* ##### 注意：

  * 默认是深层响应；
  * reactive被解构后会变成普通的值，失去响应式；
  * 重新赋值也会失去响应式，因为原本的代理对象被替换了



## 1.4、Ref API

* ##### 返回一个可变的响应式对象，该对象作为一个响应式的引用维护着它内部的值；

  * 内部的值是在`ref`的`value`属性中被维护的；

* ##### 可以传入简单数据类型和复杂数据类型；

* ##### ref值解包问题：

  * 在模板中引入ref的值时，Vue会自动解包，所以不需要通过 `.value`的方式来使用；
  * 在`setup`函数内部，它依然是一个 ref引用，所以依然需要使用`.value`的方式来使用；
  * 对象类型解包后是proxy对象；

* ##### Ref自动解包：

  ```js
  // 使用的时候不需要写.value；使用时候是深层解包
    <h2>当前计数: {{ info.counter }}</h2>
    // 修改的时候需要写.value；修改时候不是深层解包
    <button @click="info.counter.value++">+1</button>

    const counter = ref(0)
    const info = {  //普通对象里面套ref
        counter
    }
  ```

* ##### 应用场景：

  * 定义本地的一些简单数据；

  * 定义从网络中获取的数据也是使用ref；

    * ```js
      // 若使用reactive函数，只会返回一个代理对象，若对对象进行替换则失去响应式；只能把数据逐个push到数组里；
      // const musics = reactive([])

      const musics = ref([])
      // musics的值是被ref对象.value属性所维护，修改ref对象的value值后，值依然被ref对象所包裹，所以依然存在响应式；
      onMounted(() => {
          const serverMusics = ["海阔天空", "小苹果", "野狼"]
          musics.value = serverMusics
      })
      ```

* ##### 注意：

  * 默认是深层ref对象；



## 1.5、readonly

* ##### 单向数据流：

  * 对于从其他组件接收到的数据只读取，不修改。

* ##### readonly：
  * 防止传递给其他组件的响应式数据被修改；
  * readonly会返回原始对象的只读代理（依然是一个Proxy，proxy的set方法被劫持了，不能对其进行修改）；

* ##### 传入三个类型的参数：

  * 普通对象；
  * reactive返回的对象；
  * ref的对象；

* ##### readonly使用规则：

  * readonly返回的对象都是不允许修改的（无论在父组件还是在子组件）；
  * 但是经过readonly处理的原来的对象是允许被修改的；

* ##### 示例：

  * ##### 父组件：（App.vue)

    * ```js
      <show-info :roInfo="roInfo" @changeRoInfoName="changeRoInfoName"></show-info>

      const info = reactive({
          name: "why",
          age: 18,
          height: 1.88
      })

      // 使用readOnly包裹info
      const roInfo = readonly(info)
      return {
          roInfo,
      }
      ```

  * ##### 子组件：（ShowInfo.vue)

    * ```js
      // 只要在子组件修改接收的数据，代码就会无效(报警告)
      <button @click="roInfo.name = 'james'">ShowInfo按钮</button>

      props: {
          // readonly数据
          roInfo: {
              type: Object,
              default: () => ({})
          }
      },
      // 需要修改数据，必须通过注册自定义事件，让父组件监听事件来修改数据；
      emits: ["changeRoInfoName"],
      setup(props, context) {
          function roInfoBtnClick() {
              context.emit("changeRoInfoName", "james")
          }
          return { roInfoBtnClick }
      }
      ```

* ##### 注意：

  * readonly传入响应式数据返回才是响应式数据；



## 1.6、Reactive判断的API

* ##### isProxy：

  * 检查对象是否是由 `reactive` 或 `readonly` 创建的 proxy。

* ##### isReactive：

  * 检查对象是否是由 `reactive` 创建的响应式代理：
  * 如果该代理是 `readonly` 建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true；

* ##### isReadonly：

  * 检查对象是否是由 readonly 创建的只读代理。

* ##### toRaw：

  * 返回 reactive 或 readonly 代理的原始对象（不建议保留对原始对象的持久引用。请谨慎使用）。

* ##### shallowReactive：

  * 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (深层还是原生对象)。

* ##### shallowReadonly：

  * 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）。



## 1.7、toRefs和toRef

* toRefs：转换一个 `reactive` 对象的所有属性为ref；

* toRef：转换 `reactive` 对象中的一个属性为ref；

* ##### 示例：

  * ```js
    setup() {
        const info = reactive({
            name: "why",
            age: 18,
            height: 1.88
        })

        // reactive被解构后会变成普通的值, 失去响应式
        // const { name, age } = info

        // toRefs: 使得解构出来的属性具有响应式；
        const { name, age } = toRefs(info)

        // 在setup中修改解构的值需要解包
        name.value = "coder"

        // toRef:
        const height = toRef(info, "height")

        return {
            name,
            age,
            height
        }
    }
    ```



## 1.8、ref其他的API

* ##### unref：

  * 如果参数是一个 ref，则返回内部值，否则返回参数本身；

* ##### isRef：

  * 判断值是否是一个ref对象；

* ##### shallowRef

  * 创建一个浅层的ref对象；

* ##### triggerRef：

  * 手动触发和 shallowRef 相关联的副作用；



## 1.9、setup不可以使用this

* ##### 原因：this并没有指向当前组件实例；

  * 在setup被调用之前，data、computed、methods等都没有被解析，所以无法在setup中获取this；



# 十一、Composition API(二)

## 1.1、computed方法

* ##### computed方法的使用：

  * 传入一个getter函数，在函数里返回包含响应式数据的复杂逻辑，得到最终的计算结果，computed方法返回一个只读的ref对象；

    * ```js
      <h2>{{ fullname }}</h2>

      import { reactive, computed, ref } from 'vue'
      const names = reactive({
          firstName: "kobe",
          lastName: "bryant"
      })

      const fullname = computed(() => {
          return names.firstName + " " + names.lastName
      })
      ```

  * 传入一个具有 get 和 set 的对象，返回一个可变的（可读写）ref 对象；

    * ```js
      const fullname = computed({
          set: function(newValue) {
              const tempNames = newValue.split(" ")
              names.firstName = tempNames[0]
              names.lastName = tempNames[1]
          },
          get: function() {
              return names.firstName + " " + names.lastName
          }
      })
      ```



## 1.2、setup中获取元素或者组件

* ##### 定义一个ref对象，绑定到元素或者组件的ref属性上即可；

* ##### 获取元素：

  * ```js
    <h2 ref="titleRef">我是标题</h2>

    import { ref, onMounted } from 'vue'

    setup() {
        const titleRef = ref()

        // 挂载完后才能获取到元素
        onMounted(() => {
            // 在setup里需要解包
            console.log(titleRef.value)
        }
        return {
            titleRef
        }
    }
    ```

* ##### 获取组件实例：

  * ```js
    <show-info ref="showInfoRef"></show-info>

    const showInfoRef = ref()
    // 挂载完后才能获取到组件实例
    onMounted(() => {
        // 在setup里需要解包
        console.log(showInfoRef.value)
    }
    ```



## 1.3、生命周期钩子

* ##### 与Options API的对比：

  * ##### 注意：

    * setup函数中编写的代码就是`beforeCreate`和`created`的这些钩子中编写的代码；

* ##### 示例：

  * ```js
    // 导入方式
    import { onMounted } from 'vue'

    setup() {
        onMounted(() => {   //传入的才是生命周期钩子
            console.log("onmounted")
        })
    }
    ```



## 1.4、Provide/Inject函数

* ##### provide可以传入两个参数：

  * key：提供的属性名称；

  * value：提供的属性值；

  * ##### 示例：

    * ```js
      import { provide, ref } from 'vue'

      const name = ref("why")
      //不同于Options API，其传递过去接收到的就是响应式数据；
      //reactive不能单独传递对象里的某个属性，响应式会失效；
      //ref可以单独传递解包后的proxy对象，但不能是proxy的属性，对应包裹的是基本数据类型更不能传递，否则失去响应式；
      provide("name", name)
      provide("age", 18)
      ```

* ##### inject可以传入两个参数：

  * 注入的属性名称；

  * 默认值；

  * ##### 示例：

    * ```js
      import { inject } from 'vue'

      const name = inject("name")   //提供的是ref对象，那么获取到的也是ref对象
      const age = inject("age")
      //定义默认值；
      const height = inject("height", 1.88)
      ```

* ##### 注意：

  * 为了增加 `provide` 值和 `inject` 值之间的响应性，可以给 `provide` 值使用 `ref` 和 `reactive`；



## 1.5、侦听数据的变化

* ##### 使用`watch`和`watchEffect`来完成响应式数据的侦听；

* ##### 监听方法：

  * watch：需要手动指定侦听的数据源；
  * watchEffect：用于自动收集响应式数据的依赖；



### 1.5.1、Watch的使用

* 类似于Option API的watch选项：
  * watch需要侦听特定的数据源，并且执行其回调函数；
  * 默认情况，只有当被侦听的源发生变化时才会执行回调；
  * 不同的是默认情况Options API是浅层监听；

* ##### 示例：

  * ```js
    import { watch } from 'vue'

    //1.默认深层监听
    const message = ref("Hello World")
    const age = ref(18)
    //监听一个数据源
    watch(message, (newValue, oldValue) => {
        console.log(newValue, oldValue)  //Hello World
    })
    //监听多个数据源，数组形式
    watch([message, age], (newValue, oldValue) => {
        console.log(newValue, oldValue)
    })

    //2.监听reactive数据变化后, 获取普通对象，默认是浅层监听；
    watch(() => ({ ...info }), (newValue, oldValue) => {
        console.log(newValue, oldValue)
    }, {
        immediate: true,
        deep: true
    })
    ```

* 注意：

  * 如果监听源是reactive响应式数据，是深层监听；如果监听源是ref对象，是浅层监听；如果监听源是ref.value，是深层监听；
  * 数据源是ref对象，返回的newValue和oldValue会自动解包；
  * 监听不了普通值；



### 1.5.2、watchEffect

* ##### 特点：

  * watchEffect传入的函数会被立即执行一次，并且在执行的过程中会收集依赖；
  * 只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行；

* ##### 示例：

  * ```js
    import { watchEffect } from 'vue'
    //返回值是一个函数；不需要停止监听可不用变量接收；
    const stopWatch = watchEffect(() => {
        console.log("-------", counter.value, name.value)

        // 判断counter.value >= 10，停止监听；
        if (counter.value >= 10) {
            stopWatch()  //调用函数停止监听；
        }
    })
    ```

* ##### 注意：

  * 监听不了普通值；



### 1.5.3、watch和watchEffect的区别

* watch懒执行副作用（第一次不会直接执行）；
* watch更具体的说明当哪些状态发生变化时，触发侦听器的执行；
* watch可以访问侦听状态变化前后的值；
* watchEffect 不能收集异步方法中的依赖





## 1.6、script setup语法

* `<script setup>`是在.vue文件中使用组合式 API 的编译时语法糖；

  * 更少的样板内容，更简洁的代码；

* ##### 顶层作用域的绑定会被暴露给模板：

  * 当使用 `<script setup> `的时候，任何在 `<script setup> `声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容)都能在模板中直接使用；

* ##### 组件导入：

  * ```js
    <script setup>
        import showInfo from "./showInfo.vue"
    </script>
    ```

* ##### defineProps() 和 defineEmits()：

  * 替代Options API的`props`和`emits和$emit`选项；

  * 内置方法，不用导入；

  * ##### 示例：

    * 定义props：

      * ```js
        <h2>{{ name }}</h2>

        //可以不赋值给变量，赋值给变量主要为了在setup中使用props;
        //赋不赋值给变量都可以，在模板中直接使用传递的属性即可，如上
        const props = defineProps({
          name: {
            type: String,
            default: "默认值"
          },
          age: {
            type: Number,
            default: 0
          }
        })
        ```

    * 绑定函数, 并且发出事件：

      * ```js
        const emits = defineEmits(["infoBtnClick"])
        function showInfoBtnClick() {
            emits("infoBtnClick", "showInfo内部发生了点击")
        }
        ```

* ##### defineExpose()：

  * ##### 使用 `<script setup>` 的组件是默认关闭的：

    * 通过模板 `ref` 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定；

  * ##### 通过 `defineExpose` 方法来显式指定在 `<script setup>` 组件中要暴露出去的 property；

  * ##### 示例：

    * 父组件：（App.vue)

      * ```js
        <show-info ref="showInfoRef"></show-info>

        const showInfoRef = ref()
        onMounted(() => {
            showInfoRef.value.foo()
        })
        ```

    * 子组件：（ShowInfo.vue）

      * ```js
        function foo() {
          console.log("foo function")
        }
        defineExpose({
          foo
        })
        ```

  * ##### 注意：defineExpose()也是内置方法，不用导入；



# 十二、Vue全家桶 - Vue-Router

## 1.1、Vue全家桶

* ##### `vue的基础语法` + `vue-router` + `vuex`



## 1.2、前端路由

* ##### 路由器主要维护的是一个映射表；

  * 映射表会决定数据的流向；
  * 维护url和组件之间的映射关系；
  * 是前端来维护一套路由规则；

* ##### web的发展阶段：

  * 后端路由阶段；
  * 前后端分离阶段；
  * 单页面富应用（SPA）；
    * 加载单个HTML页面并在用户与应用程序交互时动态更新该页面的Web应用程序。

    * 维护url和组件之间的映射关系；




## 1.3、vue-router

* ##### vue-router：

  * 基于路由和组件的；
  * 路由用于设定访问路径，将路径和组件映射起来；
  * 在vue-router的单页面应用中，页面的路径的改变就是组件的切换；

* ##### 安装Vue Router：

  * `npm install vue-router`



## 1.4、hash模式和history模式

### 1.4.1、hash模式

* ##### URL的hash：

  - 也就是锚点(#), 本质上是改变window.location的href属性；
  - 可以通过直接赋值location.hash来改变href, 但是页面不发生刷新；

* hash的优势就是兼容性更好，在老版IE中都可以运行，但是缺陷是有一个#，显得不像一个真实的路径。



### 1.4.2、hash和history模式示例

* ```js
  import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

  // 创建一个路由: 映射关系
  const router = createRouter({
      // 指定采用的模式: hash
      history: createWebHashHistory(),
      // history: createWebHistory(),
  )}
  ```

* ##### 区别：

  * | hash                                                         | history                                                      |
    | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | 有 # 号                                                      | 没有 # 号                                                    |
    | 能够兼容到IE8                                                | 只能兼容到IE10                                               |
    | 实际的url之前使⽤哈希字符，这部分url不会发送到服务器，不需要在服务器层⾯上进⾏任何处理 | 每访问⼀个⻚⾯都需要服务器进⾏路由匹配⽣成html ⽂件再发送响应给浏览器，消耗服务器⼤量资源 |
    | 刷新不会存在 404 问题                                        | 浏览器直接访问嵌套路由时，会报 404 问题。                    |
    | 不需要服务器任何配置                                         | 需要在服务器配置⼀个回调路由                                 |



## 1.5、路由的默认路径

- #####  默认没有显示首页组件，必须让用户点击才可以；

- ##### 在routes中配置一个映射：

  - path配置的是根路径:` / `；
  - redirect是重定向, 也就是将根路径重定向到`/home`的路径下；

- ##### 让路径默认跳到到首页组件：

  - ```js
    routes: [
        { path: "/", redirect: "/home" },  //重定向；
        { path: "/home", component: Home }，
        { path: "/about", component: About }
    ]
    ```



## 1.6、router-link

* ##### 常见属性：

  * ##### to属性：

    * 是一个字符串，或者是一个对象；

  * ##### replace属性：

    * 当点击时，会调用 router.replace()，而不是 router.push()；

  * ##### active-class属性：

    * 设置激活a元素后应用的class，默认是router-link-active；

  * ##### exact-active-class属性：

    * 链接精准激活时，应用于渲染的 `<a>`的 class，默认是router-link-exact-active； （嵌套下的子元素）；

* ##### 写法：

  * ```vue
    //字符串写法
    <router-link to="/home">home</router-link>

    //对象写法
    <router-link :to="{ path: '/home', query: { name: 'why'}}"></router-link>
    ```



## 1.7、路由懒加载

* ##### 对于不是立刻使用的路由组件进行分包处理，访问时才下载对应组件，以提高首屏的渲染效率；

* ##### 示例：

  * ```js
    {
    	path: "/home",
        // component可以传入一个组件，也可以接收一个函数，需要返回一个Promise；
        component: () => import("../Views/Home.vue")
    }
    ```



## 1.8、路由的其他属性

* name属性：路由记录独一无二的名称；
* meta属性：自定义的数据；



## 1.9、动态路由基本匹配

* ##### 将给定匹配模式的路由映射到同一个组件；

  * 在路径中使用一个动态字段来实现，称之为`路径参数`；

* ##### 示例：

  * router -> index.js：

    * ```js
      {
          path: "/user/:id"
      }
      ```

  * .vue：

    * ```vue
      //路径只为/uesr则无法跳到user组件；
      <router-link to="/user/321">用户</router-link>
      //若想跳到user的子路由组件，需要to="/user/321/userChild"

      <router-view></router-view>
      ```



## 2.0、获取动态路由的值

* ##### 在template中，直接通过 `$route.params` 获取值；

  * ```vue
    <h2>{{ $route.params.id }}</h2>
    ```

* ##### 在created中，通过 `this.$route.params` 获取值；

  * ```js
    created() {
    	console.log(this.$route.params.id)
    }
    ```

* ##### 在setup中：`useRoute`

  * ```js
    import { useRoute } from 'vue-router'

    const route = useRoute()
    console.log(route.params.id)
    ```



## 2.1、NotFound

* ##### 对于那些没有匹配到的路由，通常会匹配到某个固定的页面；

  * 编写一个动态路由用于匹配所有的路径；

* ##### 示例：

  * ```js
    {
        // abc/cba/nba
        // 第一个*代表匹配所有路径；第二个*代表解析路径为数组，获取到的参数就会为数组，按需添加；
        path: "/:pathMatch(.*)*",
        component: () => import("../Views/NotFound.vue")
    }
    ```

  * 获取到传入的参数：

    * ```vue
      <h2>{{ $route.params.pathMatch }}</h2>
      ```



## 2.2、路由嵌套

* ##### 示例：

  * ##### router -> index.js：

    * ```js
      routes: [
         {
            path: "/home",
            ...,
            children: [
              {
                 // 嵌套路由重定向
                 {
                    path: "/home",
                    redirect: "/home/recommend"
                 },
                 // 嵌套路由
                 {
                   // /home/recommend
                   path: "recommend",  // 不可加斜杠
                   ...
                 },
          	}
            ]
         }
      ]
      ```

  * ##### .vue：

    * ```vue
      <router-link to="/home/recommend">推荐</router-link>   //路径不可简写为recommend
      ```



## 2.3、编程式路由

* ##### 通过代码来完成对路由的操作；



### 2.3.1、代码的页面跳转和query参数

* ##### Option API写法：

  * ```js
    //普通写法
    //传入路径
    this.$router.push('/home')

    //对象写法
    //属性为路由名或路径
    this.$router.push({
        // name: "home"
        path: "/home",

        //传入query参数
        query: {
            name: "why",
            age: 18
        }
    })
    ```

* ##### setup写法：
  * ```js
    import { useRouter } from 'vue-router'

    const router = useRouter()

    // 普通写法
    router.push("/home")

    // 对象写法
    router.push({
        // name: "home"
        path: "/home",

        //传入query参数
        query: {
            name: "why",
            age: 18
        }
    })
    ```

* ##### template模板获取参数：

  * ```vue
    <h2>{{ $route.query.name }}</h2>
    ```



### 2.3.2、替换当前的位置

* ##### push：

  * 压入一个新的页面；

* ##### replace：

  * 替换当前页面；
  * 无法回退查看被替换的页面；

* ##### 写法：

  * 声明式：

    * ```vue
      <router-link to="..." replace></router-link>
      ```

  * 编程式：

    * ```js
      import { useRouter } from "vue-router"

      const router = useRouter()
      router.replace(...)  // 跟push写法一样，可以对象可以字符串
      ```



### 2.3.3、页面的前进后退

* go：
  * `router.go(1)`
* back：
  * `router.back()`
* forward：
  * `router.forward()`



## 2.4、路由的使用步骤

* ##### 步骤：

  * 创建路由需要映射的组件；
  * 通过createRouter创建路由对象，并且传入history模式和routes；
    * 创建基于hash或者history的模式；
    * 配置路由映射: 组件和路径映射关系的routes数组；
  * 使用app注册路由对象（use方法）；
  * 路由使用: 通过`<router-link>`和`<router-view>`；

* ##### 示例：

  * ##### router -> index.js：

    * ```js
      import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

      // 创建一个路由: 映射关系
      const router = createRouter({
        // 指定采用的模式: hash,
        // 函数调用；
        history: createWebHashHistory(),
        // history: createWebHistory(),
        routes: [
          {
            path: "/",
            redirect: "/home"  //重定向
          },
          {
            name: "home",
            path: "/home",
            component: () => import("../Views/Home.vue"),  //路由懒加载
            //自定义数据
            meta: {
              name: "why",
              age: 18
            },
            children: [
            	//嵌套路由重定向
              {
                path: "/home",
                redirect: "/home/recommend"
              },
              {
                path: "recommend", // /home/recommend
                component: () => import("../Views/HomeRecommend.vue")
              },
              {
                path: "ranking", // /home/ranking
                component: () => import("../Views/HomeRanking.vue")
              },
            ]
          },
          {
            name: "about",
            path: "/about",
            component: () => import("../Views/About.vue")
          },
          {
            path: "/user/:id",
            component: () => import("../Views/User.vue")
          },
          {
            // abc/cba/nba
            path: "/:pathMatch(.*)*",
            component: () => import("../Views/NotFound.vue")
          }
        ]
      })

      export default router
      ```

  * ##### App.vue：(根组件)

    * ```vue
      <div class="nav">
          <router-link to="/home" replace>首页</router-link>
          <!-- <router-link :to="{ path: '/home' }" replace>首页</router-link> -->

          <router-link to="/about" replace active-class="active">关于</router-link>
          <router-link to="/user/123">用户123</router-link>
      </div>

      <!-- 占位组件 -->
      <router-view></router-view>
      ```

  * ##### Home.vue：(路由组件)

    * ```vue
      <div class="home-nav">
          <router-link to="/home/recommend">推荐</router-link>
      </div>

      <!-- 占位组件 -->
      <router-view></router-view>
      ```



## 2.5、动态添加路由

* ##### 使用场景：

  * 根据用户不同的权限，注册不同的路由；

* ##### 添加方法：

  * `router.addRoute(...)`

  * ##### router -> index.js：

    * ```js
      //添加一级路由
      router.addRoute({
          path: "/admin",
          component: () => import("../Views/Admin.vue")
      })

      //二级路由，第一个参数为已知路由的name属性值
      router.addRoute("home", {
          path: "vip",
          component: () => import("../Views/HomeVip.vue")
      })
      ```

* ##### 动态管理路由的其他方法：

  * ##### 删除路由的三种方式：

    * 添加一个name相同的路由；

      * ```js
        router.addRoute({
            name: "about",   //会删除之前名为about的路由；
            path: "/about",
            component: ...
        })
        ```

    * 通过removeRoute方法，传入路由的名称;

      * ```js
      router.removeRoute("about")  //传入路由名
        ```

    * 通过addRoute方法的返回值回调；

      * ```js
        const removeRoute = router.addRoute(...)
        removeRoute()
        ```

  * ##### 路由的其他方法补充：

    * router.hasRoute()：检查路由是否存在。
    * router.getRoutes()：获取一个包含所有路由记录的数组。



## 2.6、路由导航守卫

* ##### 导航守卫主要用来通过跳转或取消的方式守卫导航。



### 2.6.1、全局的前置守卫 beforeEach

* ##### 在导航触发时会被回调的；

* ##### 它有两个参数：

  * `to`：即将进入的路由 `Route` 对象；
  * `from`：即将离开的路由 `Route` 对象；

* ##### 返回值：

  * `false`：取消当前导航；
  * 不返回或者 `undefined`：进行默认导航；
  * 返回一个路由地址：
    * 可以是一个 `string` 类型的路径；
    * 可以是一个对象，对象中包含 `path`、`query`、`params` 等信息；

* ##### 可选的第三个参数：next：

  * 是在Vue3中是通过返回值来控制的，不再推荐使用 `next` 函数，这是因为开发中很容易调用多次`next`；

* ##### 示例：

  * ```js
    router.beforeEach((to, from) => {
      // 进入到任何别的页面时, 都跳转到login页面
      if (to.path !== "/login") {
        return "/login"
      }
    })
    ```



## 2.7、登录守卫功能

* ##### 只有登录后才能看到其他页面：

* ##### 示例：

  * ```js
    router.beforeEach((to, from) => {
      const token = localStorage.getItem("token")
      if (to.path === "/order" && !token) {
        return "/login"
      }
    })
    ```



# 十三、Vuex状态管理

## 1.1、状态管理

* ##### vuex是采用集中式管理组件依赖的共享数据的工具，可以解决不同组件数据共享问题。

  * 它采用`集中式`存储管理应用的所有组件的状态，并以相应的规则保证状态以一种`可预测`的方式发生变化。

* ##### 每一个Vuex应用的核心就是store（仓库）：

  * store本质上是一个容器，它包含着应用中大部分的状态（state）；

* ##### Vuex和单纯的全局对象的区别：

  * Vuex的状态存储是响应式的；
  * 不能直接改变store中的状态；
    * 改变store中的状态的唯一途径就是使用 `commit`方法通过mutations改变store中的状态；
    * 这样可以方便的跟踪每一个状态的变化，从而能够通过一些工具更好地管理应用的状态；

* ##### 示意图：

## 1.2、单一状态树(单一数据源)

* ##### Vuex使用单一状态树：

  * 用一个对象就包含了全部的应用层级的状态；
  * 每个应用将仅仅包含一个 `store` 实例；

* ##### 单一状态树的优势：

  * 单一状态树便于找到某个状态的片段；
  * 在之后的维护和调试过程中，也可以非常方便的管理和维护；



## 1.3、Vuex基本安装和创建

* ##### Vuex的安装：

  * `npm install vuex`；

* ##### 创建Store：

  * 创建store文件夹 -> index.js

    * ```js
      import { createStore } from 'vuex'

      const store = createStore({
        state: () => ({}),
        getters: {},
        mutations: {},
        actions: {},
        modules: {}
      })
      ```

* ##### main.js：

  * ```js
    import store from './store'
    createApp(App).use(store).mount('#app')
    //或
    app.use(store)
    ```



## 1.4、state的使用

* ##### store -> index.js：

  * ```js
    state: () => ({
        counter: 100,
        name: "coderwhy",
        level: 100
    }),
    ```

* ##### template：

  * ```vue
    <h2>{{ $store.state.counter }}</h2>
    ```

* ##### Options API：

  * 使用computed来简化写法：

    * ```js
      <h2>{{ storeCounter }}</h2>

      export default {
          computed: {
              storeCounter() {
                  return this.$store.state.counter
              }
          }
      }
      ```

  * 多数据写法：（使用mapState的辅助函数）

    * ```js
      import { mapState } from 'vuex'

      export default {
          computed: {
              //数组写法
              ...mapState(["name", "level"]),
              //对象写法（也可以解决命名冲突）
              ...mapState({
                  //会传入一个state对象，固定写法
                  //可以重命名
                  sName: state => state.name,
                  sLevel: state => state.level
              })
          }
      }
      ```

* ##### setup：

  * 使用mapState的写法：

    * ```js
      import { mapState, useStore } from 'vuex'
      import { toRefs } from 'vue'

      //解构mapState返回的对象，得到一个个函数
      const { name, level } = mapState(["name", "level"])
      //利用导入的useStore函数获取store对象
      const store = useStore()
      //给函数
      const cName = computed(name.bind({ $store: store }))
      const cLevel = computed(level.bind({ $store: store }))
      ```

  * 直接解构, 并且包裹成ref：

    * ```js
      <h2>{{ counter }}</h2>

      import { toRefs } from 'vue'
      import { useStore } from 'vuex'

      const store = useStore()
      //使用toRefs可以让让解构后的数据是ref对象，依然具有响应式
      const { name, level } = toRefs(store.state)
      ```



## 1.5、getters的使用

* ##### 处理包含响应式数据的复杂逻辑，如同computed；

* ##### store -> index.js：

  * ```js
    getters: {
        // 1.基本使用
        doubleCounter(state) {
            return state.counter * 2
        },

        // 2.在该getters属性中, 获取其他的getters
        message(state, getters) {
          return `name:${state.name}；TotalAge:${getters.doubleCounter}`
        },

        // 3.getters是可以返回一个函数的, 调用这个函数可以传入参数(了解)
        getFriendById(state) {
          return function(id) {
            const friend = state.friends.find(item => item.id === id)
            return friend
          }
        }
      }
    }
    ```

* ##### template：

  * ```vue
    <h2>{{ $store.getters.doubleCounter }}</h2>
    //对返回的函数进行调用
    <h2>{{ $store.getters.getFriendById(111) }}</h2>
    ```

* ##### Options API：

  * 可以使用computed来简化写法；

  * 多数据写法：（使用mapGetters的辅助函数）

    * ```js
      import { mapGetters } from 'vuex'

      export default {
          computed: {
              ...mapGetters(["doubleCounter"]),
          }
      }
      ```

* ##### setup：

  * 使用mapGetters的写法：

    * ```js
      import { computed } from 'vue'
      import { mapGetters, useStore } from 'vuex'

      const store = useStore()
      //解构后得到得是函数
      const { message: messageFn } = mapGetters(["message"])
      //给函数绑定this;
      const message = computed(messageFn.bind({ $store: store }))
      ```

  * 直接解构, 并且包裹成ref：

    * ```js
      <h2>{{ message }}</h2>

      import { toRefs } from 'vue';
      import { useStore } from 'vuex'

      const store = useStore()
      const { message } = toRefs(store.getters)

      //针对某一个getters属性使用computed或toRef
      //使用computed函数后返回的也是ref对象；
      const message = computed(() => store.getters.message)
      ```



## 1.6、Mutations的使用

* ##### 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation；

* ##### 若要使用常量代替函数名，在store文件夹创建`mutation_types.js`:

  * ```js
    //定义并导出常量
    export const CHANGE_INFO = "changeInfo"
    ```

* ##### store -> index.js：

  * ```js
    //导入常量文件
    import { CHANGE_INFO } from './mutation_types'

    mutations: {
        increment(state) {
          state.counter++
        },
        changeName(state, payload) {
          state.name = payload
        },
        //使用常量作为函数名
        [CHANGE_INFO](state, newInfo) {
          state.level = newInfo.level
          state.name = newInfo.name
        }
      }
    }
    ```

* ##### Options API：

  * 普通使用：

    * ```js
      import { CHANGE_INFO } from "@/store/mutation_types"

      export default {
          methods: {
            changeName() {
              this.$store.commit("changeName", "王小波")
              //对象写法：
              this.$store.commit({
                  type: CHANGE_INFO,
                  count: 100
              })
            },
            changeInfo() {
              //指定方法名
              this.$store.commit(CHANGE_INFO, {
                name: "王二",
                level: 200
              })
            }
          }
        }
      }
      ```

  * 使用mapMutations的方法：

    * ```js
      //使用mapMutations方法，若要给mutations的方法传参则直接在元素里传
      <button @click="changeName('王小波')">修改name</button>

      import { mapMutations } from 'vuex'
      import { CHANGE_INFO } from "@/store/mutation_types"

      methods: {
           ...mapMutations(["changeName", "incrementLevel", CHANGE_INFO])，
           //对象写法
           ...mapMutations({
               changeinfo: CHANGE_INFO
           })
      }
      ```

* ##### setup：

  * 使用mapMutations方法：

    * ```js
      <button @click="changeName('王小波')">修改name</button>

      import { mapMutations, useStore } from 'vuex'
      import { CHANGE_INFO } from "@/store/mutation_types"

      const store = useStore()

      const mutations = mapMutations(["changeName", "incrementLevel", CHANGE_INFO])

      const newMutations = {}
      Object.keys(mutations).forEach(key => {
          newMutations[key] = mutations[key].bind({ $store: store })
      })
      const { changeName, incrementLevel, changeInfo } = newMutations
      //传参在元素上传
      ```




* ##### mutation重要原则：

  * `mutation`必须是同步函数：
    * 因为devtool工具会记录mutation的日记；
    * 每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照；
    * 但是在mutation中执行异步操作，就无法追踪到数据的变化；



## 1.7、actions的使用

* ##### Action类似于mutation，不同在于：

  * Action提交的是mutation，而不是直接变更状态；
  * Action可以包含任意异步操作；

* ##### context参数：

  *  context是一个和store实例均有相同方法和属性的context对象；

  * 可以使用context来提交mutation、获取state和getters；



### 1.7.1、actions的使用：

* ##### store -> index.js：

  * ```js
    //简单使用
    actions: {
        //可以传入参数
        incrementAction(context, payload) {
          context.commit("increment", payload)
        },
    }
    ```

* ##### template：

  * ```vue
    <button @click="btnClick">发起action</button>
    ```

* ##### Options API：

  * 普通使用：

    * ```js
      export default {
          methods: {
              btnClick() {
         	        this.$store.dispatch("incrementAction")
              }
          }
      }
      ```

  * mapActions的使用：

    * ```js
      methods: {
          //要传参数在元素上传
          ...mapActions(["incrementAction", "changeNameAction"])

         //对象写法
         ...mapActions({
            addAction: "addAction" //属性为绑定的事件，属性值为actions里对应的属性
          })
      }
      ```

* ##### setup：

  * 默认写法：

    * ```js
      import { useStore } from 'vuex'
      const store = useStore()

      function increment() {
          store.dispatch("incrementAction")
      }
      ```

  * mapActions写法：(使用多个actions方法时)

    * ```js
      import { useStore, mapActions } from 'vuex'
      const store = useStore()

      const actions = mapActions(["incrementAction", "changeNameAction"])
      const newActions = {}
      Object.keys(actions).forEach(key => {
          newActions[key] = actions[key].bind({ $store: store })
      })
      const { incrementAction, changeNameAction } = newActions
      ```



### 1.7.2、actions的异步操作—发起网络请求：

* ##### store -> index.js：

  * ```js
    //发送网络请求
    actions: {
        async fetchHomeMultidataAction(context) {
            // 3.await/async
            const res = await fetch("http://123.207.32.32:8000/home/multidata")
            const data = await res.json()

            // 修改state数据
            context.commit("changeBanners", data.data.banner.list)
            context.commit("changeRecommends", data.data.recommend.list)
            return data
        }
    }
    ```

* ##### setup：

  * ```js
    import { useStore } from 'vuex'

    // 告诉Vuex发起网络请求
    const store = useStore()
    // 若需要在setup中使用数据可以使用then方法，但返回的数据必须是promise)
    store.dispatch("fetchHomeMultidataAction").then(res => {
        console.log("home中的then被回调:", res)
    })
    ```



## 1.8、module的使用

* 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，Vuex 允许我们将 store 分割成`模块（module）`。每个模块拥有自己的 state、mutations、actions、getters、甚至是嵌套子模块；

* ##### 对于模块内部的 mutations 和 getters，接收的第一个参数是`模块的局部状态对象（state）`；



### 1.8.1、module的使用

* ##### store -> modules -> moduleA.js：

  * ```js
    export default {
      state: () => ({ ... }),
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }
    ```

* ##### store -> modules -> moduleB.js：

  * ```js
    export default {
      state: () => ({ ... }),
      mutations: { ... },
      actions: { ... }
    }
    ```

* ##### store -> index.js：

  * ```js
    import moduleA from "..."
    import moduleB from "..."

    const store = createStore({
      state: () => ({ ... }),
      mutations: { ... },
      actions: { ... },
      modules: {
        a: moduleA,
        b: moduleB
      }
    })
    ```



### 1.8.2、module的命名空间

* ##### 内部state，模块内部的state是局部的，也就是模块私有的；

  * ```vue
    //使用时跟上模块名
    <h2>{{ $store.state.a.count }}</h2>
    ```

* ##### 内部getters、mutations、actions 仍然注册在全局命名空间内：

  * 这样使得多个模块能够对同一 mutation 或 action 作出响应；

  * ##### template：

    * ```js
      //使用时不需要跟上模块名
      <h2>{{ $store.getters.doubleCount }}</h2>
      ```

  * ##### setup：

    * ```js
      import { useStore } from 'vuex'

      const store = useStore()
      // 派发事件时, 默认也是不需要跟模块名称
      // 提交mutation时, 默认也是不需要跟模块名称
      function incrementCount() {
          store.dispatch("incrementCountAction")
      }
      ```

* ##### 使模块成为带命名空间的模块：

  * moduleA.js：

    * ```js
      export default {
        namespaced: true,
        state: () => ({ ... })
      }
      ```

  * template：

    * ```vue
      // getters使用方法
      <h2>{{ $store.getters["counter/doubleCount"] }}</h2>   // counter为模块名
      ```

  * setup：

    * ```js
      import { useStore } from 'vuex'

      const store = useStore()
      // mutations、actions使用方法
      function incrementCount() {
          store.dispatch("counter/incrementCountAction")
      }
      ```

* ##### 补： 在带命名空间的模块内访问全局内容

  * 如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。

  * 若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

    * 示例：模块A调用模块B的mutations，在模块A中：

      * ```js
        actions: {
            getLastName(context) {
              context.commit("first/setState", "ga", { root: true})
            },
          },
        ```




### 1.8.3、在模块中获取根模块的state

* ##### moduleA.js：

  * ```js
    getters: {
        bar(state, getters, rootState, rootGetters) {}
    },
    mutations: {
    	foo(state, e, rootState, rootGetters) {}
    },
    actions: {
        baz({ state, rootState，rootGetters, commit, dispatch }, e) {}
    }
    ```



# 十四、Pinia状态管理

## 1.1、Pinia

* 最初是作为一个实验为Vue重新设计状态管理，使其更契合组合式API；
* 并且目前同时兼容Vue2、Vue3，可以使用`Optons API` 或 `Composition API`；
*  Pinia本质上依然是一个状态管理的库，用于跨组件和页面进行状态共享；



## 1.2、Pinia和Vuex的区别

* ##### 不再存在mutations，可以直接修改state的状态；

* ##### 更友好的TypeScript支持；

  * 在与 TypeScript 一起使用时具有可靠的类型推断支持；

* ##### 不再有modules的嵌套结构：

  * 可以灵活使用每一个store，它们是通过扁平化的方式来相互使用的；

* ##### 也不再有命名空间的概念；



## 1.3、pinia的store

* ##### 可以在应用程序中定义任意数量的Store来管理状态；

* ##### Store有三个核心概念：

  * state、getters、actions；
  * 等同于组件的data、computed、methods；

* ##### Store在它被使用之前是不会创建的，可以通过调用use函数来使用Store；



## 1.3、Pinia的使用

### 1.3.1、基本创建

* ##### 安装：

  * `yarn add pinia`
  * `npm install pinia`

* ##### 创建store文件夹 -> index.js：

  * ```js
    import { createPinia } from 'pinia'

    export default createPinia()
    ```

* ##### main.js：

  * ```js
    import pinia from './stores'

    app.use(pinia)
    ```

* ##### store -> 创建如`home.js`：

  *  使用 `defineStore() `来定义一个Store；

    * 需要一个唯一名称，作为第一个参数传递，是必要的，Pinia使用它来将store连接到devtools；

  * ```js
    //定义一个store
    import { defineStore } from 'pinia'

    export default defineStore("home", {
      state: () => ({ ... }),
      getters: { ... }
      actions: { ... }
    })
    ```



### 1.3.2、在一个store使用另一个store

* ##### store -> 创建counter.js：

  * ```js
    import { defineStore } from 'pinia'
    //导入另一个仓库
    import useUser from './user'
    // 1.获取user信息
    const userStore = useUser()

    export default defineStore("user", {
      state: () => ({}),
      getters: {
          foo(state) {
              // 使用其他store的状态，不需要跟state
              return userStore.name + state.name
          }
      }
    })
    ```



## 1.4、state

### 1.4.1、Store的解构

* ##### Store获取到的state不能被解构，会失去响应式：

  * 从 Store 中提取属性同时保持其响应式，需要使用storeToRefs()；

  * ```js
    //不需要跟state;
    <h2>count: {{ userStore.name }}</h2>
    <h2>{{ name }}</h2>

    import useUser from '@/stores/user'
    import { storeToRefs } from 'pinia'

    const userStore = useUser()
    const { name, age, level } = storeToRefs(userStore)
    ```



### 1.4.2、读取和写入 state

* ##### 通过 store 实例访问状态来直接读取和写入状态；

* ##### 写入方式：

  * 一个个修改状态：

    * ```js
      function changeState() {
          userStore.name = "kobe"
      }
      ```

  * 批量修改：

    * ```js
      userStore.$patch({
          name: "james",
          age: 35
      })
      ```



### 1.4.3、$State

* ```js
  // 跟patch的功能类似, 合并state, 就像使用了Object.assign(), 添加或替换某个状态
  const oldState = userStore.$state
  userStore.$state = {
      name: "curry",
      level: 200
  }
  console.log(oldState === userStore.$state)  //true
  ```



### 1.4.4、 重置 State

* 通过调用store上的 `$reset()`方法将状态重置到其初始值；

* ```js
  function resetState() {
      userStore.$reset()
  }
  ```



## 1.5、Getters

* ##### Getters相当于Store的计算属性：

  * getters中可以定义接受一个state作为参数的函数，也可以使用this来获取state；
  * 对于获取getters其他的的方法，也是使用this；

* ##### Getters的使用：

  ```vue
  // 不需要跟getters；
    <h2>{{ counterStore.doubleCount }}</h2>
    <script setup>
      import useCounter from '@/stores/counter';
      const counterStore = useCounter()
    </script>
  ```



## 1.6、Actions

* 配置Actions中，获取到的参数只是普通传进来的参数，不是context；

  * ```js
    actions: {
        incrementNum(num) {
          this.count += num
        }
    }
    ```

* 调用Actions中的方法：

  * ```js
    //不需要跟dispatch
    import useHome from '@/stores/home'
    const homeStore = useHome()
    homeStore.fetchHomeMultidata().then(res => {
        console.log(res)
    })
    ```



# 十五、网络请求库 – axios库

## 1.1、axios

* ##### 功能特点：

  * 在浏览器中发送 XMLHttpRequests 请求；
  * 在 node.js 中发送 http请求；
  * 支持 Promise API；
  * 拦截请求和响应；
  * 转换请求和响应数据；



## 1.2、axios请求方式

* ##### 支持多种请求方式：

  * axios(config) ：
    * axios('/user/12345')   //发起一个 GET 请求 (默认请求方式)
  * axios.request(config)
  * axios.get(url[, config])
  * axios.delete(url[, config])
  * axios.head(url[, config])
  * axios.post(url[, data[, config]])
  * axios.put(url[, data[, config]])
  * axios.patch(url[, data[, config]])

* ##### 可以同时发送多个请求：

  * axios.all([...])：底层原理是调用Promise.all()；



### 1.2.1、示例：

* 发送request请求：

  * ```js
    axios.request({
      url: "http://123.207.32.32:8000/home/multidata",
      method: "get"
    }).then(res => {
      console.log("res:", res.data)
    })
    ```

* 发送get请求：

  * ```js
    //查询字符串形式
    axios.get(`http://123.207.32.32:9001/lyric?id=500665346`).then(res => {
      console.log("res:", res.data.lrc)
    })

    //query参数
    axios.get("http://123.207.32.32:9001/lyric", {
      params: {
        id: 500665346
      }
    }).then(res => {
      console.log("res:", res.data.lrc)
    })
    ```

* 发送post请求：

  * ```js
    //第二个参数为传入参数的data
    //第三个参数为配置config，也可以写在第二个参数的位置，库会对其进行判断处理；

    //第二个参数为data
    axios.post("http://123.207.32.32:1888/02_param/postjson", {
      name: "coderwhy",
      password: 123456
    }).then(res => {
      console.log("res", res.data)
    })

    //第二个参数为配置，配置里写入data
    axios.post("http://123.207.32.32:1888/02_param/postjson", {
      data: {
        name: "coderwhy",
        password: 123456
      }
    }).then(res => {
      console.log("res", res.data)
    })
    ```



### 1.2.2、 给axios实例配置公共的基础配置

* ```js
  // 1.baseURL;对于一些需要重复使用的基础地址抽取出来
  const baseURL = "http://123.207.32.32:8000"

  // 给axios实例配置公共的基础配置，每次使用实例都会默认进行以下配置；
  axios.defaults.baseURL = baseURL
  axios.defaults.timeout = 10000
  axios.defaults.headers = {}

  // get: /home/multidata
  axios.get("/home/multidata").then(res => {
    console.log("res:", res.data)
  })
  ```



### 1.2.3、axios发送多个请求

* ```js
  axios.all([
    axios.get("/home/multidata"),
    //有完整地址，直接使用完整地址
    axios.get("http://123.207.32.32:9001/lyric?id=500665346")
  ]).then(res => {
    console.log("res:", res)
  })
  ```



## 1.3、常见的配置选项

## 1.4、axios的创建实例

* ##### 创建实例的原因：

  * 从axios模块中导入对象时, 使用的实例是默认的实例；
  * 给该实例设置一些默认配置时, 这些配置就被固定下来了；
  * 但是某些请求的配置可能会不太一样；比如baseURL或者timeout等；

* ##### 可以创建新的实例, 并且传入属于该实例的配置信息；

  * `axios.create({...})`

  * ```js
    const instance1 = axios.create({
      baseURL: "http://123.207.32.32:9001",
      timeout: 6000,
      headers: {}
    })
    ```



## 1.5、请求和响应拦截器

* ##### axios的也可以设置拦截器：拦截每次请求和响应

  * axios.interceptors.request.use(成功拦截回调, 失败拦截回调)

    * 作用：

      * 开始loading的动画
      * 对原来的配置进行一些修改
        * header
        * 认证登录: token/cookie
        * 请求参数进行某些转化

    * ```js
      // 对实例配置拦截器
      axios.interceptors.request.use((config) => {
        console.log("请求成功的拦截")
        return config
      }, (err) => {
        console.log("请求失败的拦截")
        return Promise.reject(err)
      })
      ```

  * axios.interceptors.response.use(成功拦截回调, 失败拦截回调)

    * 作用：

      *  结束loading的动画
      * 对数据进行转化, 再返回数据

    * ```js
      axios.interceptors.response.use((res) => {
        console.log("响应成功的拦截")
        return res.data
      }, (err) => {
        console.log("响应失败的拦截:", err)
        return Promise.reject(err)
      })
      ```

* ##### 注：拦截器需要写在网络前请求的前面；



## 1.6、axios请求库封装（简洁版）

* ##### service -> index.js：

  * ```js
    import axios from 'axios'

    class RequestHttp {
      constructor(baseURL, timeout=10000) {
        this.instance = axios.create({
          baseURL,
          timeout
        })
        // 拦截器设置；
        this.instance.interceptors.request.use(config => {
          return config
        }, err => {
          return err
        })
        this.instance.interceptors.response.use(res => {
          return res
        }, err => {
          return err
        })
      }

      request(config) {
        return new Promise((resolve, reject) => {
          this.instance.request(config).then(res => {
            //对结果进行处理
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      }

      get(config) {
        return this.request({ ...config, method: "get" })
      }

      post(config) {
        return this.request({ ...config, method: "post" })
      }
    }

    export default new RequestHttp("http://123.207.32.32:9001")
    ```

* 使用的文件：

  * ```js
    import RequestHttp from './service'

    hyRequest.request({
      url: "/lyric?id=500665346"
    }).then(res => {
      console.log("res:", res)
    })
    ```





## 1.7、ts版本

> 目录结构
>
> request
>
> ​	index.ts
>
> ​	config.ts
>
> ​	type.ts



config.ts

~~~typescript
// 1.方式一: 手动的切换不同的环境(不推荐)
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }

~~~



index.ts

~~~typescript
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest

~~~

type.ts

~~~typescript
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}

~~~



# 十六、高级语法补充

## 1.1、自定义指令

* ##### 自定义指令：

  * 代码的复用和抽象主要还是通过组件；
  * 通常在某些情况下，需要对DOM元素进行底层操作，就会用到自定义指令；

* ##### 自定义指令分为两种：



### 1.1.1、自定义局部指令

* ##### 自定义局部指令：组件中通过 directives 选项，只能在当前组件中使用；

  * template：

    * ```vue
      <input type="text" v-focus>
      ```

  * option API：

    * ```js
      export default {
          directives: {
              focus: { //自定义指令名称
                  // 生命周期的函数(自定义指令)
                  mounted(el) {
                      el.focus()
                  }
              }
          }
      }
      ```

  * compositions API：（setup语法糖写法）

    * ```js
      // 写法为v + 大驼峰
      const vFocus = {
        // 生命周期的函数(自定义指令)
        mounted(el) {  //el为元素对象
          el.focus()
        }
      }
      ```

    * 注意：对于setup函数没有写法；



### 1.1.2、自定义全局指令

* ##### 自定义全局指令：app的 directive 方法，可以在任意组件中被使用；

* ##### 基本使用：main.js

  * ```js
    app.directive("focus", {
        // 生命周期的函数(自定义指令)
        mounted(el) {
            el.focus()
        }
    })
    ```

* ##### 定义多个全局指令的写法：

  * 创建一个directives文件夹 -> focus.js和index.js ；

  * focus.js：

    * ```js
      export default function directiveFocus(app) {
        app.directive("focus", {
          mounted(el) {
            el.focus()
          }
        })
      }
      ```

  * index.js：

    * ```js
      import directiveFocus from "./focus"
      ...

      export default function directives(app) {
        directiveFocus(app)
         ...  // 可以添加更多的dir...
      }
      ```

  * main.js：

    * ```js
      import directives from "./01_自定义指令/directives/index"

      // 1.可以直接调用,但要传入app
      const app = createApp(APP)
      directives(app)

      // 2.或者使用use()，use()会给传入的函数传入参数app对象并调函数；
      createApp(App).use(directives).mount("#app")
      ```



## 1.2、指令的生命周期

* ##### 钩子函数：（不需要导入）

  * ##### created：

    * 在绑定元素的 attribute 或事件监听器被应用之前调用；

  * ##### beforeMount：

    * 当指令第一次绑定到元素并且在挂载父组件之前调用；

  * ##### mounted：

    * 在绑定元素的父组件被挂载后调用；

  * ##### beforeUpdate：

    * 在更新包含组件的 VNode 之前调用；

  * ##### updated：

    * 在包含组件的 VNode 及其子组件的 VNode 更新后调用；

  * ##### beforeUnmount：

    * 在卸载绑定元素的父组件之前调用；

  * ##### unmounted：

    * 当指令与元素解除绑定且父组件已卸载时，只调用一次；

* ##### 示例：

  * ```js
    const vWhy = {
      created(el) {
        console.log("created")
      }
    }
    ```



### 1.3、指令的参数和修饰符

* ```js
  <h2 v-why:kobe.abc.cba="message">哈哈哈哈</h2>

  // :kobe为参数的名称；
  // .abc和.cba为修饰符；
  // message为传入的值；

  // 通过bindings来获取对应的内容，bindings为钩子函数的第二个参数；
  const vWhy = {
    mounted(el, bindings) {
      el.textContent = bindings.value  //可以进行对应操作
    }
  }

  ```




## 1.3、内置组件—Teleport

* ##### 某些情况下，希望组件不是挂载在这个组件树上的，可能是移动到Vue app之外的其他位置：

  * 比如移动到body元素上，或者有其他的div#app之外的元素上；
  * 这个时候就可以通过teleport来完成；

* ##### 两个属性：

  * to：指定将其中的内容移动到的目标元素，可以使用选择器；
  * disabled：是否禁用 teleport 的功能；

* ##### 示例：

  * ```vue
    <div class="content">
        <teleport to="#abc">
            <h2>哈哈哈哈哈</h2>   //可以为组件
        </teleport>
    </div>
    ```

* ##### 注意：

  * 将多个teleport应用到同一个目标上（to的值相同），那么这些目标会进行合并；




## 1.4、内置组件—异步组件和Suspense

* ##### Suspense显示的是一个实验性的特性，API随时可能会修改。

* ##### 两个插槽：

  * default：如果default可以显示，那么显示default的内容；
  * fallback：如果default无法显示，那么会显示fallback插槽的内容；

* ##### 示例：

  * ```vue
    <div class="app">
        <suspense>
            <template #default>
    			<async-home/>
            </template>
            <template #fallback>
    			<h2>Loading</h2>
            </template>
        </suspense>
    </div>

    import { defineAsyncComponent } from 'vue';

    const AsyncHome = defineAsyncComponent(() => import("./AsyncHome.vue"))
    ```



## 1.5、Vue插件

* ##### 向Vue全局添加一些功能时，会采用插件的模式，两种编写方式：

  * 对象类型：
    * 一个对象，但是必须包含一个 install 的函数，该函数会在安装插件时执行；
  * 函数类型：
    * 一个function，这个函数会在安装插件时自动执行；

* ##### 示例：

  * ```js
    // 安装插件
    // 方式一: 传入对象的情况
    app.use({
      install: function(app) {
        console.log("传入对象的install被执行:", app)
      }
    })

    // 方式二: 传入函数的情况
    app.use(function(app) {
      console.log("传入函数被执行:", app)
    })
    ```

* ##### 注意：

  * 插件可以完成的功能没有限制；



## 1.6、h函数

* ##### 渲染函数可以使用JavaScript来创建HTML；

  * 使用渲染函数生成对应的VNode；

* ##### `template`中的HTML 最终也是使用`渲染函数`生成对应的`VNode`；

* ##### h()函数：

  * 用于创建 vnode 的一个函数；
  * 也可以是createVNode()函数，相同；

* ##### 接收三个参数：

  * tag：标签名、组件、异步组件、或函数式组件；

  * props：与attribute、prop和事件相对应的对象；

  * children：使用`h()`构建子VNode，或是文本内容、有插槽的对象；

  * ```js
    // 标签，属性，子元素
    h(tag, props, [
      	h(tag, props, "内容")]
    ])
    ```

* ##### 示例：

  * Options API：

    * 不能有template元素；

    * ```js
      import { h } from 'vue'
      import Home from "./Home.vue"

      export default {
          render() {   //渲染函数
              return h("div", { className: "app" }, [
                  h("h2", null, `当前计数: ${this.counter}`),
                  h("button", { onClick: this.increment }, "+1"),
                  h("button", { onClick: this.decrement }, "-1"),
                  h(Home)
              ])
          }
      }
      ```

  * setup函数：

    * 注意：

      * 有无`<template>`和`<render />`都可以；
      * template中只能有`<render />`，其他元素不会被渲染；

    * ```js
      <template>
        <render/>
      </template>

      <script>
        import { h, ref } from 'vue'
        import Home from "./Home.vue"

        export default {
          setup() {
            ...

            //返回一个函数，函数又返回一个h函数；
            return () => h("div", { className: "app" }, [
              h("h2", null, `当前计数: ${counter.value}`),
              h("button", { onClick: increment }, "+1"),
              h("button", { onClick: decrement }, "-1"),
              h(Home) //可以是组件，区分大小写；其他写法都是区分大小写
            ])
          }
        }
      </script>
      ```

  * setup语法糖：

    * 注意：

      * 必须要有`<template>`和`<render />`；
      * template元素里除`<render />`，还可以有其他元素；

    * ```js
      <template>
        <render/>
      </template>

      <script setup>
      import { ref, h } from 'vue';
      ...

      const render = () => h("div", { className: "app" }, [
        h("h2", null, `当前计数: ${counter.value}`),
        h("button", { onClick: increment }, "+1"),
        h("button", { onClick: decrement }, "-1"),
        h(Home)
      ])
      </script>
      ```

* 注意：

  * 如果没有props，那么通常可以将children作为第二个参数传入；
  * 如果会产生歧义，可以将null作为第二个参数传入，将children作为第三个参数传入；



## 1.7、jsx的babel配置

* JSX是一个 JavaScript 的语法扩展，也是可以使能用javaScript来编写HTML；

* jsx要通过Babel来进行转换，vue需要在Babel中配置对应的插件：

  * webpack：

    * `npm install @vue/babel-plugin-jsx -D`

    * babel.config.js配置文件：

      * ```js
        module.exports = {
            plugins: [
                "@vue/babel-plugin-jsx"
            ]
        }
        ```

  * vite：

    * `npm install @vitejs/plugin-vue-jsx -D`

    * vite.config.js：

      * ```js
        import jsx from '@vitejs/plugin-vue-jsx'

        plugins: [
            jsx()
        ]
        ```

* ##### 示例：

  * Options API：

    * 注意：不能有template；

    * ```vue
      import About from "./Home.vue"

      render() {
        return (
            <div class="app">
               <h2>当前计数: { this.counter }</h2>
      	     <button onClick={ this.increment }>+1</button>
       	     <button onClick={ this.decrement }>-1</button>
               <About/>  //也可以是组件,区分大小写
        	  </div>
      	)
      }
      ```

  * setup：

    * 注意：(与vue的render函数一样)

      - 有无`<template>`和`<jsx />`都可以；
      - template中只能有`<jsx />`，其他元素不会被渲染；

    * ```vue
      <template>
        <jsx/>
      </template>

      setup() {
      	...
          return () => (
          	<div class="app">
                <h2>当前计数: { counter.value }</h2>
                <button onClick={ increment }>+1</button>
                <button onClick={ decrement }>-1</button>
                <About/>
              </div>
      	)
      }
      ```

  * setup语法糖：

    * 注意：(与vue的render函数一样)

      - 必须要有`<template>`和`<jsx/>`；
      - template元素里除`<jsx/>`，还可以有其他元素；

    * ```vue
      <template>
        <jsx/>
      </template>

      const jsx = () => (
        <div class="app">
          <h2>当前计数: { counter.value }</h2>
          <button onClick={ increment }>+1</button>
          <button onClick={ decrement }>-1</button>
          <About/>
        </div>
      )
      ```



# 十七、实现过渡动画

## 1.1、transition动画

* ##### 在下列情形中，可以给任何元素和组件添加进入/离开过渡：

  * 条件渲染； (使用 v-if、v-show)
  * 动态组件；（`<component>`）
  * 组件根节点；
    * 给导入的组件使用包裹transition，添加的class会添加到组件的根节点；

* ##### transition组件的原理：

  * 当插入或删除包含在`transition`组件中的元素时，vue的处理是：
    * 自动监测目标元素是否应用了CSS过渡或者动画，有则在恰当的时机添加/删除 CSS类名；
    * 如果 transition 组件提供了JavaScript钩子函数，这些钩子函数将在恰当的时机被调用；
    * 如果没有找到JavaScript钩子并且也没有检测到CSS过渡/动画，DOM插入、删除操作将会立即执行；

* ##### 注意：

  * transtion主要是针对单个元素或者组件；（transition里只能插入一个元素，多个会报警告）
  * 或是同一时间渲染多个节点中的一个；



## 1.2、过渡动画class

* ##### v-enter-from：定义进入过渡的开始状态。

  * 在元素被插入之前生效，在元素被插入之后的下一帧移除。

* ##### v-enter-active：定义进入过渡生效时的状态。

  * 在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

* ##### v-enter-to：定义进入过渡的结束状态。

  * 在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

* ##### v-leave-from：定义离开过渡的开始状态。

  * 在离开过渡被触发时立刻生效，下一帧被移除。

* ##### v-leave-active：定义离开过渡生效时的状态。

  * 在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

* ##### v-leave-to：离开过渡的结束状态。

  * 在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被删除)，在过渡/动画完成之后移除。



## 1.3、class添加的时机和命名规则

* ##### class的name命名规则如下：

  * 如果使用一个没有name的transition：
    * 那么所有的class是以 v- 作为默认前缀；
  * 如果添加了一个name属性：
    * 比如 `<transition name="why">`；
    * 那么所有的class会以 `why- `开头；



## 1.4、动画写法

* ##### transition动画：

  * ```js
    <transition>
        <h2 v-if="isShow">哈哈哈哈</h2>
    </transition>

    .v-enter-from, .v-leave-to {
      opacity: 0;
    }

    .v-enter-to, .v-leave-from {
      opacity: 1;
    }

    .v-enter-active, .v-leave-active {
      transition: all 2s ease;
    }
    ```

* ##### animation动画：

  * ```js
    <transition name="why">
        <h2 v-if="isShow">哈哈哈哈</h2>
    </transition>

    .why-enter-active {
      animation: whyAnim 2s ease;
    }

    .why-leave-active {
      animation: whyAnim 2s ease reverse;
    }

    @keyframes whyAnim {
      0% {
        opacity: 0;
      }

      50% {
        opacity: 0.5;
      }

      100% {
        opacity: 1;
      }
    }
    ```



## 1.5、同时设置过渡和动画（一般不设置）

* ##### 同时使用了过渡和动画：

  * 可能某一个动画执行结束时，另外一个动画还没有结束；
  * 会等待另个一个动画也执行完了，class才会一起消失掉；

* ##### 可以设置 type 属性为 animation 或者 transition 来明确的告知Vue监听的类型；

  * `<transition type="transition">...</transition>`
  * 当type属性里的动画完成，会强制终止另一个动画；



## 1.6、显示地指定动画时间

* ##### duration可以设置两种类型的值：

  * number类型：同时设置进入和离开的过渡时间；

    * ```vue
      <transition :duration="2000">...</transition>
      ```

  * object类型：分别设置进入和离开的过渡时间；

    * ```vue
      <transition name="cjf" :duration="{ enter: 1000,  leave: 1000}"></transition>
      ```

* ##### 注意：

  * 只有设置的时间比transition和animation动画的时间短才有效果，会打断原先动画的执行；
  * 只设置duration的时间是不生效的，要在css里也设置；



## 1.7、过渡的模式mode

* 两个元素之间切换的时候，进入和离开动画是同时发生的，会出现位置问题：

  * 如果不希望同时执行进入和离开动画，需要设置mode：
    * in-out: 新元素先进行过渡，完成之后当前元素过渡离开；
    * out-in: 当前元素先进行过渡，完成之后新元素过渡进入；

* ##### 示例：

  * ```vue
    <transition mode="out-in"></transition>
    ```

  * 动态组件的切换：

    * ```vue
      <transition mode="out-in">
          <component :is="isShow? Home: About"></component>
      </transition>

      //setup语法糖，is要被动态绑定，值不能为字符串；
      import About from "./components/about.vue"
      import Home from "./components/home.vue"
      ```



## 1.8、appear初次渲染

* 使得首次渲染的时候会执行动画；

* ```vue
  <transition appear>...</transition>

  // 不需要设置appear动画，会自动执行设置好的动画
  ```



## 1.9、列表的过渡

* `<transition-group>` 有如下的特点：

  * 默认情况下，它不会渲染一个元素的包裹器，但是你可以指定一个元素并以 tag 属性进行渲染；
  * 过渡模式不可用，因为我们不再相互切换特有的元素；
  * 内部元素总是需要提供唯一的 key 属性值；
* CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身；

* ```js
  <template>
    <div class="app">
      <button @click="addNumber">添加数字</button>
      <button @click="removeNumber">删除数字</button>
      <button @click="shuffleNumber">打乱数字</button>

      <transition-group tag="div" name="why">   // 可以添tag属性来添加包裹元素
        <template v-for="item in nums" :key="item">  // key不能有任何重复
          <span>{{ item }}</span>
        </template>
      </transition-group>
    </div>
  </template>

  <script setup>
  import { reactive, ref } from 'vue';
  import { shuffle } from "underscore";

  const nums = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  const addNumber = () => {
    nums.value.splice(randomIndex(), 0, nums.value.length)
  }

  const removeNumber = () => {
    nums.value.splice(randomIndex(), 1)
  }

  const shuffleNumber = () => {
    nums.value = shuffle(nums.value)
  }

  const randomIndex = () => {
    return Math.floor(Math.random() * nums.value.length)
  }

  </script>

  <style scoped>

  span {
    margin-right: 10px;
    display: inline-block;
  }

  .why-enter-from, .why-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .why-enter-to, .why-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .why-enter-active, .why-leave-active {
    transition: all 2s ease;
  }

  .why-leave-active {
    position: absolute;   // 删除动画和其他元素移动动画是同时进行的，删除的元素会占位，因此其他元素无法移动，需要给删除元素删除时添加绝对定位
  }


  /* 针对其他移动的阶段需要的动画 */
  .why-move {
    transition: all 2s ease;
  }

  </style>
  ```



# 十八、vue2-vue3响应式原理

## 1.1、vue2响应式原理

* ```js
  // 用来创建了一个Depend对象，用来管理对于对象属性的变化需要监听的响应函数：
  class Depend {
    constructor() {
      // 使用Set集合，使得收集到的相同函数只存留一个
      this.reactiveFns = new Set()
    }

    // 响应式依赖的收集
    depend() {
      if (reactiveFn) {  // 该判断是为了防止把赋值给变量的null添加到Set集合;
        this.reactiveFns.add(reactiveFn)
      }
    }

    notify() {
      this.reactiveFns.forEach(fn => {
        fn()
      })
    }
  }

  // 设置一个专门执行响应式函数的一个函数
  let reactiveFn = null
  function watchFn(fn) {
    reactiveFn = fn
    fn()
    reactiveFn = null  // 不设置为null的话，若有两个不同的对象，对第一个对象进行修改的过程中会把后一个函数添加到集合里接着遍历，会把下一个函数也执行；
  }

  // 对象的依赖管理，管理不同对象的不同依赖关系；
  // 封装一个函数: 负责通过obj的key获取对应的Depend对象；
  const objMap = new WeakMap()
  function getDepend(obj, key) {
    // 1.根据对象obj, 找到对应的map对象
    let map = objMap.get(obj)
    if (!map) {
      map = new Map()
      objMap.set(obj, map)
    }

    // 2.根据key, 找到对应的depend对象；
    let dep = map.get(key)
    if (!dep) {
      dep = new Depend()
      map.set(key, dep)
    }

    return dep
  }

  // 封装函数，针对所有的对象都可以变成响应式对象；
  // 方案一: Object.defineProperty() -> Vue2
  function reactive(obj) {
    // 遍历所有的key，并且通过属性存储描述符来监听属性的获取和修改；
    Object.keys(obj).forEach(key => {
      let value = obj[key]

      // 监听对象属性的变化以及收集相关的依赖；
      Object.defineProperty(obj, key, {
        set: function(newValue) {
          value = newValue
          const dep = getDepend(obj, key)
          // 调用属性对应的dep对象里的所有函数
          dep.notify()
        },
        get: function() {
          // 找到对应的obj对象的key对应的dep对象
          const dep = getDepend(obj, key)
          // 依赖收集
          dep.depend()
          return value
        }
      })
    })
    return obj
  }

  // ========================= 业务代码 ========================
  // 其他对象跟以下写法相同
  const obj = reactive({
    name: "why",
    age: 18,
    address: "广州市"
  })

  watchFn(function() {
    console.log(obj.name)
    console.log(obj.age)
  })

  // 修改name
  console.log("--------------")
  obj.age = 20
  ```



## 1.2、vue3响应式

* ```js
  // 用来创建了一个Depend对象，用来管理对于对象属性的变化需要监听的响应函数：
  class Depend {
      constructor() {
          // 使用Set集合，使得收集到得相同函数只存留一个
          this.reactiveFns = new Set()
      }

      // 响应式依赖的收集
      depend() {
          if (reactiveFn) {
              this.reactiveFns.add(reactiveFn)
          }
      }

      notify() {
          this.reactiveFns.forEach(fn => {
              fn()
          })
      }
  }

  // 设置一个专门执行响应式函数的一个函数
  let reactiveFn = null
  function watchFn(fn) {
      reactiveFn = fn
      fn()
      reactiveFn = null
  }

  // 对象的依赖管理，管理不同对象的不同依赖关系；
  // 封装一个函数: 负责通过obj的key获取对应的Depend对象；
  const objMap = new WeakMap()
  function getDepend(obj, key) {
      // 1.根据对象obj, 找到对应的map对象
      let map = objMap.get(obj)
      if (!map) {
          map = new Map()
          objMap.set(obj, map)
      }

      // 2.根据key, 找到对应的depend对象；
      let dep = map.get(key)
      if (!dep) {
          dep = new Depend()
          map.set(key, dep)
      }

      return dep
  }

  // 封装函数，针对所有的对象都可以变成响应式对象；
  // 方式二: new Proxy() -> Vue3
  function reactive(obj) {
      // 监听对象属性的变化以及收集相关的依赖；
      return new Proxy(obj, {
          set: function(target, key, newValue, receiver) {
              Reflect.set(target, key, newValue, receiver)
              const dep = getDepend(target, key)
              // 调用属性对应的dep对象里的所有函数；
              dep.notify()
          },
          get: function(target, key, receiver) {
              // 找到对应的obj对象的key对应的dep对象；
              const dep = getDepend(target, key)
              // 依赖收集；
              dep.depend()
              // 返回代理对象对应的属性值；
              return Reflect.get(target, key, receiver)
          }
      })
  }

  // ========================= 业务代码 ========================
  const obj = reactive({
      name: "why",
      age: 18,
      address: "广州市"
  })

  watchFn(function() {
      console.log(obj.name)
      console.log(obj.age)
      console.log(obj.age)
  })

  // 修改name
  console.log("--------------")
  obj.age = 20
  ```



## 1.3、对象的依赖管理

##### ****