---
title: 'Vue框架进阶'
---

vue2,默认是不支持index 文件名的，需要自动配置



# 一、插件

> Vue全局添加一些功能时，会采用插件的模式，通过use方法进行安装使用

- 插件可以**完成的功能没有限制**
- **添加全局方法或者 property**，通过把它们添加到 `config.globalProperties` 上实现；
- 添加全局资源：指令/过滤器/过渡等；
- 通过全局 `mixin` 来添加一些组件选项；
- 一个库，提供自己的 API，同时提供上面提到的一个或多个功能



### 1、对象类型

> 当传入的参数是一个对象的时候，**use方法会自动调用对象中的 install 方法，会将 app 实例传入形参。**

- 因此一个传入对象类型的话，**一定要有**一个 **`install` 函数**



### 2、函数类型

> 如果是函数类型，会**直接调用这个函数，将app 实例传入形参。**



# 二、自定义指令



## 1、指令的声明周期

- `created`：在绑定元素的 attribute 或事件监听器被应用之前调用；
- `beforeMount`：当指令第一次绑定到元素并且在挂载父组件之前调用；
- `mounted`：在绑定元素的父组件被挂载后调用；
- `beforeUpdate`：在更新包含组件的 VNode 之前调用；
- `updated`：在包含组件的 VNode 及其子组件的 VNode 更新后调用；
- `beforeUnmount`：在卸载绑定元素的父组件之前调用；
- `unmounted`：当指令与元素解除绑定且父组件已卸载时，只调用一次；



## 2、指令的参数和修饰符

> 自定义指令的声明周期函数，例：`mounted`，会将**当前的组件实例传入第一个形参**，**参数、修饰符和值**会<u>封装到一个对象(`options`)当中</u>，之后**传入第二个形参**

- 第二个参数通常称为 `bindings`



#### 参数

> 指令所**绑定的属性**称之为参数。

- **保存**在，`bindings` 对象当中，以**字符串的格式**进行存储到 **`arg` 字段**中



#### 修饰符

- 保存在，`bindings` 对象当中的 `modifiers` 字段当中

#### 值

> 属性绑定的值，**相当于进行 `v-bind`**，因此放入的值要**以 `js` 的语法格式进行书写**

- 保存在 `bindings` 的 `value` 字段中

#### 示例

~~~js
{
    //参数
    arg: "title"
    //指令对象
    dir: {mounted: ƒ}
    //当前组件实例对象
    instance: Proxy {…}
    //修饰符
    modifiers: {}
    oldValue: undefined
    //设置的value
    value: "zhangsan"
}

<template>
  <div class='info'>
     <span v-focus:title="'zhangsan'">{{message}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "zhangsan"
      }
    },
    directives: {
      "focus" : {
        mounted(el, bingings) {
          console.log(el, bingings);
        }
      }
    }
  }
</script>
~~~





## 3、配置自定义指令



### 自定义局部指令

#### options

- 通过 `directives options`选项进行配置

  ~~~js
  <script>
    export default {
      data() {
        return {
          message: "zhangsan"
        }
      },
      directives: {
        "focus" : {
          mounted(el, bingings) {
            console.log(el, bingings);
          }
        }
      }
    }
  </script>
  ~~~



#### composition

- **格式**：创建的对象标识符，一定要使用**小v**开头，**使用驼峰标识**。因为 js 不能使用连接符定义标识符，因此使用驼峰标识进行代替。

~~~~js
  const vFocus = {
    mounted(el, bindings) {
      el.focus()
    }
  }
~~~~



### 自定义全局指令

- 通常**使用插件的方式**进行**创建全局自定义指令**

  - 创建一个对象，导出，使用插件的方式获取到 app 实例之后，通过 `directive` 方法进行创建指令

    > 全局的方法都是没有带s的

    - 定义一个统一的出口文件，**定义 函数 或者 install对象统一接收app实例**
    - 之后**将其他创建的指令函数导入到出口文件**统一进行执行。

  - 参数：

    - 参数一：**指令的名称**，不需要添加 `v-` ， 只需要写 `v-` 后面的名字就好。
    - 参数二：指令对象

    ~~~js
    import dayjs from "dayjs";
      //导出到出口文件当中执行，接收app实例对象。
      export function formatTime(app) {
        app.directive("ftime", {
          mounted(el, bindings) {

            let str = bindings.value
            if (!str) str = "YYYY/MM/DD"
            const date = Number(el.textContent)
            if (date) el.textContent = dayjs(date).format(str);

          }
        })
      }
    ~~~



- main.js文件实现

  ~~~js
  const app = createApp(App)
  app.directive("focus", {
    mounted(el, bindings) {
      console.log(el, bindings);
      el.focus()
    }
  })
  app.mount('#app')
  ~~~





# 三、其他内置组件



## 1、router-view使用 keep-alive

> 在vue3 当中有了新的写法，不在推荐之前的写法了

- 推荐写法

~~~html
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
~~~



## 2、teleport

> Vue提供的内置组件，中文翻译，远距离传输，心灵传输。

- 简单来说就是**动态的移动元素或者组件所在 `domTree` 的位置**。

- 属性

  - to: 可以动态绑定

    > 但是**初始化的时候，要提供选择器**，否则会报错

    1. 参数即可以是**字符串选择器**，
  2. 也可以是**DOM元素对象**

  - disabled: 是否禁用 `teleport`。

  ~~~~html
  <template>
  <div class="box">
    <button @click="trigger">trigger</button>
    <about/>

      <teleport :to="origin">
        <home></home>
      </teleport>

    <h3 id="h3">hello word</h3>
  </div>
  </template>

  <script setup>
  import About from "@/02_vueInlay/about.vue";
  import Home from "@/02_vueInlay/home.vue";
  import {ref} from "vue";
  //点击将 teleport 传送到h3标签当中
  const origin = ref("body")
  function trigger() {
    origin.value = "#h3"
  }
  </script>


  ~~~~



## 3、suspense

> 主要的作用就是，在使用**异步组件**的同时由于网速的原因，导致**js下载慢异步组件没有办法立刻显示**到页面上，可以使用 `suspense` 组件来**显示一些其他的组件**例入 `Loading` 组件

- （2022-08-01）Suspense显示的是一个**实验性的特性**，API随时可能会修改。

- 会提供**两个**插槽，一个**default` `**插槽，另一个则是 **`fallback` 插槽**

  - **当** <u>`default` 不显示</u>的时候**就会显示 `fallback`** 。

  ~~~html
    <suspense>
      <template #default>
        <home></home>
      </template>
      <!--当default 不显示的时候 fallback就会显示-->
      <template #fallback>
        <div>Loading</div>
      </template>
    </suspense>
  ~~~



# 四、渲染函数

## 4.1、render函数(面试)

render 函数，**同 template 模板相同都是用来创建html模板的**，但是 render 更接近编译器因为template **最终也会解析生成渲染函数 render 函数**，生成虚拟dom， render会直接执行 h 函数创建虚拟dom，也可以说render()的作用就是执行 h函数生成虚拟节点对象。



## 4.2、h函数

> Vue推荐在**绝大数情况下使用模板语法**来创建HTML，但在一些特殊的场景，需要JavaScript的完全编程的能力，这个时候你以使用 渲染函数 ，它比模板**更接近编译器；**

- **重点理解**：h 函数的**目的**就是**手动编写 render函数**

- 原因是template 模板语法最后也**都会转换成渲染函数**进行执行**创建 `VNode` 和 `VDOM`**。

- vue 底层调用的是 createVNode() 函数，为了简便在vue当中使用所以**简化为 `h` 函数；**

  > 实际上两个函数是一样的。



### 1、h函数的参数

> h 函数会接收3个函数。

- 第一个参数：是字符串**标签名**

  > 第一个参数也可以是，`h('div#box.container', null, 'zhangsan')` 这种形式

- 第二个参数：用来添加**标签属性**，是 `Object` 类型的

  > 通常情况下，在不添加属性的时候，这个参数可以添加元素的内容，但是**为了阅读性，还是使用 null 占位**

- 第三个参数：就是**添加元素标签当中的内容**了，可以是字符串也可以是 **包含h函数的数组类型** 创建新的标签元素

~~~js
//第二个参数可以省略，一般不省略，图片的属性格式{prop: {href: "http://zhansan.com/avatar.png"}}
const Vnode = h('ul', null,
                  [h('1i',null,'苹果',
                      h('1i','西瓜'),
                      h('1i',null, [
                          h('div'),
                       h('div', null, [
                      h('el-tooltip', {
                          //注意这里的属性要在props里面
                        props: {
                          effect: 'dark'
                          placement: 'top-start'
                        }
                      }, [
                        h('el-button', null, 'trigger'),
                          //插槽属性为slot
                        h('div', {slot: 'default'}, '提示内容'),
                      ]),
                    ])
                          h('p','哈哈'),
                          h("button", { onClick: () => this.counter++, class: "button" }, "加 1"),
                          h('p','嘻嘻')
                             ]),
                      h('1i',h('p','火龙果'))
                    )
                  ])
~~~





### 2、h函数的基本使用

- **render函数是 一个`Options Api`** 在组件进行渲染的时候会进行调用，**来执行 h 渲染函数**



#### options Api

> 在options api 当中会有一个 **render 函数选项** 用来执行h函数

- 当添加组件的时候，不需要将组件在components 中注册了，因为组件不在用于template了，而是作用在 render 函数里

~~~js
export default {
  render() {
    return h("div", {title: "zhangsan", class: "box"}, ["这里是App", h(counterTest)])
  }
}
~~~



#### Composition Api setup 函数

- **注意点**：就是 `return` 返回的不在是一个对象了，而是一个函数



~~~js
export default {
  name: "setup-text",
  setup() {
    const counter = ref(0)
    return () => h("div", {class: "setupTest"}, ["这里是 setup 函数",
    h("div", {class: "content"}, `这里是setup函数计数器${counter.value}`)],
    h("button", {onClick: () => counter.value++}, "add"),
    h("button", {onClick: () => counter.value--}, "div")
    )
  }
}
~~~



#### 语法糖setup

- **特点**：就是还是需要使用template模板
- 定义一个函数，该函数返回一个h函数



~~~html
<template>
    <!--这里还是需要依赖template模板-->
  <render/>
</template>
<script setup>
import {h} from "vue";
const render = () => h("div", {class: "zhangsan"}, "这里是张三")
</script>
~~~



#### el-table render-header

1、`el-table-column 添加 :render-header="renderHeader"`

2、填写配置文件便利渲染

~~~js
import {Tooltip, Popover} from 'element-ui';

{
	text:'表头名字',
	filed: '填充列的字段',
	width: '160'
},
{
	text:'表头名字',
	filed: '填充列的字段',
	width: '160',
	render: (h, param) => {
		return h(Popover, {
			props:{placement: 'bottom', trigger: 'hover'}
		}, [
			h('p', {slot: 'reference'}, '触发的文字'),
			h('div', {content: ''}, 'hover显示的文字')
		]);
	}
},
{
	text:'表头名字',
	filed: '填充列的字段',
	width: '160',
	render: (h, param) => {
		return h('div', [
			h(Tooltip. {
				props:{placement: 'bottom'}
			}, [
				h('span', {style: {color: '#ccc'}}, '触发的文字'),
				h('span', {slot: 'content'}, 'hover显示的文字')
			])
		]);
	}
},
{
	text:'操作',
	fixed: 'right',
	width: '160',
	render: (h, param) => {
		const optArr = [];
		const btn = h('el-button', {
			props: {type: 'text'},
			on: {
				click: () => {
					this.handleOpt(param.row);
				}
			}
		}, '按钮');
		optArr.push(btn);
		return h('div', optArr, '');
	}
}

~~~



## 4.3、jsx

> 在vue中也可以使用jsx，但是需要添加对应的 jsx 的支持
>
> - jsx 表示的是 javaScript extension

- 要使用 **Bable 对应的插件来提供对 jsx 的支持**

- ##### webpack安装插件

  `npm install @vue/babel-plugin-jsx -D`

  - **配置**在`babel.config.js`配置文件中配置插件

    ```
    module.exports = {
      plugins: ["@vue/babel-plugin-jsx"]
    }
    ```



- ##### vite 安装插件

  `npm install @vitejs/plugin-vue-jsx -D`

  - **配置**：在 `vite.config.js` 中进行配置

    ~~~js
    import { fileURLToPath, URL } from 'node:url'

    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    //导入jsx插件
    import jsx from '@vitejs/plugin-vue-jsx'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        vue(),
        jsx()//这里进行注册
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    })

    ~~~





- ##### 使用jsx

  - **注意**：
    - **一定要** script 标签上面**添加 `lang="jsx"`**。
    - **同时只能有一个根**
  - **另外**：在jsx 里面写js 代码**统一使用 {} 单个大括号。**
  - return 后面的() 表示一个整体
  - **总结**：`setup` 函数 返回的是一个**函数**，`render` 返回的是一个**()**，**`setup` 语法糖，同样还是借助`template`**

  ~~~typescript
  <script lang="jsx">
  //options Api写法
  import {ref} from "vue";
  export default {
    setup() {
      const counter = ref(0)
    },
    render() {
      //这里使用 （） 表示下面的代码是一个整体
      return (
          <div>
            这里是jsx函数
          </div>
      )
    }
  }
  </script>

  <!--setup 函数-->
  <script lang="jsx">
  import {ref} from "vue";
  export default {
    name: "stepJsx",
    setup() {
      const counter = ref(0)
      function increment() {
        counter.value++
      }
      function decrement() {
        counter.value--
      }
      return () => (
          <div className="box">
            <span>
              测试setupjsx计数器 {counter.value}
            </span>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
          </div>
      )
    }
  }
  </script>



  <!--composition Api语法糖写法,还是要依赖template-->
  <template>
    <jsx/>
  </template>
  <script lang="jsx" setup>

  const jsx = () => (
      <div>zhangsan</div>
  )
  </script>
  ~~~





# 五、vue中的动画



## transition组件

- `React` 框架本身并没有提供任何动画相关的 `API`，所以在React中使用过渡动画我们需要使用一个第三方库 `react-transition-group`；

- `Vue` 中为我们提供一些**内置组件和对应的API**来完成动画，利用它们我们可以方便的实现过渡动画效果；

- 可以通过 `transition` 组件来完成

  - 条件渲染 (使用 `v-if` )条件展示 (使用 `v-show`)

  - 动态组件

  - 组件根节点

  - `routerView` 切换

    > 需要指定组件动画，可以直接包在根下面

- 插入或删除**包含**在 `transition` 组件**中**的元素时
  1. 自动嗅探目标元素是否应用了`CSS` 过渡或者动画，如果有，那么在**恰当的时机添加/删除 CSS类名；**
  2. 如果 `transition` 组件提供了**JavaScript钩子函数**，这些钩子函数将在**恰当的时机被调用**；
  3. 如果**没有找到** `JavaScript` 钩子 **并且也没有检测到** `CSS` 过渡/动画，`DOM` 插入、删除操作将会**立即执行**；



### 过渡动画class

- `v-enter-from`：定义进入过渡的开始状态。

  > 在元素被插入之前生效，在元素被插入之后的下一帧移除。

- `v-enter-active`：定义进入过渡生效时的状态。

  > 在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

- `v-enter-to`：定义进入过渡的结束状态。

  > 在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

- `v-leave-from`：定义离开过渡的开始状态。

  > 在离开过渡被触发时立刻生效，下一帧被移除。

- `v-leave-active`：定义离开过渡生效时的状态。

  > 在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

- `v-leave-to`：离开过渡的结束状态。

  > 在离开过渡被触发之后下一帧生效 (与此同时 `v-leave-from` 被删除)，在过渡/动画完成之后移除。



### class添加的时机和命名规则

- 当 `transition` 组件没有设置的情况下，所有的 `transition` 组件相关的 `class` 都会以 `v-` 开头

- 当有 `name` 属性的时候，会以 `name` 的属性值作为标识符的开头 **例**：`wyn-leave-from`

- 例：

  ~~~less
    .v-leave-to,
    .v-enter-from {
      opacity: 0;
    }

    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }

    .v-enter-active,
    .v-leave-active{
      transition: all .5s;
    }
  ~~~



### transition 组件的其他属性和回调钩子

- `type`：指定 `transition` 、  `animation`，以那个动画的执行时间为主

  > 当两个动画时间不一样的时候，可以设置。

  - 通常不会设置，**保证两个动画时间一致就好了**

- `duration`：持续时间，会以组件属性的时间为标准，时间到了即使动画有没有完成都会结束

  - 通常不设置。

- `mode`(重要)

  > 当实现两个元素**同时**在进行**切换动画**的时候，进入和离开都是在同一个时间执行的。

  - `in-out:` 新元素先进行过渡，完成之后当前元素过渡离开；
  - `out-in:` 当前元素先进行过渡，完成之后新元素过渡进入；

- `appear` (重要)：**布尔类型**初次渲染，`transition` **默认**只**会在切换的时候进行动画**，并不会一开始就执行。

  > appear 可以让 `transition` 立即执行

- 回调钩子函数

  ~~~html
  <transition name="yn" @after-leave="afterLeave" @before-enter="afterLeave">
    <span v-if="isShow">
      这里是东规划
    </span>
  </transition>
  ~~~





## transition-group

> `transition` 组件只是**针对**单个组件，也就是说一个 `transition` **只能有一个根元素**。否则会编译报错



### 特点

> 可同时给**一组元素添加动画**

- 事件和 `transition` 相同，用来做**列表过渡。**

- **注意：**`transition-group` 包裹的元素**一定**要指定一个 **`key`**

  > 过渡组是给指定的key，添加动画的，因此**一定不能重复**，也**不可以使用index当作key**



- **tag属性**：`transition-group` 不是一个容器，但是 有一个 **tag 属性可以指定渲染之后的元素类型**，例：`tar="div"`

- **没有 mode 属性**！！！

- **重要：**会存在一个 `move` class 例：`v-move`

  > 定义**元素移动**时的css，通常添加过渡动画。

  ~~~less
  //会在元素移动的时候，添加过渡动画。
  .why-move {
    transition: all 2s ease;
  }
  ~~~

- **在元素消失的时候，添加绝对定位**，不然在移动元素并且有占位的情况下会挡住其他元素的移动，导致动画失效

  ~~~less
  .yn-leave-active {
    position: absolute;
  }
  ~~~





# 六、vue2、3响应式原理

> vue2 的就是使用for 循环和 属性描述符 `defineProperty` 来收集和监听依赖

- `注意`：`reactiveFn` 用的很妙但是在使用的时候记得判空

~~~js
//定义响应式类
class Depend {
  constructor() {
    this.arr = new Set()
  }
  //依赖收集函数
  depend() {
    if(reactiveFn) {
      //使用set 数组，方式一个侦听器里面存在多个相同调用，从而添加多个重复的调用
      this.arr.add(reactiveFn)
    }
  }

  //更新依赖
  notice() {
    this.arr.forEach(fn => {
      fn()
    })
  }
}

let reactiveFn = null;

//侦听器，侦听指定范围的依赖
function watchDep(fn) {
  //这里的reactiveFn 用的很妙但是在使用的时候记得判空
  reactiveFn = fn;
  fn()
  reactiveFn = null
}

//核心收集依赖函数
//使用weakmap 如果有一天传入的obj = null 会自动回收里面的函数对象，否则会一直存在引用。
const objMap = new WeakMap()
function getDepend(obj, key) {
  //一个map 对应这一个对象, map 中的键值对，表示对象中属性对应的依赖
  const map = objMap.get(obj)
  if(map) {
    let dep = map.get(key)
    if(dep) return dep
    else dep = new Depend()
    map.set(key, dep)
    return dep
  } else {
    const map = new Map()
    const dep = new Depend();
    map.set(key, dep)
    objMap.set(obj, map)
    return dep
  }
}

//监听属性更新
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const dep = getDepend(target, key)
      const falg = Reflect.set(target, key, value, receiver)
      dep.notice()
     return falg
    }
  })

}

console.log("------------------------------------------------------------")

const obj = reactive({
  name: "zhangsan",
  age: "123",
  address: "天津系"
})

watchDep(() => {
  console.log(obj.name)
  console.log(obj.name)
  console.log(obj.age)
  console.log("==============")
})

obj.name = "张三"
~~~





# 七、打包、vant 推荐插件



~~~shell
npm install postcss-px-to-viewport --save-dev
~~~



~~~js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
        //设计稿尺寸
      viewportWidth: 375,
    },
  },
};
~~~



# 八、注意事项(重点)

1. 当页面**滚动事件**的使用**不要绑定 windows**

   > 因为绑定了windows 之后，所有的页面都会绑定windows，当切换到了另一个页面之后也会生效。



2. 当组件进行切换位置的时候，就算有缓存的情况下也不会记录当前滚动的位置

   - 解决可以调用 `onActivated` 记录当前位置，之后直接 `scrollTo({top})`, 到指定的位置

3. v-if 的**判断异步数据**存在的时候，显示组件，那么v-if 判断的组件， **onMounted内也不会保证一定可以获取。**

   - 决定什么时候渲染的异步数据什么时候返回决定的的，可以在 onupdate 生命周期中获取



4. 在进行动态绑定路径的时候，vue 不能直接读取路径需要手动进行格式化处理

   - `webpack` 中可以直接通过 `require` 方法进行处理

   - `vite` 中处理 URL **是vite 中的类**

   ~~~js
   export function formatImgUrl(path) {
     //  import.meta.url 表示当前 js 模块的url，http://127.0.0.1:5173/src/utils/formatImgUrl.js?t=1659791413621
     // new URL 会将传入文件的路径转换成 url 而不是path，保存在href 属性当中
     return new URL(`../assets/img/${path}`, import.meta.url).href
   }
   ~~~




### 动态加载静态资源失败

> 问题：直接在js文件中定义图片路径，并赋给图片元素的话不能正常显示的



- webpack对于资源文件的处理

  >当你在 JavaScript、CSS 或 *.vue 文件中使用相对路径 (必须以 . 开头) 引用一个静态资源时，该资源将会被包含进入 webpack 的依赖图中。在其编译过程中，所有**诸如** `<img src="…">、background: url(…)` 和 CSS @import 的资源 URL **都会被解析为一个模块依赖**。



- webpack会将图片当做模块来用，**而{{}}表达式只会在渲染到页面上的时候执行**，因此执行的时候都打包完了

- 这样在渲染的时候就是相对路径了



- 解决方案

- 在 `webpack` 中有提供 `require` 方法可以通过该方法将图片当作模块动态导入

~~~js
    <img :src="require(./assets/image.png)" alt="">
~~~

- 在vite中就没有这个方法了，只能使用 node URL类进行组装url

~~~js
export function formatImgUrl(path) {
   //import.meta.url路径获取当前模块的url
  return new URL(`../assets/img/${path}`, import.meta.url).href
}
~~~



# 九、nexttick

> Vue 在修改数据是异步的，视图**不会**立刻更新，而是等同一事件循环中的所有**数据变化完成之后**，再统一进行视图更新.它是`当前异步更新队列`循环结束之后的回调函数。

- 官方解释：将回调**推迟到下一个 DOM 更新周期之后**执行。在更改了一些数据以等待 `DOM` 更新后立即使用它。
- 参数 callback， 返回值Promise

- options Api

  ~~~js
  this.nextTick()
  ~~~

- Composition Api()

  ~~~js
  import {nextTick} form "vue"
  nextTick()
  ~~~



### 使用场景

> `vue`中的 `nextTick` 主要用于**处理数据动态变化后**，`DOM`还**未及时**更新的问题，用`nextTick`就可以获取数据更新后最新 `DOM` 的变化

- 当元素被重新渲染了，想要立刻拿到渲染后的元素
- `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`
- 在希望所有子组件加载完成时进行某些操作时，可以采用
- 在 `created` 和 `mounted` 阶段，如果需要操作渲染后的视图，可以使用 `nextTick` 方法。





# 十、vue-lazyload 图片懒加载

1. 安装

2. 导入

3. `app.use` 配置 `options` 选项

   - 配置 `loading` 选项

     ~~~js
     {
         loading: require("图片路径")
     }
     ~~~



4. `img:src->v-lazy`



