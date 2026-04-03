---
title: '一、SvelteKit 中的路由'
---

# 一、SvelteKit 中的路由

> SvelteKit 具有基于目录的路由和页面方法；的结构 `src/routes/` 将反映您网站的结构



## 1、路由规范

> 这里比较**特殊**的是文件夹名称是**以 `+` 开头**的 ， `src/routes/` 文件夹内的 `+page.svelte` 文件定义页面的 HTML 内容、

**重点**：网站上的每条路线都需要一个`+page.svelte`（或其他有效`+`文件）来渲染

> 文件夹下+page.svelte, 或者是+开头的有效文件才会渲染

- `+page.svelte `是主页 ( `/`)
- `about/+page.svelte ` 将成为  `/about`页面
- `blog/+page.svelte`  将是  `/blog`页面
- `blog/some-post/+page.svelte ` 变成  `/blog/some-post`



## 2、添加页面

- 在每个文件夹中，我们将添加一个`+page.svelte`文件，相似于 `index.vue` 文件

  ```fs
  📂 src
  ┗ 📂 routes
    ┣ 📜 +page.svelte
    ┣ 📂 blog
    ┃ ┗ 📜 +page.svelte
    ┣ 📂 about
    ┃ ┗ 📜 +page.svelte
    ┗ 📂 contact
      ┗ 📜 +page.svelte
  ```

- 可以访问 `/`、 `/contact`、`/about`和/或`/blog`查看我们刚刚创建的页面



## 3、动态路由

> 这里不会渲染1.md 和 2.md，因为我们网站上的每条路线都需要一个`+page.svelte`（或其他有效`+`文件）来渲染。

```fs
📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┣ 📜 +page.svelte
    ┣ 📜 1.md
    ┣ 📜 2.md
    ┗ 📂 [slug]
```

- **基于字符串位置参数绑定的URL方式**，被称为 slug

括号( `[]`)表示该路由是*动态的*；它将用于匹配任何`/blog/*`路径（根页面除外`/blog`，当然这是由`[slug]`文件夹下的  `+page.svelte`文件处理的）



#### 3.1、+page.js

每次在 SvelteKit 中加载路由（例如 `/blog`）时，路由器都会在该路由中查找  `+page.js`  文件。

如果该文件存在（并导出一个函数），`SvelteKit` 将在渲染路线 **之前** 在服务器上运行该函数，**并将** 返回的任何数据**传递**给该文件。`+page.svelte``+page.svelte`



**重点**：换句话说：`+page.js`首先运行，然后将需要的任何内容传递到`+page.svelte`模板文件进行渲染。



```fs
📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┗ 📂 [slug]
      ┣ 📜 +page.js -- Preloads data
      ┗ 📜 +page.svelte -- Renders the page

```



在内部`+page.js`，我们只需要导出一个`load`返回数据供模板使用的函数。至少，应该是这样的：



~~~js
// src/routes/blog/[slug]/+page.js
export async function load({ params }){
  const post = await import(`../${params.slug}.md`)
  const { title, date } = post.metadata
  const content = post.default

  return {
    content,
    title,
    date,
  }
}
~~~



在内部`+page.svelte`，我们只需要很少的代码即可完成工作！

`load`来自函数中 `retur` 的数据 `+page.js` 会自动用作 `data ` 变量上。所以我们需要做的就是导出该变量（以便它被赋值传入），然后使用它！

~~~html
<!-- src/routes/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<article>
  <h1>{ data.title }</h1>
  <p>Published: {data.date}</p>
  <svelte:component this={data.content} />
</article>
~~~







# 二、布局

- 在其中`src/routes`，创建一个名为 的新文件`+layout.svelte`。

```fs
📂 src
┗ 📂 routes
  ┗ 📜 +layout.svelte
```

**这个文件有一个特殊的作用**：SvelteKit 自动检查 **`routes`**（及其所有子目录）。检查到 `+layout.svelte`  该布局将“包装”从**该**路由**及其子**路由加载的所有内容。



~~~html
<!-- +layout.svelte -->
<header>Hi, I'm a header</header>
这个布局文件会包裹当前路由下的所有文件
<main>
   内容展示
  <slot />
</main>

<footer>Hello, I'm the footer.</footer>
~~~





# 三、组件

> 在内部`src/lib`，我们将创建一个名为 的文件夹`components`，仅用于组织目的。在其中*，*我们将创建一个名为的新组件`Header.svelte`：

- `lib`这是另一个 SvelteKit 约定

```fs
📂 src
┣ 📁 routes
┗ 📂 lib
  ┗ 📂 components
    ┗ 📜 Header.svelte
```



*您不必将组件名称大写，或将组件保留在自己的文件夹中，但这两种通常都是首选约定。*



~~~html
<!-- Header.svelte -->
<header>
  <a href="/">Home</a>

  <nav>
    <ul>
      <li>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  </nav>

</header>
~~~



- 在布局文件中使用

~~~html
<!-- +layout.svelte -->
<script>
import Header from '$lib/components/Header.svelte'
</script>

<Header />
<!-- The rest of the HTML here -->
~~~



**注意导入路径。** `$lib`是一个方便的别名，可以直接转到`src/lib`，使您免于键入繁琐的相对路径。（您可以自定义此别名或在中添加您自己的别名`jsconfig.json`，但我不会在这里介绍它。）



## 1、SvelteKit 组件样式

> sevlteKit  默认是**有作用域**的

~~~html
<!-- Header.svelte -->

<!-- ... The rest of the file's contents here -->

<style>
header {
  padding: 1rem;
  background: lightskyblue;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

ul {
  margin: 0;
  list-style-type: none;
  display: flex;
  gap: 1rem;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
~~~



## 2、SvelteKit 中的样式表

Svelte 允许将样式表**直接导入到组件中**，还有其他加载样式表的方法，但我发现这是最好的。一方面，这很简单，但更重要的是，它**还会自动预处理它们**，这是我们很快添加 Sass 时需要的。



```fs
📂 src
┣ 📁 routes
┗ 📂 lib
  ┣ 📁 components
  ┗ 📂 styles
    ┗ 📜 style.css
```

- 直接导入即可

~~~html
<!-- +layout.svelte -->
<script>
import Header from '$lib/components/Header.svelte'
import '$lib/styles/style.css'
</script>

<!-- ...HTML here -->
~~~



## 3、使用预处理器

> Svelte 的一大优点是添加外部处理器相对容易，这要归功于[`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess).

~~~shell
npm i -D svelte-preprocess sass
~~~



#### 3.1、修改 SVELTE 配置

- 配置文件修改之后要重启服务器才能生效。

~~~js
// svelte.config.js
import sveltePreprocess from 'svelte-preprocess'

const config = {
  kit: { /* ...other kit options here already */ },
  //添加到预处理列表中
  preprocess: [
    sveltePreprocess(),
  ],
}
~~~



### 3.2、SCSS 添加到组件样式

可以在任何组件的块中使用 Sass `lang`，如下所示：

~~~html
<style lang="scss">
// We can write SCSS here!
</style>
~~~



### 3.3、使用全局 SCSS 文件

链接到 Sass 文件实际上与链接到 CSS 文件**完全相同**



~~~html
<!-- +layout.svelte -->
<script>
import '$lib/styles/style.scss'
</script>
~~~



# 四、Mdsvex

> mdsvex 为我们想要用 Markdown 做的一切提供了支持：

- `mdsvex` 处理将 Markdown 转换为 HTML；
- 它还允许将 Markdown 文件用作组件；和
- *最后，mdsvex 允许我们在 Markdown中*使用 Svelte 组件。



安装 mdsvex：

~~~shell
npm i -D mdsvex
~~~



将 mdsvex 添加到我们的配置中。打开`svelte.config.js`，

~~~javascript
// svelte.config.js
/* Other imports here */
import { mdsvex } from 'mdsvex'

const config = {
  kit: { /* Kit options here */ },

  extensions: ['.svelte', '.md'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md']
    })
  ]
}
~~~

该配置的详细信息：

- config属性`extensions`告诉 Svelte 将哪些类型的文件视为组件（允许它们以与 Svelte 组件相同的方式导入和使用）；
- 该`mdsvex()`函数将 Markdown 预处理为 HTML，但`.svx`默认情况下它仅针对文件，因此我们将其修改为参数。



## 1、MD页面

> 配置好之后就可以创建文件了，

创建`src/routes/uses/+page.md`并向其中添加一些 Markdown。您将能够通过访问查看您的内容`/uses`：

```fs
📂 src
┗ 📂 routes
  ┗ 📂 uses
    ┗  📜 +page.md
```



## 2、在 Markdown 中使用 Svelte 组件

只需`script`在内容的开头（在 frontmatter 之后）放置一个标签，然后导入其中的组件即可。然后，您可以将该组件添加到 Markdown 中，就像在其他地方一样：



~~~html
---
# frontmatter goes here
---
<script>
import SomeComponent from '$lib/components/SomeComponent.svelte'
</script>

# Markdown content here

<SomeComponent />

More markdown _here_!
~~~



## 3、布局文件中使用 frontmatter 数据

> 元数据字段（即文件顶部的 frontmatter）。

~~~html
<!-- +page.md -->
---
<!-- layout指定布局 -->
layout: blog | false
title: Post One
date: "2021-12-14"
---

Hello, I am _Post One._

**Nice to meet you!**
~~~



创建一个 `.svelte` 布局（可以**随意命名**）文件可以放在**任何地方**，和 `+layout.sevlte` 不同之处在于：它*仅*适用于博客中的 `Markdown` 帖子，

我们需要做的就是 `export` 为我们想要访问的每个 `frontmatter` 属性提供一个 `prop`，然后在模板中使用它们：

```html
<!-- post.svelte -->
<script>
export let title
export let date
</script>

<article>
  <h1>{title}</h1>

  <p>Published: {date}</p>

  <slot />
</article>
```





让 `mdsvex` 了解我们的布局。需要跳回到`svelte.config.js`，并在`mdsvex`对象内部添加一个`layout`属性：

- 可以使用`_`（下划线）作为键名来传递后备布局或默认布局。

~~~js
// svelte.config.js
const config = {
  // ...other properties here

  preprocess: [
    // ...other stuff here, too
    mdsvex({
      extensions: ['.md'],
      layout: {
        blog: "./path/to/blog/layout.svelte",
		article: "./path/to/article/layout.svelte",
		_: "./path/to/fallback/layout.svelte"
      },
    })
  ]
}
~~~



# 五、SvelteKit 服务器路由

到目前为止，我们创建的每条路线都是一个页面。但 SvelteKit 也提供了*另一种*类型的路由：[服务器路由](https://kit.svelte.dev/docs/routing#server)（您可以将其视为 API 端点）。

- 创建服务器路由时只需遵循**三个重要约定**（相当于 API 端点）

1. 必须命名服务器路由文件`+server.js`；
2. `+server.js`应该导出一个为其响应的每个[HTTP 动词](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)命名的函数。（*这通常只是一个GET函数，但您也可以使用POST等*）；
3. 服务器路由必须返回一个新的`Response`. （*这是响应网络规范*。）



~~~js
/*
举个例子：如果您创建了src/routes/api/+server.js一个函数并将GET其放入其中，则任何GET请求/api都会调用该函数。
*/
📂 src
┗ 📂 routes
  ┗ 📂 api
    ┗ 📂 posts
      ┗ 📜 +server.js


// +server.js
export const GET = () => {
    //return json(sortedPosts)
  return new Response('Welcome to my API')
}
~~~

`SvelteKit`导入了方便的 `json` 助手。它负责将数据**转换**为 `JSON` 并自动为我们**设置正确的标头！**









