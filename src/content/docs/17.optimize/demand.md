---
title: '1、多租户 物理隔离的独立主题项目 c端商城多站点架构'
---





店匠|shopLine： 13825908351 YY2022128@

测试账号1

tsf@idd.cool

idd_12345678



测试账号2

fjc@idd.cool

Aa123456!



开源项目设计

- 目的：操作简单，快速建站，高性能，高度适配自定义业务开发场景(支持定制商品)，作为独立站开发的脚手架

需要思考的几个点，模块组件下面用于收集数据的选项组件称为dataItem

1. 每个模块中的dataItem要有自己自定义的校验方式要是函数的方式会更加的灵活

    - 考虑种情况，有可能一个dataItem的校验依赖另外一个dataItem的情况

2. 由于业务场景的需求，每个模块的数据一定会有相互引用的情况，所以提前思考，如果某一个模块数据被清除，或者变动怎样快速有效-简易-清晰的同步到全部的关联区域组件

    - 升级版：区域组件间的数据，最好可以有相互调用传输数据的业务场景(待定...)

3. 想办法统一c/b端模版（这个是很大的一步）

   思考后面要有自定义模版，自定义区域....

   例：添加一个模块｜区域，要带出这个组件所有的配置来渲染dataItem

   区域可以选中

   块用于收集数据

   参考Shopify 目录结构

4. 封装适配器，最后保存的数据一定是格式化简单的数据，要提前想好两种数据格式的相互转换

5. 封装一组可以在整个页面数据中可以随意获取修改数据的工具集合（这个设计好了，就解决了一大半了）

    - 数据的级别 页面 -》 区域组件-> 模块组件-〉数据组件 dataItem
    - 自定义页面，自定义区域组件，自定义模块，自定义数据组件

6. 响应式布局

7. 插件系统(p2)

8. 多店铺(p2)

9. 商品详情

10. 支付

11. 购物车（各种营销活动）

12. 国际化翻译，定制喵和shopify 设计的都很好这个到时候考虑下

13. 看看可不可以 mo r p

14. 可以相互赠送礼品--发送链接-输入密码-->，链接发送过去输入密码就可以直接选
15. 设计生命周期，模块初始化，模块更新，所有模块更新，有助于联动其他模块更新的时候，方便统一更新
16. 设计可以收集关键数据的钩子，比如：商品详情，商品列表，商品分类，商品品牌，商品属性，商品规格，商品评论，商品评价，商品收藏，商品浏览记录，商品购买记录，商品分享记录，商品收藏记录，商品浏览记录，商品购买记录，商品分享记录，商品收藏记录，商品浏览记录，商品购买记录，商品分享记录，商品收藏记录，商品浏览记录，商品购买记录，商品分享记录，商品收藏记录，商品浏览记录，商品购买记录，商品分享记录，商品收藏记录，商品浏览记录，商品购买记录，商品分享记录，商品收藏记录，商品浏览记录，商品购买记录，商品分享记录，商品收藏





你是一位全栈开发工程师，同时精通产品规划和UI设计。 我现在想要开发一个海外商城的后台包含订单(物流等)，商品分类，商品，评论，文章，插件，店铺装修(参考shopify)的基础后台管理适配c端，需要输出一套完整的web原型图，请按照下面的要求执行: - 模拟真实用户装修店铺和发布产品的真实场景和需求 - 结合用户需求，以产品经理的视角去规划商城后台功能、页面和交互 - 结合产品规划，以设计师的视角去输出完整的高保真UI/UX - 以上全部页面都在同一个html文件中平铺展示 - 页面引入tailwindcss来完成样式编写，图片使用unsplash，小图标使用fontawesome，一开发功能师的角度设计数据库表

- 目的：操作简单，快速建站，高性能，高度适配自定义业务开发场景(支持定制商品)，作为独立站开发的脚手架

需要思考的几个点，模块组件下面用于收集数据的选项组件称为dataItem

1. 每个模块中的dataItem要有自己自定义的校验方式要是函数的方式会更加的灵活

   - 考虑种情况，有可能一个dataItem的校验依赖另外一个dataItem的情况

2. 由于业务场景的需求，每个模块的数据一定会有相互引用的情况，所以提前思考，如果某一个模块数据被清除，或者变动怎样快速有效-简易-清晰的同步到全部的关联区域组件

   - 升级版：区域组件间的数据，最好可以有相互调用传输数据的业务场景(待定...)

3. 想办法统一c/b端模版（这个是很大的一步）

   思考后面要有自定义模版，自定义区域....

   例：添加一个模块｜区域，要带出这个组件所有的配置来渲染dataItem

   区域可以选中

   块用于收集数据

   参考Shopify 目录结构

4. 封装适配器，最后保存的数据一定是格式化简单的数据，要提前想好两种数据格式的相互转换

5. 封装一组可以在整个页面数据中可以随意获取修改数据的工具集合（这个设计好了，就解决了一大半了）

   - 数据的级别 页面 -》 区域组件-> 模块组件-〉数据组件 dataItem
   - 自定义页面，自定义区域组件，自定义模块，自定义数据组件

6. 响应式布局

7. 插件系统(p2)

8. 多店铺(p2)

9. 商品详情

10. 支付

11. 购物车（各种营销活动）

12. 国际化翻译，定制喵和shopify 设计的都很好这个到时候考虑下





# 1、多租户 物理隔离的独立主题项目 c端商城多站点架构

- astro+monorepo+Turborepo( **Turborepo 的“指纹缓存”机制 (核心方案)**)

my-ecommerce-platform/
├── apps/                          # 【主题应用层】
│   └── storefront-gateway/        # 【核心网关】中转站
│       ├── src/middleware.ts      # 识别域名，动态重定向到对应主题
│       └── astro.config.mjs       # SSR 模式配置
│
├── packages/                      # 【共享内核层】

│   ├── theme-minimal/             # 主题 A：极简风格 (Astro 项目)
│   │   ├── src/components/        # 该主题特有的 UI
│   │   └── src/pages/p/[id].astro # 极简版详情页模板
│   ├── theme-modern/              # 主题 B：现代风格 (Astro 项目)
│   │   ├── src/components/        # 该主题特有的 UI
│   │   └── src/pages/p/[id].astro # 现代版详情页模板

│   ├── api/                       # 核心业务逻辑 (10万 SKU 查询)
│   │   ├── src/mysql.ts           # MySQL 数据库连接
│   │   └── src/products.ts        # getProduct(id, tenantId)
│   ├── core/                      # 共享类型与工具
│   │   └── tenant.ts              # getTenantConfig(domain)
│   └── store/                     # 状态管理
│       └── cart.ts                # Nano Stores 跨主题购物车
│
├── pnpm-workspace.yaml            # pnpm 工作区定义
├── turbo.json                     # Turborepo 缓存与任务配置
└── package.json                   # 根目录全局配置

## 一、获取站点id

~~~js
// storefront-gateway/src/middleware.ts
import { getTenantConfig } from "@repo/core/tenant";

export const onRequest = async (context, next) => {
  const domain = new URL(context.request.url).hostname;
  const tenant = await getTenantConfig(domain); // 从 MySQL 查出租户

  if (!tenant) return new Response("Not Found", { status: 404 });

  // 关键：将租户选定的主题（如 'theme-minimal'）存入 locals
  context.locals.theme = tenant.theme_name;
  context.locals.tenantId = tenant.id;

  return next();
};
~~~

## 二、 网关内部的分发策略

~~~js
---
// apps/storefront-gateway/src/pages/p/[id].astro
import MinimalDetail from "../../theme-minimal/src/pages/p/[id].astro";
import ModernDetail from "../../theme-modern/src/pages/p/[id].astro";

const { theme } = Astro.locals;
const { id } = Astro.params;

// 根据租户选的主题，动态决定渲染哪个组件（模板）
const SelectedTheme = theme === 'minimal' ? MinimalDetail : ModernDetail;
---
/*由于所有主题最终都在“主项目”里运行，为了防止 theme-minimal 的样式污染 theme-modern，建议：
在每个主题的根容器上加一个独有的 ID 或 Class（如 <div class="theme-minimal">）。
或者在主题中使用 Scoped CSS（Astro 默认支持）。*/

<SelectedTheme id={id} />

~~~



## 三、升级方案开发用户主题开发

### 运行时动态渲染

必须跳出 **“构建时（Build time）”** 的思维，转向 **“运行时（Runtime）”** 动态渲染。

```js
---
// apps/storefront-gateway/src/pages/p/[id].astro
import { Liquid } from 'liquidjs';
import { getProductById } from '@repo/api';

const { id } = Astro.params;
const { tenant } = Astro.locals; // 中间件拿到的商户信息

// 1. 获取 10万 SKU 数据
const product = await getProductById(id, tenant.id);

// 2. 从数据库或缓存中读取该商户上传的原始 Liquid 字符串
const rawTemplate = tenant.custom_product_template;

// 3. 运行时渲染
const engine = new Liquid();
const html = await engine.parseAndRender(rawTemplate, { product, tenant });
---

<!-- 直接输出商户自定义生成的 HTML -->
<Fragment set:html={html} />
```

### 远程组件(会有安全风险)

核心原理：模块联邦 (Module Federation) 或 ESM 导入

> 可以直接参考 cool 团队的插件系统

由于 Astro 运行在 Node.js 环境，你可以利用 **ES Modules** 的特性，在运行时动态加载商户存放在 OSS（如阿里云、腾讯云）上的 JS 文件。

- **流程**：
  1. **商户端**：使用你提供的 **开发工具包 (CLI)** 开发 React/Vue 组件，执行 `npm run build`。
  2. **产物**：生成一个混淆后的 `theme.js` 和 `theme.css`。
  3. **上传**：商户将文件上传到你的静态存储。
  4. **Astro 渲染**：

为什么像 Cool 团队或微前端方案敢这么做？

他们能规避风险，通常是因为加了以下**三层防护网**：

1. 严格的代码审计（非技术手段）

商户上传后，代码不立刻上线，而是进入人工或自动扫描队列，检查是否存在 `process`、`eval`、`XMLHttpRequest` 等危险关键字。

2. 沙箱隔离运行（重度技术手段）

这是最关键的。他们不会直接 `import`，而是把代码丢进一个**“隔离的小黑屋”**里跑：

- **Node.js VM2 / VM 模块**：创建一个完全没有 `process`、没有 `fs`、没有 `network` 权限的虚拟环境。
- **代码即便执行 `process.exit()`，也只是撞在沙箱的墙上，伤不到主进程。**
- 结果只取 HTML

主进程只向沙箱要一个结果：“喂，把商品 ID 为 123 的 HTML 算出来给我。” 算完后立刻销毁沙箱。

------

`isolated-vm` **方案 (集成在 Astro 内)**

环境是 **Docker**，那么实现商户自研主题上传的最佳工业实践是：**Sidecar（边车）容器方案**。

**Renderer Sandbox (Node.js + isolated-vm)**：专门处理商户代码

### 开发模板开发一定是html模板引擎

为什么 Liquid 是安全的，而直接传代码不安全？

> 简单总结，上传astro代码，他会在服务器执行，但是html模板不会，他只会生成对应的html字符串到浏览器执行

| 方案                | 运行机制                         | 风险点                                                       |
| :------------------ | :------------------------------- | :----------------------------------------------------------- |
| **原生 Astro 代码** | 服务器直接**编译并运行**         | **极高**。商户代码拥有服务器权限，可执行任意系统指令。       |
| **Liquid 模板**     | 服务器只负责**扫描字符串并替换** | **极低**。Liquid 只是一个文本处理器，它不认识也不执行系统命令。 |



## 五、json配置接收方案

1. 对 JSON 进行 HTML 实体转义（最推荐）

这是 **Shopify Liquid** 和 **Astro** 默认的做法。将所有的双引号 `"` 转义成 `"`。

- **Liquid 示例**：

  html

  ```
  <div data-config='{{ block.settings | json | escape }}'></div>
  ```

  请谨慎使用此类代码。



- **生成的 HTML**：

  html

  ```
  <div data-config='{&quot;title&quot;:&quot;今日特惠&quot;,&quot;price&quot;:99}'></div>
  ```

  请谨慎使用此类代码。



- **JS 读取**：浏览器会自动还原。

  javascript

  ```
  const config = JSON.parse(el.dataset.config); // 自动拿到正确的对象
  ```

  请谨慎使用此类代码。





- 使用 `<script type="application/json">`（结构最清晰）

对于 10 万 SKU 这种可能包含复杂描述、特殊符号的数据，直接塞在属性里确实比较乱。Shopify 经常用这种“隐藏标签”方案：

- **HTML 结构**：

  html

  ```
  <section id="section-{{ section.id }}">
    <!-- 渲染配置到脚本标签中，不显示在页面 -->
    <script type="application/json" data-settings>
      {{ section.settings | json }}
    </script>
  </section>
  ```

  请谨慎使用此类代码。



- **JS 读取**：

  javascript

  ```
  const container = document.getElementById('section-xxx');
  const settings = JSON.parse(container.querySelector('[data-settings]').textContent);
  ```

  请谨慎使用此类代码。



- **优点**：不需要担心引号冲突，代码可读性极高。



## 六、装修c端界面架构设计

```
packages/theme-engine/
├── src/
│   ├── sections/               # 所有可用的 Section 库
│   │   ├── featured-product/
│   │   │   ├── index.liquid    # 包含 Scoped CSS 的模板
│   │   │   └── index.ts        # 独立 JS Class
│   │   └── hero-banner/
│   └── main.ts                 # 负责 JS 初始化的入口
├── dist/                       # 打包后的产物
│   ├── main.js                 # 只有几 KB 的“打火机”脚本
│   └── chunks/                 # 自动分包的 Section 逻辑 (如 fp.hash.js)
```



1. render 解析page/home页面

~~~html
文件路径：/section/product/这里面会有index.html [拼到这个标签的所在位置],index.js[下面js隔离方案导出的函数，],index.json[c端保存的死配置数据]
<SectionProduct></SectionProduct>
<BlockProduct></BlockProduct>
~~~

- 打包的时候使用抽象进行编译重新生成一个完整的html，放到缓存中最好启动的时候就开始缓存，后面抽象出一个方法进行缓存
- 预览的时候最好每个section都有一个render,每次修改配置或者代码的时候重新render,更新缓存不用刷新页面全部渲染

2. 根据json拼装完之后在进行水和js代码

~~~js
//就是这种
import { ProductGallery } from './modules/ProductGallery.js';
import { SKUSelector } from './modules/SKUSelector.js';
import { CartDrawer } from './modules/CartDrawer.js';

~~~







## 七、css隔离和js隔离

1. 命名空间隔离 +  css变量或者tailwindcss

   ```css
   /* 这种内联方式配合 ID 选器，能精准锁定作用域 */
       #Section-{{ section.id }} .title { color: {{ section.settings.color }}; }
       #Section-{{ section.id }} .btn { border-radius: 4px; }
   ```

2. **Shadow DOM（进阶方案）**：

3. JS 隔离：实例化与数据快照

4. 面向对象组件化的写法

   > **没有事件的模块**：不写 `data-section-type`，主脚本直接跳过，零开销。



~~~js
// 1. 导入各个独立的模块类
import { ProductGallery } from './modules/ProductGallery.js';
import { SKUSelector } from './modules/SKUSelector.js';
import { CartDrawer } from './modules/CartDrawer.js';

// 2. 建立映射表 (Registry)
const SECTION_COMPONENTS = {
  'product-gallery': ProductGallery,
  'sku-selector': SKUSelector,
  'cart-drawer': CartDrawer
};

// 3. 全局扫描函数
export function initAllSections(container = document) {
  // 扫描所有带有 data-section-type 的元素
  container.querySelectorAll('[data-section-type]').forEach(el => {
    const type = el.dataset.sectionType;
    const Component = SECTION_COMPONENTS[type];

    if (Component && !el._instance) {
      // 【关键】直接实例化对应的类，互不干扰
      el._instance = new Component(el);
    }
  });
}

// ProductGallery.js
class ProductGallery {
  constructor(container) {
    this.container = container;
    this.btn = container.querySelector('.btn');

    // 【关键】将函数绑定到 this，并存为一个属性，确保引用唯一
    this.handleClick = this.handleClick.bind(this);

    this.init();
  }

  init() {
    // 使用存好的引用添加监听
    this.btn.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    console.log('处理点击逻辑', this.container.id);
  }

  // 【核心方法】当商户删除模块或切换主题时调用
  destroy() {
    // 移除监听（引用必须与 add 时完全一致）
    this.btn.removeEventListener('click', this.handleClick);

    // 清空 DOM 引用，释放内存
    this.container = null;
    this.btn = null;

    console.log('组件已卸载，内存已释放');
  }
}

~~~







~~~js
// 1. 导入各个独立的模块类
import { ProductGallery } from './modules/ProductGallery.js';
import { SKUSelector } from './modules/SKUSelector.js';
import { CartDrawer } from './modules/CartDrawer.js';

// 2. 建立映射表 (Registry)
const SECTION_COMPONENTS = {
  'product-gallery': ProductGallery,
  'sku-selector': SKUSelector,
  'cart-drawer': CartDrawer
};

// 3. 全局扫描函数
export function initAllSections(container = document) {
  // 扫描所有带有 data-section-type 的元素
  container.querySelectorAll('[data-section-type]').forEach(el => {
    const type = el.dataset.sectionType;
    const Component = SECTION_COMPONENTS[type];

    if (Component && !el._instance) {
      // 【关键】直接实例化对应的类，互不干扰
      el._instance = new Component(el);
    }
  });
}

~~~







# 1、还有一种物理隔离的方案

1. astro 固定页面路由 + 渲染配置

2. 根据配置+网关内部的分发策略 来决定每个页面渲染那些路径下组件
3. 然后路由在主应用，区域模块在packages里，动态生成配置(渲染的时候使用) 和上面一样的



## 域名能不能绑定域名



