---
title: 'Form 表单'
---

# Form 表单



## 表单校验

### 基本使用

~~~html
  <div class="login-account">
    <!-- model 表单数据对象 -->
    <!-- rules 表单验证规则 -->
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <!-- prop 当前 input 的name -->
      <el-form-item label="账号" prop="name">
        <!-- 双向绑定 input 的value -->
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <!-- 显示是否查看密码 -->
        <el-input v-model="account.password" show-password />
      </el-form-item>

    </el-form>
  </div>
~~~



### 验证

~~~js
	//有父组件登录时点击后调用该函数
    const loginAction = (isKeepPassword: boolean) => {
       //执行form 表单校验
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            //通常加密保存密码
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
~~~







### 校验规则

~~~js
// 编写好规则
export const rules = {
  //name 字段可以添加多个校验规则
  //第一个规则，必填在没有填的情况下会提示 message
  //第二个规则，在没有盘组pattern 的情况下会提示 message
  name: [
    {
      required: true,
      message: '用户名是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}

~~~









# 菜单栏



- `index`: 用于判断菜单是否是选中状态，不设置的话默认全部选中

- `collapse`:  `boolean` 属性 默认不折叠菜单。

  > 开启折叠之后 会有1px的 border-right ，通过覆盖 el-menu 属性来取消border

- default-active：默认选中第几个菜单

- active-text-color：文本选中的颜色

~~~html
<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题，不添加index 属性，默认全部选中 -->
          <el-submenu :index="item.id + ''">
             <!-- 菜单标题放入 title 具名插槽中插槽 -->
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item，item 是放入默认插槽 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
~~~

