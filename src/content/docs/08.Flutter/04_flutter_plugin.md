**Flutter Secure Storage DevTools**

购物车添加 数量增减区域，每个购物车项都要有，至于怎样展示 使用 ui-ux-pro-max 设计一下

/store/cart/change

参数

~~~js
{
    // 购物车id
    "id": 561,
        // 产品数量
    "product_num": 3
}
~~~



详情页加购逻辑

1. 在详情页点击加购按钮之后
2. 如果站点信息中：productAddcartSpace 值为1的时候 加购前要弹出一个输入框必填，输入space字段，然后点击确定进行加购，这个字段必填，然后要有取消按钮
3. 如果等于0的话则，不需要弹这个输入框：space字段默认传入default字符串

/store/cart/create

- 请求类型post

- 参数

  ~~~js
  {
      "product_id": 64521,
      // 是最后筛选中 product.product_sub里的index字段
      "sub_index": "a0",
      "product_num": 1,
      "space": "defalut",
          // 是当前选中的product_sub的 name + spec-value中选中的options name
      "sub_name": "H17*W37.2*L1000,Aluminum,Black",
  }
  ~~~



- 扩展，不止商品详情页有加购，产品列表也有加购



产品列表加购逻辑

1. 点击加购按钮

2. 根据产品id获取产品详情数据
3. 展示sku数据，sku改变的逻辑，和加购的逻辑，和详情一摸一样，展示的数据也一样，只不过多了展示mainImage主图
4. 只不过数据会展示到一个抽屉中在右侧弹出
5. 最后会有一个确认按钮，点击之后就和详情的加购逻辑一样了也会有空间等。。。
6. 调用的接口也是一样的



购物车修改

1. 也会在侧边弹出，样式和展示的数据，和产品列表加购的抽屉一样只不过接口换了

2. 接口/store/cart/changeSpec

3. post请求

4. 参数

   ~~~js
   {
       "id": 613,
       "product_id": 117278,
           //     // 是最后筛选中 product.product_sub里的index字段
       "sub_index": "a0",
        "space": 'defalut'
           // 是当前选中的product_sub的name + spec-value中选中的options name
       "sub_name": "L1730*W930*H880,Artificial leather+sponge+Pine wood+stainless steel",
   }
   ~~~



- 我放在一起说的原因是，我希望你能自己设计实现方案，决定逻辑的复用性，因为逻辑都一样，只是调用接口不用，然后就是侧边抽屉展示详情信息这个抽屉看看是否考虑做成公共组件

product_sku_cart_helpers.dart product_sku_resolver.dart



# 切换站点需求

- 在Another settings 同行右侧添加一个切换站点的icon botton，点击之后切换底部弹出切换站点列表

1. 站点列表接口/store/company  不需要认证

   - 不需要dto,直接使用map就行

   ~~~js
   {
       "code": 0,
       "message": "ok",
       "type": "success",
       "result": {
           "items": [
               {
                   "id": 27,
                   "title": "家具二部自建渠道"
               },
               {
                   "id": 26,
                   "title": "创客演示站"
               },
               {
                   "id": 25,
                   "title": "官方子站点"
               },
      
           ],
           "total": 12
       }
   }
   ~~~

   

2. 切换站点接口：/store/user/switchShop 需要认证

   - 参数

   ~~~js
   {
       // 选中的id
       "company_id": 7,
           // 选中的id
       "shop_id": 7,
           // 固定5
       "terminal": 5
   }
   ~~~

   - 响应数据，和userBaseInfo相同的数据，统一更新到userBaseInfo
   - 更新tokenMap, 还有companyId,
   - 更新companyId之后要统一更新站点信息

当前需求，controllers service api都要加详情注释，还有参数注释



# My Customers 需求

user_base_info中有个字段isAuthAccount，表示这个用户是否是业务员

是业务员的情况下profile中才会有这个菜单



接口：/store/account/customer?status=&page=1&page_size=20&keyword=&company_id=7

请求方式：get 需要认证

要求：是个列表下拉刷新和滚动加载，有新增，修改，删除，登录操作

response 结构, 创建对应的dto

~~~js
{
    "code": 0,
    "message": "ok",
    "type": "success",
    "result": {
        "items": [
            {
                "id": 601,
                "username": "17614764200",
                "telephone": "11122233355",
                "email": "",
                "created_at": "2026-04-17 20:51:34",
                "name": "藏三",
                "avatar": null,
                "company_id": 26,
                "user_main_id": 323
            }
        ],
        "total": 1
    }
}
~~~



操作

修改用户：点击修改底部弹出输入框，是个表单下面带注释的字段就是表单的内容

接口： /store/account/customerUpdate

请求类型：post，需要认证

参数：

~~~js
{
    // 表单label: Username or Email
    "username": "17614764200",
    // 表单label: Password
    "password": "123456",
    // 表单label: name
    "name": "藏三",
	// 表单label: phone
    "telephone": "11122233355",
    "id": 601,
    "terminal": 5 
}
~~~

校验： username 和 password 是必填的，都不能低于6个字符， 点击Done，请求成功后提示成功

 

删除操作：点击删除按钮，弹出提示框，进行删除

接口： /account/customerDelete

请求类型：post 需要认证

参数：

~~~dart
{
    "company_id": 7,
    "id": 601
}
~~~





新增操作：点击新增底部弹出输入框,是个表单下面带注释的字段就是表单的内容

接口： /store/account/customerCreate

请求类型：post 需要认证

校验：同修改弹窗一致，点击Done，请求成功后提示成功

参数：

~~~js
{
    // 表单label: Username or Email
    "username": "17614764200",
    // 表单label: Password
    "password": "123456",
    // 表单label: name
    "name": "藏三",
	// 表单label: phone
    "telephone": "11122233355",
    "terminal": 5 
}
~~~





My Customers登录操作

接口：/store/account/customerLogin

请求方式：post 需要认证

操作：点击登录按钮调用这个接口注意要有loading

请求参数：

~~~js
{
    // 要传入id
    "id": 610,
    "terminal": 5
}
~~~

response 结构：同user_base_info 字段一致，可以使用相同dto

~~~dart
{
    "code": 0,
    "message": "ok",
    "type": "success",
    "result": {
        "id": 610,
        "account_id": 1507,
        "name": "用户176147642011",
        "username": "176147642011",
        "company_id": 7,
        "avatar": null,
        "telephone": "",
        "description": null,
        "status": 1,
        "type": 0,
        "updated_at": "2026-04-19 10:14:48",
        "created_at": "2026-04-19 10:14:48",
        "deleted_at": null,
        "register_from": 5,
        "language_id": 1,
        "tourist": 0,
        "email": "",
        "nickname": "",
        "wechat": "",
        "customer_id": 0,
        "last_order_time": 0,
        "user_main_id": 331,
        "shop_id": 0,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NzY1NjU1NzQsIm5iZiI6MTc3NjU2NTU3NCwiZXhwIjoxNzkyMTE3NTc0LCJyY29kZSI6MzgwNDQ0LCJ1aWQiOjYxMCwicGFyYW1zIjo1fQ.aWcFgmyYLiM-kNQ3itPQcYAl70rHBQYek_ao2V0_z9s",
        "is_auth_account": false
    }
}
~~~



1. 登录前要保留当前用户的user_base_info，持久化一份，可以叫做 main_user_info
2. 将接口响应更新到当前用户信息中，包括token, company_id 登录成功
3. 注意：这个时候更新user_base_info 信息了，我前面说过user_base_info中有个字段isAuthAccount，表示这个用户是否是业务员是业务员的情况下profile中才会有这个菜单，你要注意不要影响我现在的逻辑
4. 成功登录之后 settings 判断有没有main_user_info信息，有的话才会展示 **switch   Account** 区域，否则只有一个logout 区域
5. 点击switch   Account之后会切换回到主用户，逻辑就是在将main_user_info替换回来，到当前用户信息中，包括token, company_id 
6. 然后清空main_user_info，切换完成！



# 退出登录逻辑

接口：/store/user/logout

请求类型：post 使用protectedDioClient 实例需要认证注释有问题就改注释

操作：点击settings-> sign out之后按钮loading之后响应成功 注意！！！退出之后如果还有接口发送请求那就你代码写的逻辑有很大的问题，开始清除个人信息，站点信息，token, companyId，购物车信息，main_user_info，等。。,清理完最后跳到登录页面



# 购物车数量

接口：/store/cart/num

请求类型：get 使用protectedDioClient 实例

响应数据

~~~js
{
    "code": 0,
    "message": "ok",
    "type": "success",
    "result": {
        "total_num": 11
    }
}
~~~



将结果：total_num 展示到 settings 中的 CART NUM 上面的24 value值





# Set Common Password 按钮逻辑

点击弹出 showStoreCustomerFormBottomSheet 也是个表单但是只有密码字段

接口： /store/account/customerResetPwd

BottomSheet 标题：Set Common Password 要求修改/customer 的 showStoreCustomerFormBottomSheet 样式一致

点击完成按钮发送请求

请求方式：post  使用protectedDioClient 实例

参数：

~~~js
{
    // Password
    "password": "123456"
}
~~~







My customers 是点击login才会去切换用户，点击行是我要查看当前用户订单

请求类型：get 使用protectedDioClient 实例

使用接口和当前用户列表一样  /store/account/customerOrderList，

{
    status: , 
    page: 1, 
    page_size: 20, 
    keyword: , 
    // 相比多了这个参数
    user_id: 608
    with_batch_order: 1, 
    all_shop: 1, 610
}

返回的数据格式同用户订单列表(就是Order Center 内容区域的Customer选中时候展示的列表) 可以抽取复用组件，一样也可以使用相同的dto ProductOrderListDto

操作和交互：

1. 当点击My Customer用户列表的时候可以让当前行loading，成功响应数据之后，订单内容从右边划出，然后当前的 My Customers 列表隐藏。

2. My Customer 内容区域展示的是用户订单列表(就是Order Center 内容区域的Customer选中时候展示的列表)时，手指向右滑动，用户订单列表(就是Order Center 内容区域的Customer选中时候展示的列表)会划出隐藏，最后会重新展示My Customers内容区域
3. 订单列表进入时候，用户列表要有慢慢隐藏的动画效果，回显的效果同样

最后注意此操作不允许修改现在有的样式





退出没登录旧提示没有token



请先为账号开通权限



- “缓存”仅限于当前内存中的 provider state（页面不销毁时还在），不是落盘缓存。

如果你希望“下拉刷新先秒开缓存，再后台拉新”，我可以帮你改成 SWR 风格（先显示本地快照 + 静默更新 + 失败保留旧数据）。



`SWR`（Stale-While-Revalidate）可以理解成：先用“可能旧但可用”的数据立即渲染，再在后台悄悄请求最新数据，回来后自动刷新 UI。
你现在订单列表是“下拉就直接打接口”，SWR 会把体验改成“先快，再准”。
