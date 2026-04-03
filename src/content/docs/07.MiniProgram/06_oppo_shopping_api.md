---
title: '06_oppo_shopping_api'
---



## OPPO手机商城-接口文档

> baseURL：http://codercba.com:9060/oppo-nuxt/api

### 1. GET-获取首页信息

说明 : 调用此接口 , 获取首页商品信息

**请求方法 :** GET 

**接口地址 :** `/home/info`

**必选参数 :** 

```
type: 商品类型，支持： oppo 、onePlus、intelligent, 默认是oppo
```



**调用例子 :** `baseURL + /home/info?type=oppo`

```json
{
    "code": 200,
    "data": {
        "navbars": [
            
        ],
        "banners":[
            
        ],
        "categorys":[
            
        ]
    }
}
```



### 2. GET-获取OPPO商品详情信息

说明 : 调用此接口 , 获取商品详情信息

**请求方法 :** GET 

**接口地址 :** `/oppoDetail`

**必选参数 :**  可选

```json
type: 类型：oppo 、air、watch、tablet, 默认是oppo
```

**调用例子 :** `baseURL + /oppoDetail?type=oppo`

```json
{
    "code": 200,
    "data": [
        {
            "id": 19978,
            "title": "Enco X 系列",
            "productDetailss": [
                {
                      "categoryCode": "000020",
                    "id": 21452,
                    "title": "OPPO Enco X2 镜夜黑 有线充版",
                    "marketingText": "45dB 降噪深度",
                    "skuId": 8687,
                    "skuName": "OPPO Enco X2 镜夜黑 有线充版",
                    .....
                }
            ]
        }
    ]
}
```



