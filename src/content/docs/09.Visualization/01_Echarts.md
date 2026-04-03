---
title: '第一节、数据可视化'
---

# 第一节、数据可视化

> 为了清晰有效地传递信息，数据可视化使用统计图形、图表、信息图表和其他工具

- 可以使用点、线或条，对数字数据进行编码；

- 数据可视化让我们可以更加清晰的去认识、理解、表达数据；



## 1、前端可视化的工具

> 常见的框架： ECharts 、g2、d3、vis、hightChart等等；

- g2框架封装：bizcharts(react) viser(vue)；
- 地理可视化： g2、L7、高德的 Loca、 菜鸟的 鸟图；
- 3D可视化：three.js；
- 目前使用最多的还是ECharts



# 第二节、ECharts介绍

> 官方的解释是：一个基于 JavaScript 的开源可视化图表库；



## ECharts的历史：

- ECharts由百度团队开源；
- 2018年初，捐赠给Apache基金会，成为ASF（Apache Software Foundation，简称为ASF，Apache软件基金会）孵化级项目；
- 2021年1月26日晚，Apache基金会官方宣布 ECharts项目正式毕业，成为Apache顶级项目；
- 2021年1月28日，ECharts 5线上发布会举行；



## ECharts的特点：

- 丰富的图表类型：提供开箱即用的 20 多种图表和十几种组件，并且支持各种图表以及组件的任意组合；
- 强劲的渲染引擎：**Canvas、SVG 双引擎一键切换，增量渲染、流加载等技术实现千万级数据的流畅交互；**
- 专业的数据分析：通过数据集管理数据，支持数据过滤、聚类、回归，帮助实现同一份数据的多维度分析；
- 优雅的可视化设计：默认设计遵从可视化原则，支持响应式设计，并且提供了灵活的配置项方便开发者定制；
- 健康的开源社区：活跃的社区用户保证了项目的健康发展，也贡献了丰富的第三方插件满足不同场景的需求；
- 友好的无障碍访问：智能生成的图表描述和贴花图案，帮助视力障碍人士了解图表内容，读懂图表背后的故事；



## echart 社区地址

> 会有很多echart 的例子

[made a pie](https://madeapie.com/#/);

## canvas vs svg



- 通常情况下，这两种渲染模式是比较相近的，并且是可以相互替换的

-  `ECharts`**最初**采用的**是`canvas`绘制图表**，从`ECharts4.x`开始，**发布了`SVG`渲染器**，提供了另外的一种选择。
- 一般来说，`Canvas` 更适合**绘制图形元素数量非常大（这一般是由数据量大导致）的图表**（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等），也利于实现某些视觉特效；
- 但是，在不少场景中，`SVG` 具有重要的优势：它的**内存占用更低**（这对移动端尤其重要）、**渲染性能略高**、并且用户使用浏览器内置的**缩放功能时不会模糊**



- **总结**：只有**pc端柱形图超过1000数据时** 使用 `canvas` 的性能会高一点，剩下大多数情况或者其他类图的情况下，都是svg 性能更高一点



# 第三节、Echart 使用



## 一、基本使用

1. 下载 `echart`

   ~~~shell
   npm install echarts
   ~~~

2. 初始化实例

   > init方法参数：el，主题theme通常是 “light”，配置选项 {renderer: "svg"} 可以设置渲染模式

   ~~~js
   //根据上述，通常数据量小时候用 svg模式，echart 默认使用的 cancer
   var myChart = echarts.init(containerDom, null, { renderer: 'svg' });

   //5.3.0 的版本推荐使用，服务端渲染，svg模式
   const chart = echarts.init(null, null, {
     renderer: 'svg', // 必须使用 SVG 模式
     ssr: true, // 开启 SSR
     width: 400, // 需要指明高和宽
     height: 300
   });
   // 像正常使用一样 setOption
   chart.setOption({
     //...
   });

   // 输出字符串
   const svgStr = chart.renderToSVGString();
   ~~~

3. 配置 `echart` 选项生成图标

   > 需要图标刷新的话，重新调用一下该api即可

   ~~~js
   myChart.setOption({...})
   ~~~

4. option配置选项

   ~~~js
   // 指定图表的配置项和数据
         var option = {
           title: {
             text: 'ECharts 入门示例'
           },
           //工具栏触碰时的提示
           tooltip: {},
           //图例
           legend: {
             data: ['销量']
           },
           xAxis: {
             inverse:true   //此属性控制方向,默认为false,改为true就达到你要的要求了
             data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
           },
           yAxis: {},
           //系列 ：表示要展示什么类型的系列数据，通常表示图标要 展示的数据
           series: [
             {
               name: '销量',
               type: 'bar',
               data: [5, 20, 36, 10, 10, 20]
             }
           ]
         };
   ~~~





## 二、echarts 使用封装

### 1、hooks封装

~~~js
import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)
//传入组件
export default function (el: HTMLElement) {

  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

 //手动更新echarts 大小
  const updateSize = () => {
    echartInstance.resize()
  }
 //当浏览器大小发生变化的时候，自动更新图形大小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}

~~~



### 2、echarts 组件封装

~~~typescript
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
})
~~~



### 3、世界地图

1. 在echar5 不在提供地图的geojson数据了，需要自己找

   > geoJson 就是包含地区名称，编码形式，地图所需要的数据，用来注册地图的
- <a href="../../assets/json/world_map/world.zh.json">world.zh.json</a> :设置 `visualMap.inRange` 没有渐变效果

- <a href="../../assets/json/world_map/world.en.js">world.en.js</a>: 比 `world.zh.json`多个了 `encodeOffsets` 和 `crs` 字段, 设置 `visualMap.inRange` 地图有渐变效果。

  > `world.en.js` 来源：https://api.map.baidu.com/api?v=2.0&ak=Y5S7nNrWYd45G4uVIUaTZ00nrldHfIXb

- <a href="../../assets/json/world_map/nameMap.json">nameMap.json</a>

- <a href="../../assets/json/world_map/country.json">country.json</a>

~~~typescript
<template>
<div ref="map" class="container"></div>
</template>

<script>
import * as echarts from "echarts";
import { throttle } from "lodash";
import worldJSON from "../../server/word.json"
import nameMap from "../../server/nameMap.json";
import dataMapArr from "../../server/dataMapArr.json";
export default {
  name: "index",
  props: {
    indexArr: {
      type: Array,
      default: () => [
        // 维度X   维度Y   其他维度 ...
        {
          name: '上海',
          value: [121.47,31.23, 46]
        },
        {
          name: '巴西',
          value: [-47.55, -15.47, 45]
        },              {
          name: '北京',
          value: [100, 37, 85]
        },
        {
          name: '重庆',
          value: [106.55,29.56,65]    // value的前两项是经纬度坐标，第三项为污染度数据
        }
      ],
    }
  },
  mounted() {
    let instance = echarts.init(this.$refs.map)
    //echart5不在支持geojson数据了，需要自己导入下载
    echarts.registerMap('world', {geoJSON: worldJson});
    const option = {
      // 图表主标题
      title: {
        //text: '世界地图', // 主标题文本，支持使用 \n 换行
        //top: 20, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
        left: 'center', // 值: 'left', 'center', 'right' 同上
        textStyle: { // 文本样式
          fontSize: 18,
          fontWeight: 600,
          color: 'black'
        }
      },
      tooltip: {
        trigger: 'item',
        //格式化需要提示的数据
        formatter: throttle(function (params, temp) {
          if (params.name && Array.isArray(params.value)) {
            return params.name + ' : ' + params.value[2];
          } else if (params.name && !Array.isArray(params.value)) {
            return params.name
          }
          return "暂时没有信息"
        }, 200)
      },
      //地理观测，用来观测设置，地图上某一块要设置什么信息例如：背景色，
      geo: {
        //引用geojson数据
        map: 'world',
        silent: true,
        itemStyle: {
          color: '#004981',
          borderColor: '#004981'
        }
      },
        //想当于控制器
       visualMap: {
        show: false,
        min: 0,
        max: 100,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
            //让地图渐变，但是好像要有encodeOffsets 字段，编码偏离量才行，world.en.js可以展示，但是world.zh.json就不行
          color: ['#e6f2fe', '#cce5fe', '#99cbfd', '#66b2fd', '#3398fc', '#007ffc', '#0065c9', '#004c97', '#003264', '#001932']
        }
      },
      series: [
        {
          name: 'World Population (2010)',
          //表示是地图类型的echart
          type: 'map',
          //地图的类型，注册地图时的名字
          mapType: 'world',
          //禁止缩放和拖动
          roam: false,
          itemStyle: {
            areaColor: '#2a82e4', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
            borderWidth: 0.5, // 描边线宽 为 0 时无描边
            borderColor: '#2a82e4', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
            borderType: 'none', // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
            emphasis: {label: {show: true}}
          },
          label: {
            show: false // 是否显示对应地名
          },
            //数组类型：根据namemap所对应的name配置需要展示的数据
            //"dataArr": [ { "name": "阿富汗", "value": 28397.812 }, {"name": "安哥拉", "value": 19549.124 }]
          data: dataMapArr.dataArr,
            //对象类型：每个地区展示的名字 例： "namemap": { "Afghanistan": "阿富汗", "Angola": "安哥拉",
    		//"Albania": "阿尔巴尼亚"},
          nameMap: nameMap,
        },
        {
          //显示散点图的类型
          type: 'effectScatter',
          coordinateSystem: 'geo',
          itemStyle: { // 坐标点颜色
            normal: {
              show: true,
              color: '#d41a2e',
              shadowBlur: 10,
              shadowColor: '#fff'
            }
          },
          //设置散列图大小，dataItem 是 this.indexArr 集合里的元素
          symbolSize: dataItem => dataItem[2] * 0.2,
          //需要展示散点图的位置，提供经纬度
          data: this.indexArr
        },
      ]
    };
    instance.setOption(option);
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 400px;
}


</style>
~~~





### 4、中国地图3D

1. 需要引入echart3D
2. 3D的飞线不支持自定义symbol

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #main {
            width: 1300px;
            height: 1300px;
        }
    </style>
</head>
<body>
<div id="main"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js"></script>
<script>
  const routes = [
    [
      [
        113.266,
        23.1317
      ],
      [
        103.8014,
        1.3673
      ]
    ]
  ];
  const cities = [
    {
      "name": "新加坡",
      "coord": [
        103.8014,
        1.3673
      ]
    },
    {
      "name": "中国广东",
      "coord": [
        113.266,
        23.1317
      ]
    }
  ];
  var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

  fetch("https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full").then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    const myChart = echarts.init(document.getElementById("main"));

// 注册地图名字(china)和数据(geoJson)
    echarts.registerMap("china", data);
// 图表配置项
    let geoCoordMap = {
      "海门": [121.15, 31.89],
      "鄂尔多斯": [109.781327, 39.608266],
      "招远": [120.38, 37.35],
      "舟山": [122.207216, 29.985295],
      "齐齐哈尔": [123.97, 47.33],
      "盐城": [120.13, 33.38],
      "赤峰": [118.87, 42.28],
      "青岛": [120.33, 36.07],
      "乳山": [121.52, 36.89],
      "金昌": [102.188043, 38.520089],
      "泉州": [118.58, 24.93],
      "莱西": [120.53, 36.86],
      "日照": [119.46, 35.42],
      "胶南": [119.97, 35.88],
      "南通": [121.05, 32.08],
      "拉萨": [91.11, 29.97],
      "云浮": [112.02, 22.93],
      "梅州": [116.1, 24.55],
      "文登": [122.05, 37.2],
      "上海": [121.48, 31.22],
      "攀枝花": [101.718637, 26.582347],
      "威海": [122.1, 37.5],
      "承德": [117.93, 40.97],
      "厦门": [118.1, 24.46],
      "汕尾": [115.375279, 22.786211],
      "潮州": [116.63, 23.68],
      "丹东": [124.37, 40.13],
      "太仓": [121.1, 31.45],
      "曲靖": [103.79, 25.51],
      "烟台": [121.39, 37.52],
      "福州": [119.3, 26.08],
      "瓦房店": [121.979603, 39.627114],
      "即墨": [120.45, 36.38],
      "抚顺": [123.97, 41.97],
      "玉溪": [102.52, 24.35],
      "张家口": [114.87, 40.82],
      "阳泉": [113.57, 37.85],
      "莱州": [119.942327, 37.177017],
      "湖州": [120.1, 30.86],
      "汕头": [116.69, 23.39],
      "昆山": [120.95, 31.39],
      "宁波": [121.56, 29.86],
      "湛江": [110.359377, 21.270708],
      "揭阳": [116.35, 23.55],
      "荣成": [122.41, 37.16],
      "连云港": [119.16, 34.59],
      "葫芦岛": [120.836932, 40.711052],
      "常熟": [120.74, 31.64],
      "东莞": [113.75, 23.04],
      "河源": [114.68, 23.73],
      "淮安": [119.15, 33.5],
      "泰州": [119.9, 32.49],
      "南宁": [108.33, 22.84],
      "营口": [122.18, 40.65],
      "惠州": [114.4, 23.09],
      "江阴": [120.26, 31.91],
      "蓬莱": [120.75, 37.8],
      "韶关": [113.62, 24.84],
      "嘉峪关": [98.289152, 39.77313],
      "广州": [113.23, 23.16],
      "延安": [109.47, 36.6],
      "太原": [112.53, 37.87],
      "清远": [113.01, 23.7],
      "中山": [113.38, 22.52],
      "昆明": [102.73, 25.04],
      "寿光": [118.73, 36.86],
      "盘锦": [122.070714, 41.119997],
      "长治": [113.08, 36.18],
      "深圳": [114.07, 22.62],
      "珠海": [113.52, 22.3],
      "宿迁": [118.3, 33.96],
      "咸阳": [108.72, 34.36],
      "铜川": [109.11, 35.09],
      "平度": [119.97, 36.77],
      "佛山": [113.11, 23.05],
      "海口": [110.35, 20.02],
      "江门": [113.06, 22.61],
      "章丘": [117.53, 36.72],
      "肇庆": [112.44, 23.05],
      "大连": [121.62, 38.92],
      "临汾": [111.5, 36.08],
      "吴江": [120.63, 31.16],
      "石嘴山": [106.39, 39.04],
      "沈阳": [123.38, 41.8],
      "苏州": [120.62, 31.32],
      "茂名": [110.88, 21.68],
      "嘉兴": [120.76, 30.77],
      "长春": [125.35, 43.88],
      "胶州": [120.03336, 36.264622],
      "银川": [106.27, 38.47],
      "张家港": [120.555821, 31.875428],
      "三门峡": [111.19, 34.76],
      "锦州": [121.15, 41.13],
      "南昌": [115.89, 28.68],
      "柳州": [109.4, 24.33],
      "三亚": [109.511909, 18.252847],
      "自贡": [104.778442, 29.33903],
      "吉林": [126.57, 43.87],
      "阳江": [111.95, 21.85],
      "泸州": [105.39, 28.91],
      "西宁": [101.74, 36.56],
      "宜宾": [104.56, 29.77],
      "呼和浩特": [111.65, 40.82],
      "成都": [104.06, 30.67],
      "大同": [113.3, 40.12],
      "镇江": [119.44, 32.2],
      "桂林": [110.28, 25.29],
      "张家界": [110.479191, 29.117096],
      "宜兴": [119.82, 31.36],
      "北海": [109.12, 21.49],
      "西安": [108.95, 34.27],
      "金坛": [119.56, 31.74],
      "东营": [118.49, 37.46],
      "牡丹江": [129.58, 44.6],
      "遵义": [106.9, 27.7],
      "绍兴": [120.58, 30.01],
      "扬州": [119.42, 32.39],
      "常州": [119.95, 31.79],
      "潍坊": [119.1, 36.62],
      "重庆": [106.54, 29.59],
      "台州": [121.420757, 28.656386],
      "南京": [118.78, 32.04],
      "滨州": [118.03, 37.36],
      "贵阳": [106.71, 26.57],
      "无锡": [120.29, 31.59],
      "本溪": [123.73, 41.3],
      "克拉玛依": [84.77, 45.59],
      "渭南": [109.5, 34.52],
      "马鞍山": [118.48, 31.56],
      "宝鸡": [107.15, 34.38],
      "焦作": [113.21, 35.24],
      "句容": [119.16, 31.95],
      "北京": [116.46, 39.92],
      "徐州": [117.2, 34.26],
      "衡水": [115.72, 37.72],
      "包头": [110, 40.58],
      "绵阳": [104.73, 31.48],
      "乌鲁木齐": [87.68, 43.77],
      "枣庄": [117.57, 34.86],
      "杭州": [120.19, 30.26],
      "淄博": [118.05, 36.78],
      "鞍山": [122.85, 41.12],
      "溧阳": [119.48, 31.43],
      "库尔勒": [86.06, 41.68],
      "安阳": [114.35, 36.1],
      "开封": [114.35, 34.79],
      "济南": [117, 36.65],
      "德阳": [104.37, 31.13],
      "温州": [120.65, 28.01],
      "九江": [115.97, 29.71],
      "邯郸": [114.47, 36.6],
      "临安": [119.72, 30.23],
      "兰州": [103.73, 36.03],
      "沧州": [116.83, 38.33],
      "临沂": [118.35, 35.05],
      "南充": [106.110698, 30.837793],
      "天津": [117.2, 39.13],
      "富阳": [119.95, 30.07],
      "泰安": [117.13, 36.18],
      "诸暨": [120.23, 29.71],
      "郑州": [113.65, 34.76],
      "哈尔滨": [126.63, 45.75],
      "聊城": [115.97, 36.45],
      "芜湖": [118.38, 31.33],
      "唐山": [118.02, 39.63],
      "平顶山": [113.29, 33.75],
      "邢台": [114.48, 37.05],
      "德州": [116.29, 37.45],
      "济宁": [116.59, 35.38],
      "荆州": [112.239741, 30.335165],
      "宜昌": [111.3, 30.7],
      "义乌": [120.06, 29.32],
      "丽水": [119.92, 28.45],
      "洛阳": [112.44, 34.7],
      "秦皇岛": [119.57, 39.95],
      "株洲": [113.16, 27.83],
      "石家庄": [114.48, 38.03],
      "莱芜": [117.67, 36.19],
      "常德": [111.69, 29.05],
      "保定": [115.48, 38.85],
      "湘潭": [112.91, 27.87],
      "金华": [119.64, 29.12],
      "岳阳": [113.09, 29.37],
      "长沙": [113, 28.21],
      "衢州": [118.88, 28.97],
      "廊坊": [116.7, 39.53],
      "菏泽": [115.480656, 35.23375],
      "合肥": [117.27, 31.86],
      "武汉": [114.31, 30.52],
      "大庆": [125.03, 46.58]
    };
    var alirl=  [[[121.15, 31.89],[109.781327, 39.608266]],
      [[120.38, 37.35],[122.207216, 29.985295]],
      [[123.97, 47.33],[120.13, 33.38]],
      [[118.87, 42.28],[120.33, 36.07]],
      [[121.52, 36.89],  [117.93, 40.97]],
      [[102.188043, 38.520089], [122.1, 37.5]],
      [[118.58, 24.93],[101.718637, 26.582347]],
      [[120.53, 36.86],[121.48, 31.22]],
      [[119.46, 35.42],[122.05, 37.2]],
      [[119.97, 35.88],[116.1, 24.55]],
      [[121.05, 32.08],[112.02, 22.93]],
      [[91.11, 29.97],[118.1, 24.46]]
    ]
    var convertData = function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      // console.log(res)
      return res;
    };
    var option = {
      title: {
        text: '测试bar3D、scatter3D、geo3D',
        x: 'left',
        top: "10",
        textStyle: {
          color: '#000',
          fontSize: 14
        }
      },
      tooltip: {
        show: true,
        trigger: "item",
        position: "inside",
       /* formatter:(params)=>{
          console.log(params);
          let data = "测试1:"+params.name + "<br/>"+"值:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
          return data;
        },*/
        formatter: '{b}',
        backgroundColor: "rgba(50, 50, 50, 0.7)",
        textStyle: {
          color: "#FFFFFF",
          textalign: "center",
          fontSize: "12px",
        },
      },
      visualMap: [{
        type: 'continuous',
        seriesIndex: 0,
        text: ['bar3D'],
        calculable: true,
        max: 300,
        inRange: {
          color: ['#9ff32b','#9ff32b']//柱图配色
        }
      }, {
        type: 'continuous',
        seriesIndex: 1,
        text: ['scatter3D'],
        left: 'right',
        max: 100,
        calculable: true,
        inRange: {
          color: ['#000', 'blue', 'purple']//气泡配色
        }
      }],
      geo3D: {
        map: 'china',
        roam: true,
        itemStyle: {
          areaColor: '#374151',// 地图配色
          opacity: 1,
          borderWidth: 0.4,
          borderColor: '#9ff32b'// 地图边配色
        },
        label: {
          show: true, // (地图上的城市名称)是否显示标签
          distance: 5,
          formatter: function (params) {
            return params.name ? params.name : " ";
          },
          textStyle: {
            // 标签的字体样式
            color: "#fff", // 地图初始化区域字体颜色
            fontSize: 16, // 字体大小
          },
        },
        emphasis: { //当鼠标放上去  地区区域是否显示名称
          itemStyle: {
            areaColor: '#7db41b',// 鼠标移入地图配色
          },
          label: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 3,
              backgroundColor: 'rgba(0,0,0,1)'//鼠标移入文字加背景
            }
          }
        },
        //shading: 'lambert',
        light: {
          main: {
            // 场景主光源的设置，在 globe 组件中就是太阳光。
            color: "#3D94CE", // 主光源的颜色。
            intensity: 1.2, // 主光源的强度。
            shadow: false, // 主光源是否投射阴影。默认关闭。开启阴影可以给场景带来更真实和有层次的光照效果。会增加程序的运行开销。
            shadowQuality: "high", // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
            alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
            beta: 10, // 主光源绕 y 轴，即左右旋转的角度。
          },
          ambient: {
            // 全局的环境光设置。
            color: "red", // 环境光的颜色。[ default: #fff ]
            intensity: 0.5, // 环境光的强度。[ default: 0.2 ]
          },
        },
        // 三维图形的着色效果
        shading: "realistic",
        // 后处理特效
/*        postEffect: {
          enable: true,
          SSAO: {
            enable: true,
            radius: 1,
            intensity: 1,
            quality: "high",
          },
          bloom: {
            enable: true,
            strength: 0.5,
            radius: 0,
            threshold: 0,
          },
          FXAA: {
            enable: true,
            alpha: 0.5,
          },
        },*/
        environment: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              // 配置为垂直渐变的背景
              offset: 0,
              color: "#183890", // 天空颜色
            },
            {
              offset: 0.7,
              color: "#040829", // 地面颜色
            },
            {
              offset: 1,
              color: "#040829", // 地面颜色
            },
          ],
          false
        ),
        data: convertData([{
          name: "阳泉",
          value: ((Math.random() * 100) + 50).toFixed(2)
        }, {
          name: "莱州",
          value: ((Math.random() * 100) + 50).toFixed(2)
        }, {
          name: "湖州",
          value: ((Math.random() * 100) + 50).toFixed(2)
        }, {
          name: "汕头",
          value: ((Math.random() * 100) + 50).toFixed(2)
        }, {
          name: "昆山",
          value: ((Math.random() * 100) + 50).toFixed(2)
        }, {
          name: "张家口",
          value: ((Math.random() * 100) + 50).toFixed(2)
        }])
        // 地面可以使整个场景看起来更真实，更有模型感。
      /*  groundPlane: {
          show: true, // 是否显示地面
          color: "#aaa", // 地面颜色
        },*/
      },
      series: [

        {
          type: "map3D",
          map: "china",
          zlevel: 1,
          label: {
            show: false, // (地图上的城市名称)是否显示标签
          },
        },
        //柱状图
        {
          name: 'bar3D',
          type: "bar3D",
          coordinateSystem: 'geo3D',
          barSize: 0.5, //柱子粗细
          shading: 'lambert',
          opacity: 1,
          bevelSize:0.5,
          label: {
            show: false,
            formatter: '{b}'
          },
          data: convertData([{
            name: "海门",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "鄂尔多斯",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "招远",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "舟山",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "齐齐哈尔",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "盐城",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "赤峰",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "青岛",
            value: (Math.random() * 300).toFixed(2)
          },  {
            name: "南通",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "拉萨",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "云浮",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "梅州",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "文登",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "上海",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "攀枝花",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "威海",
            value: (Math.random() * 200).toFixed(2)
          },  {
            name: "福州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "瓦房店",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "即墨",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "抚顺",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "玉溪",
            value: (Math.random() * 200).toFixed(2)
          },{
            name: "常熟",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "东莞",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "河源",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "淮安",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "泰州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "南宁",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "营口",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "惠州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "江阴",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "蓬莱",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "韶关",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "嘉峪关",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "广州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "延安",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "太原",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "清远",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "中山",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "昆明",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "寿光",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "盘锦",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "长治",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "深圳",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "珠海",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "宿迁",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "咸阳",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "铜川",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "平度",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "佛山",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "海口",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "江门",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "章丘",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "肇庆",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "大连",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "临汾",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "吴江",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "石嘴山",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "沈阳",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "苏州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "茂名",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "嘉兴",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "长春",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "胶州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "银川",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "张家港",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "三门峡",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "锦州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "南昌",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "柳州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "三亚",
            value: (Math.random() * 300).toFixed(2)
          }, {
            name: "自贡",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "吉林",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "阳江",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "泸州",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "西宁",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "宜宾",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "呼和浩特",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "成都",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "大同",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "镇江",
            value: (Math.random() * 100).toFixed(2)
          }, {
            name: "桂林",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "张家界",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "宜兴",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "北海",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "西安",
            value: (Math.random() * 200).toFixed(2)
          }, {
            name: "金坛",
            value: (Math.random() * 200).toFixed(2)
          },

            {
              name: "包头",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "绵阳",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "乌鲁木齐",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "枣庄",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "杭州",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "淄博",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "鞍山",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "溧阳",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "库尔勒",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "安阳",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "开封",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "济南",
              value: (Math.random() * 100).toFixed(2)
            }, {
              name: "德阳",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "温州",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "九江",
              value: (Math.random() * 100).toFixed(2)
            }, {
              name: "邯郸",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "临安",
              value: (Math.random() * 100).toFixed(2)
            }, {
              name: "兰州",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "沧州",
              value: (Math.random() * 200).toFixed(2)
            },

            {
              name: "秦皇岛",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "株洲",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "石家庄",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "莱芜",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "常德",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "保定",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "湘潭",
              value: (Math.random() * 100).toFixed(2)
            }, {
              name: "金华",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "岳阳",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "长沙",
              value: (Math.random() * 100).toFixed(2)
            }, {
              name: "衢州",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "廊坊",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "菏泽",
              value: (Math.random() * 100).toFixed(2)
            }, {
              name: "合肥",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "武汉",
              value: (Math.random() * 200).toFixed(2)
            }, {
              name: "大庆",
              value: (Math.random() * 200).toFixed(2)
            }
          ]),
        },
        {
          name: 'scatter3D',
          type: "scatter3D",
          coordinateSystem: 'geo3D',
          symbol: 'pin',
          symbolSize: 30,
          opacity: 1,
          label: {
            show: false,
            formatter: '{b}'
          },
          itemStyle: {
            borderWidth: 0.5,
            borderColor: '#fff'//气泡边的颜色
          },
          data: convertData([{
            name: "阳泉",
            value: ((Math.random() * 100) + 50).toFixed(2)
          }, {
            name: "莱州",
            value: ((Math.random() * 100) + 50).toFixed(2)
          }, {
            name: "湖州",
            value: ((Math.random() * 100) + 50).toFixed(2)
          }, {
            name: "汕头",
            value: ((Math.random() * 100) + 50).toFixed(2)
          }, {
            name: "昆山",
            value: ((Math.random() * 100) + 50).toFixed(2)
          }, {
            name: "张家口",
            value: ((Math.random() * 100) + 50).toFixed(2)
          }])
        },
        //画线
        {
          type: 'lines3D',
          coordinateSystem: 'geo3D',
          zlevel: 2, //设置这个才会有轨迹线的小尾巴
          polyline: false,
          effect: {
            show: true,
            period: 10,
            trailLength: 0.1,
            trailColor: 'red',
            color: '#fff', //流动点颜色
            symbol: planePath,
            symbolSize: 6
          },
          lineStyle: {
            normal: {
              color: '#e4ff00', //线条颜色
              width: 2,
              curveness: 0.5,
              shadowColor: '#fff',
            }
          },
          blendMode: 'lighter',
          data:alirl
        }
      ]
    };
// 设置图表实例的配置项以及数据
    myChart.setOption(option);
  })

</script>
</html>
~~~



# 第四节、Echart Faq



## 一、解决echarts宽度100%变成了100px

> 问题：外层div设置宽高为100%，在渲染出来的时候变成了100px

- 原因：这种情况一般都是 `echart` 所在的 `div` 一开始是 `display: none`，一般出现在以下几种情况：

1. `display: none` 解决方法（没试过，嫌麻烦）：
   1、通过 `js` 获取外层 `div` 的宽高，然后设置给图表容器
   2、加  `mychart.resize()`



2. `elementUI` 解决方案

   > 原因：`echats` 放在了 `el-tab-pane  ` 中

   - `el-tab-pane` 有一个属性：`lazy`，表示标签是否延迟渲染。设为true，延时加载即可。



3. **首次**加载的 `v-if` 或者 `v-show` 设置为`true`。

4. 所在 `div` 用了 `v-show`，这种情况要不换成 `v-if`，要不就设置初始值是`true`。换成 `v-if` 可行，但在频繁显示或不显示的时候不适用 `v-if`，所以在试用 `v-show` 且初始为 `false` 的时候，可以使用 `resize()`

~~~js
    watch：{
        show(v){
            // 在show为true，也就是显示的时候，调用 resize 解决100px的问题
            if(v){
              this.$nextTick(() => this.$refs.chart.instance.resize())
            }
        }
    }
~~~



## 二、切换option样式覆盖的问题

> 在切换 `option` 的时候，记得 `clear` 一下就好了

~~~js
  watch: {
    option: {
        handler() {
          if (this.$refs.echartRef) {
            this.instance = echarts.init(this.$refs.echartRef)
            if(this.instance) {
              this.instance.clear()
              this.instance.setOption(this.option)
            }
          }
        },
      deep: true,
      immediate: true
    }
  }
~~~





## 三、不显示文字只显示图，label旋转45、渐变

~~~js
  xAxis: [
          {
            axisLine: {show: false},
            axisTick: {show: false},
            data: this.Xlist,
            axisLabel: {
              //旋转45度
              rotate: 45,
            }
          }
        ],
 yAxis: [
          {
            type: "value",
            //不显示文字文本
            axisLabel: {
              interval: 0,
              fontSize: "0"
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
          }
        ],

 series: [
          {
            smooth: true, //这个是把线变成曲线
            itemStyle: {
              normal: {
                color: "#fb8c1e",
                lineStyle: {
                  color: "#f1ad5e"
                }
              }
            },
            areaStyle: {
      		//折线图渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(251,140,30,0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(241,173,94,0.3)'
                }
              ])
            },
            symbol: "none",
            type: "line",
            data: this.Ylist
          }
        ]
~~~



