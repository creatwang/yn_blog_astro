---
title: 'Vuex状态管理'
---

# 第一节、Vuex状态管理

> 在应用当中的对于数据在不同的逻辑下会有不同的改变状态，这样的数据就称之为状态，在一个应用程序中**对于其数据的管理**就称之为是 **状态管理。**

- 在vue 开发的应用程序中，会使用 vuex 进行管理这些数据，通过单一状态树的模式**统一存储**，并且**针对这些数据进行统一的管理**



## 状态管理的作用

> 在现阶段的前端开发当中，**服务器**返回的数据、**缓存**数据、用户**操作产生的数据**等等；
> 也包括一些**UI的状态**，比如某些元素是否被选中，是否显示加载动效，当前分页；



- 在vue 中进行**数据的共享**，是**单向数据流**的，
- **当多个视图依赖于同一状态**，使用父子组件 或者 依赖注入 **很难保证多个组件之间可以共享数据**



- 这个时候就需要一个可以**在全局进行数据共享并管理数据状态的**的工具**Vuex**

  > **用于管理整个应用的数据状态，以及数据共享**，任何组件都能获取状态或者触发行为。使代码变得更加**结构化和易于维护、跟踪；**



- 目前推荐pinia



## 组件仍然保有局部状态

使用 Vuex 并**不意味**着你需要**将所有的状态放入 Vuex**。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，**最好还是作为组件的局部状态**。你应该根据你的应用开发需要进行权衡和确定



## 基本使用

1. `npm install vuex`

2. 导入构造函数 `import {createStore} from "vuex"`。

3. **创建  store 存储对象**，通过 `options` 对象进行相关配置

   ~~~js
   import {createStore} from "vuex"
   export const store = createStore({
     state() {
       return {

       }
     },
     mutations: {
       setRemoveRoute(state, payload) {
         Object.entries(payload).forEach(val => {
           const [key, value] = val
         this.state[key] = value
         })
       }
     }
   })
   ~~~

4. 之后进行到出并在**主入口文件当中进行注册、**

   ~~~js
   const app = createApp(App)
   //进行注册使用
   app.use(store)
   ~~~





# 第二节 Store(存储)

> 作用：	store本质上是一个**容器**，它包**含着应用中大部分的状态**，和其**进行管理的Api**



## 单一状态树

> vuex采用的是SSOT，Single Source of Truth，也可以翻译成单一数据源；用一个对象就**包含**了**全部的应用层级的状态**，简单说所有的数据**都会由这一个对象进行管理**

- 意味着，每个应用将仅仅包含**一个 store 实例**



### 单一状态树的优势

- 如果状态信息是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难
- 在单一状态树的情况下，维护和调试过程中，可以非常方便的管理和维护
- 能够以最直接的方式找到某个状态的片段





# 第三节、state状态

> state的定义：在整个应用中，**所有需要使用到的数据都称之为state**

- 用于**定义和存储，所有的需要用的状态数据**；
- **特点**：- state的状态存储都是**响应式的**



## 一、创建state

> `state` 在配置的时候**是一个函数**，并且**返回一个包含所有状态的对象**。



- **注意**：**不可以直接修改 state 当中的状态**，否则 `devTool` 监听不到数据的修改

  > 这样的话在全局数据都在进行传输的时候，会**无法确定在那个节点会进行修改，无法排查到意外的发生。**

  - **要通过 `mutations` 选项进行修改**




- **在 state 保存的数据都是响应式的**

  ~~~js

  import { createStore } from "vuex"
  export const store = createStore({
    state() {
      return {
  	  //添加你所需要的时候，或者通过 mutations 动态添加数据
        counter: 0
      }
    }
  })

  ~~~



- ##### 赋值的数据不是响应式的，同理只是响应页面



## 二、options Api

> 在`options Api` 当中可以**通过全局对象 $store.state 直接进行获取数据。**



#### template 模板当中基本使用

~~~html
<template>
<div>
  这里是home
  {{$store.state.counter}}
</div>
</template>
~~~



#### options 中使用

> 因为 store 被**注册到 vue 当中**，所以需要通过`this`进行获取

~~~js
  computed: {
    counter() {
      return this.$store.state.counter
    }
  }
~~~



#### mapState 辅助函数

> 当需要获取的数据很多的时候，需要频繁的编写  `this.$store.state` 进行调用，这样会写很多的重复代码，会很不方便。



- ##### 为什么 mapState 会放到 computed 里？

  > 关键在与 `data` 的执行时机，是在组件创建前，调用的且调用一次，之后的 state 变化的话就不会更新data属性了，computed 会根据依赖的改变而重新计算



- 这个时候可以使用 `mapState` 函数。

  > 可以**一次性和 state 建立多条映射关系。**批量获取 `state`



- 参数

  - **第一个参数(可选)**：命名空间

    > 这些函数来**绑定带命名空间的模块时**，写起来可能比较繁琐，可以将命名空间写到第一个参数当中

    ~~~js
      ...mapState({
        a: state => state.some.nested.module.a,
        b: state => state.some.nested.module.b
      }),
      //多个模块的时候添加命名空间
      ...mapState('some/nested/module', {
        a: state => state.a,
        b: state => state.b
      }),
    ~~~



  - **第二个参数**：参数类型：`Array|Object`



- 返回值：包含 `function` 的对象类型。

  > 通常直接 **解构到 计算属性当中进行使用**，会将传入的属性名进行映射作为返回函数的名字，这样调用的时候**直接使用映射的 `name` 即可**

  ~~~html
  <template>
  <div>

    <div>{{name}}</div>
    <div>{{age}}</div>
    <div>{{firends}}</div>

  </div>
  </template>

  <script>
      //导入 mapState
  	import { mapState } from "vuex";
      export default {
        name: "home",
        computed: {
          counter() {
            return this.$store.state.counter
          },
          //数组类型的用法
          ...mapState(["name", "age", "firends"])
          //对象类型，一般用于 ... 解构出来的变量和 data 或者 计算属性当中的数据产生了冲突，进行重命名
          ...mapState({
           // 一般这种方法知识在进行某个量冲突的时候使用，因为写起来并不省事。
           //参数：是state 对象。
           newAddr: state => state.addr
               })
        }
      }
  </script>

  ~~~





## 三、Composition Api

> 需要先导入对应的 useStore hook 执行之后返回 store实例对象。



#### template基本使用

- 注意事项：**store 如果使用解构的方式**，返回的数据进行修改**不是响应式的**

  > **(重点)需要使用 toRefs 方法配合解构**

  ~~~html
  <script setup>
  import {useStore} from "vuex";
  const addr = useStore().state.addr

  //这里解构的数据不会是响应式的
  // let { name } = store.state
  //需要使用
  let { name } = toRefs(store.state)
  const inp = ref()
  function trigger() {
    name.value = inp.value.value;
  }
  </script>
  ~~~



- **在 `template` 模板上使用的方式都是相同的。**



#### 在 setup 函数当中使用 mapSate

> 由于 `mapState` 是用来辅助 `options Api` 的所以在 `setup` 函数中使用会相对麻烦一点。因此推荐直接使用 `toRefs` 和 解构 进行批量获取。



- 由于 `mapState` 会返回一个函数，因此在执行获取值的同时，**还需要将其绑定`this`**

  > 通常使用计算属性进行封装

  ~~~js
  //使用 mapState
  let {firends} = mapState(["firends"])
  //需要绑定this，之后还得手动使用计算属性进行响应式处理
  const  ss = computed(() => firends.call({$state: store}))
  ~~~





#### 在 setup 函数当中使用 toRefs

> 在组合函数当中，通常使用toRefs 的方法进行解构批量获取。

~~~js
import { useStore} from "vuex";
import { toRefs} from "vue";
const store = useStore()

//这里解构的数据不会是响应式的
// let { name } = store.state
//需要使用
let { name } = toRefs(store.state)
~~~





# 第四节、getters

> 当实现的功能需要，多个state进行计算后的数据，可以**在 getters 中进行对state基础数据的封装。**



## 一、getters原理(重点)

- **封装规则**：在使用 `getters核心` 的时候，会将 `getters核心` 里面的函数**先进行执行**，之后将**方法名作为`key`**，执行之后的**返回值作为`value`**，封装为一个以 `getters核心` **的选项名`getters` ** 命名的对象，之后通过 `$store.getters` 获取这个对象

  > **因此**：当**返回一个函数**的时候，最后**封装到 `getters` 对象里面的也是函数**。返回**属性的时候**保存的**就是属性**

  - 所以当使用 `getters` 对象的时候，可以**像属性一样直接 "." 获取**，函数的话需要调用



- **响应式**：默认 `getters` 对象当中的属性都是**响应式**的，但是同方法一样，**当多个标签绑定相同的getters 的时候会调用多次**



  - 这样在，**响应式修改**的时候，**又会重复调用多次**。

    > 因此：`mapGetters` 会**批量返回多个函数，放到 `computed` 当中，可以添加缓存，避免重复调用**。



  - 所以在使用过程中，使用**频率过高**的 `getters` 可以用计算属性进行处理



- `setup` 函数中使用：结合上面的描述，使用**频率过高**的情况下，还是需要**使用 `compute` 函数处理一下**
  - 使用**频率不高**的话直接，`toRefs()` 和 `reactive()` **进行解构**直接使用就好。
  - 使用**频率过高**的情况下，**并且需要批量获取 getters** 的情况下，就需要**结合 mapGetters 和 compute 函数，来封装一个 hook 了**。



- **缺点(重要也是和pinia getters 的区别)**：无论是**返回函数的方式**，还是**普通封装成属性的方式**，**都会在标签复用的时候都会重复调用多次**进行**更新数据**



## 二、getters 的使用

> **提示（知识点）**：默认的 `getter` 是**响应式**的，**但没有缓存会调用多次**，无论是属性，还是函数的方式





### 1、store 定义getters

- **option 类型**：`Object`，

- **参数**：

  - `state`：`store` 的 `state`
  - `getters`：**可以理解为封装之后的 `getters` 对象**，用来获取其他的`getters`

  > 在局部 `module` 的 `getters` 中还会有 `rootState` 和 `rootGetters`，参数。



- 在调用的时候是**通过属性的方式**获取值的，不需要添加小括号，

  - 支持**返回值函数的写法**，当 getter 传入参数的时候，**参数会传入返回的函数中**

  ~~~js
    getters: {
      //通过 state 获取需要的状态
      getListTotal(state, getters) {
      const total = state.list.reduce((prval, currentVal, index, arr) => {

          return  prval + currentVal.price
        }, 0)
        return total
      },

      //两个参数，getters 可以调用其他的getter，在调用不需要使用()调用，想计算属性一样
      getDetal(store, getters) {
        return `${store.name} 查看全部的电影 全部看完需要 ${getters.getListTotal} 人民币`
      },

      //getters 支持返回函数方式的写法
      findMovie(state, getters)  {
        //这样在调用的时候可以使用函数的方式进行调用，name是传入的参数
        return function (name) {
          state.list.find((value, index,array) => {
            return value === name
          })
        }
      },

    }
  ~~~



### 2、options 中使用

> 通过 this.$store.getters.语法 进行获取封装之后的数据。



#### temmplate基本使用

~~~html
<template>
<div>
  {{$store.getters.getDetal}}
</div>
</template>
~~~



#### mapGetters 辅助函数

> mapGetters 会**返回多个函数**，**解构到 compute 当中添加缓存**，可以**提高性能**

- **参数**：

  - **参数一(可选)**：命名空间字符串

    > 用于**简化命名空间的一种写法**。

    ~~~js
      //这样每次获取命名空间的时候太过于繁琐
      ...mapGetters([
         'some/nested/module/someGetter', // -> this['some/nested/module/someGetter']
         'some/nested/module/someOtherGetter',
      ])


      //简化命名空间写法
      ...mapGetters('some/nested/module', [
        'someGetter', // -> this.someGetter
        'someOtherGetter', // -> this.someOtherGetter
      ])
    ~~~



  - **参数二**：**Array|Object**

    > **注意**：这里对象写法和 `state` 有些不一样

    ~~~js
      computed: {
        movie() {
          return this.$store.getters.findMovie("进击的巨人")
        },
        //数组类型写法常用
        ...mapGetters(["getListTotal"]),
        //对象类型解决 命名冲突的问题
        ...mapGetters({
          //把 `this.getDetals` 映射为 `this.$store.getters.getDetal`
          getDetals: "getDetal"
        })
      }
    ~~~





### 3、Setup 函数中使用

#### useStore基本使用

~~~js
//导入useStore hook
import {mapGetters, useStore} from "vuex";
//返回一个store 存储对象
const store = useStore()
//进行获取
const getDetals =store.getters.getDetal
~~~



#### mapGetter 配合 compute 函数

- 在 `composition Api` 中使用，mapGetter，因为获取不到 `this.$store` 因此需要手动绑定，比较繁琐
- **注意**：这里如果要手动封装的话要**用计算属性手动进行处理**，**否则重复使用的话没有缓存会调用多次**
- **提示**：最好**不要替换源对象的getters属性**，虽然可以实现，也很简便，但是是**不规范的**

> 如果需要使用 mapGetter 可以单独封装一个hook。

~~~js
const newList = mapGetters(["getListTotal", "findMovie", "getDetal"])
Object.keys(newList).forEach((value, index) => {
  newList[value] = computed(newList[value].bind({$store: store}))
})
console.log(newList);
~~~



#### reactive 配合 toRefs 写法

> 通过此方法虽然可以批量获取getters，但是并没有缓存**标签重复引用**的话，会**触发多次**

- 由于解构对象会将值，赋给了一个普通的变量因此响应式会失效

  > **注意**：在**使用toRefs 解构函数**的时候需要 **需要使用 reactive 包裹**，否则**会报错**并且不是响应式的

~~~js
const store = useStore()
const getDetals =store.getters.getDetal
//这里要将解构的对象，经过 reactive 处理
const { getListTotal, findMovie } = toRefs(reactive(store.getters))
~~~





# 第五节、mutations

> **更改** Vuex 的 **`store`** 中的状态**的唯一方法是提交 mutations**。也就是只要是修改 store 中的 state 状态**都要使用 mutations进行修改。**

- 使用 `mutations` 修改 `state` **主要的作用**就是可以**使 `devTool` 工具可以进行跟踪数据**

  > 否则的话，无法确认state 在什么逻辑下会进行修改，会很难排查问题。

- **注意**：`mutations` 中的函数**一定要是同步的函数**，因为如果是异步函数的话，devTools的回调会无法进行跟踪。



## 一、创建 mutations

> 在 store 配置对象中添加 `mutations` 选项

- **参数一**：**state 对象**

  > 在`mutation` 中也可以通过 `this.state` 但是**不规范。**

- **参数二**：当 `$store.commit()` **提交的时候传入的参数**

~~~js
    mutations: {
      trigger(state, paylod) {
        state.list.push(playlod)
        console.log(state.list);
      },
    }
~~~



## 二、使用mutations

> 通过 `$store.commit()` 方法进行调用

- **commit() 基本使用**

  - **参数一**：**`string` 类型**，准备调用 mutations 的key

  - **参数二**：`payload`，给 `mutations` 中函数，传的参数

    > 多条数据的情况下，可以**传入一个对象**



- **commit() 对象风格调用**

  > 可以传入一个**配置对象**，commit 会**根据 type 属性**来调用**对应的 mutations**，**整个对象都作为载荷传给 mutation 函数包括type。**

  ~~~js
  store.commit({
    type: 'increment',
    amount: 10，
    produce: "ssss"
  })
  ~~~



### Mutation常量类型(重要规范)

> 由于 `commit` 是通过 `String` 的 `key` 进行调用指定的 `mutation` 函数，那么可以通过**定义相同的常量来作为 mutations 中函数的 key** ，这样可以**减少**在 `commit` 调用时因为**写错 `key` 而发生的错误**。

- 在 module 文件夹下创建 `mutation_types.js` 文件

~~~js
const TRIGGER_BTN = "trigger"
//需要调用该方法的时候可以进行导入常量，进行调用
export {
  TRIGGER_BTN
}
//调用的时候额可以，传入常量，这样可以点少错误
this.$store.commit(TRIGGER_BTN)
~~~



## 三、mapMutations辅助函数

> **主要是方便在 options Api 当中**，可以**直接解构在 methods 选项当中**就可以直接调用，但是在 **`setup`   函数 **中使用的话就不是很便捷了，因为不能 `this.$store`。

- `mapMutations` 会**根据 `key` 批量返回对应 key 的`mutations` 中的函数**



### options 中使用

> 可以直接解构到 `methods` 中，这样的话可以**直接使用 v-on帮定这个函数**。避免更多的重复代码声明

- 同 mapGetters **第一个参数可选，是 `moudle` 的命名空间**

~~~javascript
import {mapMutations} from "vuex";
import {EDIT, PUSH_LIST} from "../module"
export default {

  name: "mutationTest",
  methods: {
    ...mapMutations([EDIT, PUSH_LIST])
      //命名冲突的话也有对象的形式
    ...mapMutations({newExit: EDIT})

  }

}
//命名冲突的话也有对象的形式
~~~



### setup 函数中使用

> 这个就不能解构了，因为全是函数，this的指向全部都是 $store找不到就报错

- `npm install "yanan.wang/mapAux"` 使用这个库

~~~js
//或者手动封装
function  mapAuxGetters (arguArr) {
  const store = useStore()
  const computeGetters = {}
  const getters = {...mapGetters(arguArr)}
  Object.keys(getters).forEach(key => {
      computeGetters[key] = computed(getters[key].bind({$store: store}))
  })
  return computeGetters
}
~~~





# 第六节、actions

> actions配置选项是用来执行，异步请求的。

- **区别(面试)：**`Action` 类似于 `mutation`，不同在于：

  - `Action` **提交的是 `mutation`**，而不是直接变更状态。

    > action 不会直接修改 state，要通过 mutations 进行修改，mutations 是直接修改state的。

  - `Action` 可以**包含任意异步操作。**



- **使用场景**：当发送异步请求获取数据的时候，如果需要和子组件或者其他组件**共享数据**的话，可以直接通过 **dispatch 直接添加到 store** 中同样是响应式了。就**没有必要在添加到 data** 当中，在<u>使用其他方法进行复杂的数据传递</u>

  > 就是需要共享的数据，可以直接塞入state中



- **提示**：提示一下action 修改state ，要通过mutations



## 一、配置 actions

- ###### 参数：context 当前上下文对象

  ~~~js
  {
    state,      // 等同于 `store.state`，若在模块中则为局部状态
    rootState,  // 等同于 `store.state`，只存在于模块中
    commit,     // 等同于 `store.commit`
    dispatch,   // 等同于 `store.dispatch`
    getters,    // 等同于 `store.getters`
    rootGetters // 等同于 `store.getters`，只存在于模块中
  }
  ~~~



- ###### 配置 actions 选项(重点回顾下)

  > 在定义 action 的时候，**通常都是异步的**，可以**通过异步函数async** 或者 **返回一个 promise 进行回调**，获取结果

  ~~~js
    actions: {
   //基本使用
      findMultpateAction(ctx, payload) {
        return fetch("http://123.207.32.32:8000/home/multidata").then(data => data.json())
      }
  //也可以手动的返回一个 Promise 的实例对象
      async findMultpateAction({commit}, payload) {
        const json = await fetch("http://123.207.32.32:8000/home/multidata")
        const data = await json.json()
        commit("addBanner", data)
        return data
      }
    }

  //调用的时候就可以监听了
   store.dispatch("findMultidata").then(data => console.log(data))
  ~~~

### 命名规范：声明方法后添加Action



## 二、使用



### 基本使用

> 经过测试，`dispatch` **默认会返回一个promise 的实例对象**。同异步函数的返回值相似。

- 使用 dispatch 方法：同mutations 调用一致，**传入String 类型的key，调用指定的 action**
  - 同样**也支持对象风格的调用**
- 注意：options中 使用的 this.$store.dispatch 方法，调用过程一致

~~~js
 //发送异步请求
 store.dispatch("findMultidata").then(data => console.log(data))
 //传入参数 , 包括type 都会被当作 payload 进行传入
 store.dispatch({
    type: "findCtx"
    name: "zhangsan"
  })
~~~





### mapActions辅助函数

> 同样主要给**options 提供的辅助函数**，和 `mapMutations` 一样解构到 `methods` options中进行使用。



#### options

> 使用方法同上面相同。参数分别为，`Array` 和 `Object`，**第一个参数( 可选 )Sting类型的 命名空间。**

~~~js
  methods: {
    trigger() {
      this.findMultidata().then(data => console.log(data))
      this.Ctx({movie: "雾山五行", price: 67})
    },
    ...mapActions(["findMultidata"]),
    ...mapActions({Ctx: "findCtx"})
  }
~~~



#### setup

> 在s etup 中则需要**手动指定下this为{$store: store}**

- **和 `mutations` 封装相同。**





# 第七节、module

> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，**会让store显得很臃肿** 。在这个状态管理当中，可以**将每 store 分成几个小的 `module**`，既**方便对数据进行拆分**，也可以**避免**整个项目数据非常多的情况下错综复杂，同时**方便管理**，也**提高的代码的封装性，降低复杂度。**

- **对象类型**

- 且每个模块都拥有**自己的** `state`、`mutation`、`action`、`getter`、通过**嵌套子模块**方式，实现了单一状态树

  > 就是**新建个 store 的配置对象(可以配置所有的选项)**，导入到 `modules option` 中配置

  ~~~js
  export default {
    state() {
      return { //自定义一些数据
        recommend: [
          {name: "家电"},
          {name: "宠物"},
          {name: "家具"},
        ]
      }
    }
  }
  ~~~



- **配置：**

  ~~~js
    import base from "./module/base";
   //key 定义是模块名，value 是导入的 store 对象
    modules: {
      base: base
    }
  ~~~





## 调用Module state

> 在 `store` 对象中要获取 模块对象的话**需要 `$store.模块名.状态名`，之后才可以获取到state**

- 在进行获取 `state`  的时候，vuex会**将 moduls options 中的属性**，也就是**模块对象**，**添加到 $store.state 对象中**

  > 所以获取模块当中的state，需要先 `.模块`。

  ~~~js
  this.$store.state.base.recommend
  ~~~



- **注意（冲突）**：因此造成的原因，**模块声明** 会和 **state 的声明**，**造成冲突会报警告**



## module的局部状态

> **重点**：所有的模块 `getters` 、`mutations`、`actions`  **默认**会全部**添加到全局的 Store 对应的 options 当中。**



- **注意**：这样的在**默认的情况下**，除了`state` 需要进行 `.模块` 进行获取，剩下的**选项则不需要添加模块名就可以直接调用**



- **注意（冲突）：**这样会有一个很大的缺陷，就是**命名冲突。**

  > 在存在相同的  `getters` 、`mutations`、`actions` ，**相同的方法都会进行触发调用**



## 命名空间

> 由于有除了 `state` 之外的选项会有命名冲突的问题，可以**给当前模块添加命名空间解决这个问题**。



- **添加命名空间**：会让模块具有**更高的封装度**和**复用性**

  > 在**子模块**当中添加 `namespaced: true` 选项和 state 同级



- 同时  `getters` 、`mutations`、`actions` 这些选项在**调用方式也会改变。**



## getters mutation调用

> 当添加了命名空间之后，`getter`、`action` 及 `mutation` 都会**自动根据模块注册的路径** <u>"调整"</u>命名

- **调用格式**：`"模块名/方法的key"`
  - **getters**：`$store.getters[base/getDetail]`
  - **mutation**: `$store.commit("base/home/edit")`
  - **actions**: `$store.dispatch("base/findList")`



## actions 调用根 store

- 在提交根 `mutations` 或者 `dispatch` 根 `store` 中的 `actions`，可以**传入第三个参数{root: true}**

~~~js
  actions: {
    updataRootInfo({commit, dispatch}) {
        commit(
           "pushList",
           {movie: "雾山五行", price: 67},
           //声明提交的是根对象中的 mutation
           {root: true})
        //会默认返回一个 promise 实例，dispatch 没有payload 的时候可以传入null
      return dispatch("findMultidata", null, {root: true})
    }
  }
~~~























