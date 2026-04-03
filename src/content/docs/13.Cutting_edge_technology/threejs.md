---
title: 'Threejs三要素'
---

# Threejs三要素

## 场景 sence

## 相机 camera

Object3D属性

lookAt()设置相机焦点方向

正交

立体

透视

立方



- 首先，设置相机的 `position` 属性，确定相机在空间中的位置。
- 然后，调用 `camera.lookAt(targetX, targetY, targetZ)` 或 `camera.lookAt(new THREE.Vector3(targetX, targetY, targetZ))` 来设置相机的朝向。
- **示例**：如果相机位于 `(500, 500, 500)`，并希望它**看向**场景原点 `(0, 0, 0)`，则代码为 `camera.position.set(500, 500, 500); camera.lookAt(0, 0, 0);`。



## 渲染器 render



轨道控制器： 控制相机 运动  OrbitControls





# 绘制物体三要素



## 几何体

分段数x y



## 材质

颜色、纹理、光照响应（漫反射，镜面反射，高光，哑光）

## 网格模型

# 加载器

# TextureLoader

加载[texture](https://threejs.org/docs/index.html#api/zh/textures/Texture)的一个类。 内部使用[ImageLoader](https://threejs.org/docs/index.html#api/zh/loaders/ImageLoader)来加载文件。



# 光源

环境光：均匀，各个方向都有光，没有死角

​	参数一：颜色

​	参数二：光照强度 1

平行光：特定方向照射过来的光源，例如太阳光


```
/*
  // 默认设置对象
  const settings = {
    circleColor: '#ff0000',
    squareColor: '#00ff00',
    radius: 50,
    squareSize: 50,
    drawShape: 'circle',
    rotationSpeed: 'circle',
    animationSpeed: 1,
    cubeSize: 1,
    cubeColor: 1
  };

  // 更新立方体颜色和大小的函数
  function draw() {
    // cube.material.color.set(settings.cubeColor);
    // cube.scale.set(settings.cubeSize, settings.cubeSize, settings.cubeSize);
  }
  // 初始化 GUI
  const gui = new dat.GUI();
  gui.add(settings, 'rotationSpeed', 0, 0.1).name('Rotation Speed');
  gui.addColor(settings, 'cubeColor').onChange(draw).name('Cube Color');
  gui.add(settings, 'cubeSize', 0.1, 3).onChange(draw).name('Cube Size');

  gui.addColor(settings, 'circleColor').onChange(draw).name('Circle Color');
  gui.addColor(settings, 'squareColor').onChange(draw).name('Square Color');
  gui.add(settings, 'radius', 10, 100).onChange(draw).name('Circle Radius');
  gui.add(settings, 'squareSize', 10, 100).onChange(draw).name('Square Size');
  gui.add(settings, 'drawShape', ['circle', 'square']).onChange(draw).name('Shape Type');
  gui.add(settings, 'animationSpeed', 0, 5).onChange(draw).name('Animation Speed');
  // 创建文件夹
  const shapeFolder = gui.addFolder('Shape Controls');
  shapeFolder.add(settings, 'radius', 10, 100).onChange(draw);
  shapeFolder.add(settings, 'drawShape', ['circle', 'square']).onChange(draw);
  shapeFolder.open(); // 默认展开
  const colorFolder = gui.addFolder('Color Controls');
  colorFolder.addColor(settings, 'circleColor').onChange(draw);
  colorFolder.addColor(settings, 'squareColor').onChange(draw);
  colorFolder.open(); // 默认展开
*/
```

购入了 Three.js / Webgl 相关的小册 大家可以登录下面这个账号学习[无辜笑]

Three.js 通关秘籍 - zxg_神说要有光 - 掘金小册

19224496735

!Aa123456
# 案例
<script setup>
import CustomComponent from '../../components/three/extraModel/index.vue'
</script>

<CustomComponent />
