---
title: '十、Composition API 基本语法'
---



# 十、Composition API 基本语法

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

  * `props`：
    * 父组件传递过来的属性会被放到props对象中；
  * `context`（包含三个属性）：
    * `attrs`：所有的非prop的attribute；
    * `slots`：父组件传递过来的插槽；
    * `emit`：当组件内部需要发出事件时会用到emit；

* #####  返回值：

  * `setup` 的返回值可以在模板 `template` 中被使用；
  * 可以通过 `setup` 的返回值来替代 `data` 选项；

* ##### 注：默认情况下，一个普通定义的变量是不会引起界面的响应式操作；



## 1.3、Reactive API

* ##### 为在 `setup` 中定义的数据提供响应式的特性；

* ##### 原因：

  * 使用 `reactive` 函数处理数据之后，数据再次被使用时就会进行依赖收集；
  * 当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作；

* ##### 传入值的类型限制：

  * 必须传入的是一个对象或者数组类型（复杂数据类型）；

* ##### 使用场景：

  * `reactive` 应用于本地定义的数据；
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
  * `reactive` 被解构后会变成普通的值，失去响应式；
  * 重新赋值也会失去响应式，因为原本的代理对象被替换了



## 1.4、Ref API

* ##### 返回一个可变的响应式对象，该对象作为一个响应式的引用维护着它内部的值；

  * 内部的值是在 `ref` 的 `value` 属性中被维护的；

* ##### 可以传入简单数据类型和复杂数据类型；

* ##### ref值解包问题：

  * 在模板中引入ref的值时，Vue会自动解包，所以不需要通过 `.value`的方式来使用；
  * 在 `setup` 函数内部，它依然是一个 ref引用，所以依然需要使用`.value`的方式来使用；
  * 对象类型解包后是 `proxy` 对象；

* ##### Ref自动解包：

  * ```js
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
  * `readonly`会返回原始对象的只读代理（依然是一个`Proxy`，`proxy`的`set`方法被劫持了，不能对其进行修改）；

* ##### 传入三个类型的参数：

  * 普通对象；
  * `reactive` 返回的对象；
  * `ref `的对象；

* ##### readonly使用规则：

  * `readonly` 返回的对象都是不允许修改的（无论在父组件还是在子组件）；
  * 但是经过 `readonly` 处理的原来的对象是允许被修改的；

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

  * `readonly` 传入响应式数据**返回值**才是响应式数据；



## 1.6、Reactive判断的API(6)

* ##### isProxy：

  * 检查对象是否是由 `reactive` 或 `readonly` 创建的 `proxy`。

* ##### isReactive：

  * 检查对象是否是由 `reactive` 创建的响应式代理：
  * 如果该代理是 `readonly` 建的，但包裹了由 `reactive` 创建的另一个代理，它也会返回 `true`；

* ##### isReadonly：

  * 检查对象是否是由 `readonly` 创建的只读代理。

* ##### toRaw：

  * 返回 `reactive` 或 `readonly` 代理的原始对象（不建议保留对原始对象的持久引用。请谨慎使用）。

* ##### shallowReactive：

  * 创建一个响应式代理，它跟踪其自身 `property` 的响应性，但不执行嵌套对象的深层响应式转换 **(深层还是原生对象)。**

* ##### shallowReadonly：

  * 创建一个 `proxy`，使其自身的 `property` 为只读，但不执行嵌套对象的深度只读转换**（深层还是可读、可写的）。**



## 1.7、toRefs和toRef

* `toRefs`：转换一个 `reactive` 对象的所有属性为 `ref`；

* `toRef`：转换 `reactive` 对象中的一个属性为 `ref`；

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
  *

## 1.9、setup不可以使用this

* ##### 原因：`this`并没有指向当前组件实例；

  * 在 `setup` 被调用之前，`data`、`computed`、`methods`等都没有被解析，所以无法在`setup`中获取`this`；



# 十一、Composition API hooks



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

* ##### 示例：只能监听响应式数据

  * ```js
    import { watch } from 'vue'

    const x = ref(0)
    const y = ref(0)

    //1.ref基本类型

    watch(x, (newX) => {
      console.log(`x is ${newX}`)
    })

    //2.参数可以是getter 函数
    watch(
      () => x.value + y.value,
      (sum) => {
        console.log(`sum of x + y is: ${sum}`)
      }
    )

    //3、监听多个数据源，数组形式
    watch([x, () => y.value], ([newX, newY]) => {
      console.log(`x is ${newX} and y is ${newY}`)
    })


    //4.注意，你不能直接侦听响应式对象的属性值，例如
    const obj = reactive({ count: 0 })

    // 错误，因为 watch() 得到的参数是一个 number
    watch(obj.count, (count) => {
      console.log(`count is: ${count}`)
    })

    //5.需要用一个返回该属性的 getter 函数，提供一个 getter 函数
    //注意，如果getter返回的是个对象的话，之有对象被替换才会触发，浅层的
    watch(
      () => obj.count,
      (count) => {
        console.log(`count is: ${count}`)
      }
    )

    //6.你也可以给上面这个例子显式地加上 deep 选项，强制转成深层侦听器
    watch(
      () => state.someObject,
      (newValue, oldValue) => {
        // 注意：`newValue` 此处和 `oldValue` 是相等的
        // *除非* state.someObject 被整个替换了
      },
      { deep: true }
    )
    ```









* 注意：
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





### defineProps() 和 defineEmits()：



* 替代Options API的`props`和`emits和$emit`选项；

* 是一个宏，内置方法，不用导入；

* ##### 示例：

* 3.5之前不能解构

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

### withDefaults()：

> defineProps 如果使用泛型的话无法设置默认值 withDefaults可以



~~~vue
<script setup lang="ts">
  import { ProductItemSummaryType } from '@/views/pdms/productDashboard/config/type';

  const { options } = withDefaults(
    defineProps<{
      options: ProductItemSummaryType[];
    }>(),
    {
      options: () => [],
    },
  );
</script>

<template>
  <div>
    <template v-for="item in options" :key="item.id">
      <div>{{item.label}}</div>
    </template>
  </div>
</template>

<style scoped lang="less"></style>

~~~



### defineExpose()：

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

* ##### 注意：defineExpose()也是宏方法，不用导入；



# 十二、Vue3 - Vue-Router






## 1.3、vue-router

* ##### vue-router：

  * 基于路由和组件的；
  * 路由用于设定访问路径，将路径和组件映射起来；
  * 在vue-router的单页面应用中，页面的路径的改变就是组件的切换；

* ##### 安装Vue Router：

  * `npm install vue-router`

* 注意：`router hooks` 只能在 `setup` 中使用，在 `hooks` 中会存在 `undefined`

  ~~~js
  //手动导出
  export function useRouter() {
    return  router;
  }

  export function useRoute() {
    return router.currentRoute;
  }
  ~~~





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
    | 刷新不会存在 404 问题                                        | 由于刷新页面之后会向服务器发送请求，浏览器直接访问嵌套路由时，会报 404 问题。 |
    | 不需要服务器任何配置                                         | 需要在服务器配置⼀个回调路由                                 |
    | 会影响a标签锚点的使用，可以使用 `scrollIntoView()` 方法      |                                                              |



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

    * 链接精准激活时，应用于渲染的 `<a>` 的 class，默认是router-link-exact-active； （嵌套下的子元素）；

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



#####

# 十三、FAQ



### 1、vite-plugin-vue-setup-extend

可以在 `<script setup name="Config">`设置组件的name属性



### 2、compression-webpack-plugin、vite-plugin-compression

打包优化插件，将js进行gzip压缩，后台要进行解析操作，nginx、express