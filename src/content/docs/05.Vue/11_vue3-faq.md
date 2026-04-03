---
title: '11_vue3-faq'
---

1. .vue文件的声明

   > 项目默认不会有这个配置

   - 但是不报错的原因是，volar插件的作用

   ~~~typescript
   declare module "*.vue" {
     import { DefineComponent } from "vue"
     const compoment: DefineComponent<{}, {}, any>
     export default compoment
   }
   ~~~

   



2. 当安装一些依赖的时候，老是安装一些老的版本，就手动清一下npm的缓存

   ~~~
   npm cache clean --force
   ~~~

   

