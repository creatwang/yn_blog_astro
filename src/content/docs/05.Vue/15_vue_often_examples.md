---
title: 'Vue常见开发案例'
---

# 1、vue2 关闭指令

`v-close`

~~~js
  directives: {
    close: {
      inserted(el, binding, vnode) {
        window.addEventListener("click", e => {
          if (!el.contains(e.target)) vnode.context.flag = false;
        });
      }
    }
  }
~~~



# 2、Tanstack Table

- 记录下使用问题，这里的 columns 数据变化时想要更新到页面的时候，要使用计算属性，函数的方式和data一样不然没有效果的

~~~vue
  const getTable = (dataFun) => {
    return useVueTable({
      get data() {
        return dataFun();
      },
      get columns() {
        return tableConfig.value[props.fittingType].columns;
      },
      manualPagination: true,
      onPaginationChange: handlePaginationChange,
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
    }) as Table<MainFittingDataType>;
  };
~~~



# 3、优秀的hooks组件封装案例Modal*

1. 使用

~~~vue

<EditModal @register="registerEditModal" @success="handleSuccess" />

<script setup lang="ts">
import { BasicModal, useModal, useModalInner } from '@/components/Modal';

      /**
   * 修改的model
   * */
  const [registerEditModal, { closeModal, openModal, setModalProps }] = useModal();
</script>

~~~

2. EditModal 使用

~~~vue
<template>
  <BasicModal @register="registerEditModal" width="90%" destroyOnClose></BasicModal>
</template>

<script setup lang="ts">
   /** 注册 Modal */
  const [registerEditModal, { closeModal, setModalProps, changeLoading }] = useModalInner(
    async (data) => {
      try {
        changeLoading(true);
        setModalProps({ loadingTip: '' });

      } catch (error) {
        console.log(error);
        changeLoading(false);
      }
    },
  );

</script>
<style lang="scss" scoped></style>

~~~

3. BasicModal

~~~vue
<template>
  <Modal v-bind="getBindValue" @cancel="handleCancel">
    <template #closeIcon v-if="!$slots.closeIcon">
      <ModalClose
        :canFullscreen="getProps.canFullscreen"
        :fullScreen="fullScreenRef"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen"
      />
    </template>

    <template #title v-if="!$slots.title">
      <ModalHeader
        :helpMessage="getProps.helpMessage"
        :title="getMergeProps.title"
        @dblclick="handleTitleDbClick"
      />
    </template>

    <template #footer v-if="!$slots.footer">
      <ModalFooter v-bind="getBindValue" @ok="handleOk" @cancel="handleCancel">
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </ModalFooter>
    </template>

    <ModalWrapper
      :useWrapper="getProps.useWrapper"
      :footerOffset="wrapperFooterOffset"
      :fullScreen="fullScreenRef"
      ref="modalWrapperRef"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip"
      :minHeight="getProps.minHeight"
      :height="getWrapperHeight"
      :open="openRef"
      :modalFooterHeight="footer !== undefined && !footer ? 0 : undefined"
      v-bind="omit(getProps.wrapperProps, 'open', 'height', 'modalFooterHeight')"
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange"
    >
      <slot></slot>
    </ModalWrapper>

    <template #[item]="data" v-for="item in Object.keys(omit($slots, 'default'))">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
  import type { ModalProps, ModalMethods } from './typing';
  import {
    computed,
    ref,
    watch,
    unref,
    watchEffect,
    toRef,
    getCurrentInstance,
    nextTick,
    useAttrs,
  } from 'vue';
  import Modal from './components/Modal';
  import ModalWrapper from './components/ModalWrapper.vue';
  import ModalClose from './components/ModalClose.vue';
  import ModalFooter from './components/ModalFooter.vue';
  import ModalHeader from './components/ModalHeader.vue';
  import { isFunction } from '@/utils/is';
  import { deepMerge } from '@/utils';
  import { basicProps } from './props';
  import { useFullScreen } from './hooks/useModalFullScreen';
  import { omit } from 'lodash-es';
  import { useDesign } from '@/hooks/web/useDesign';

  defineOptions({ name: 'BasicModal', inheritAttrs: false });

  const props = defineProps(basicProps);

  const emit = defineEmits([
    'open-change',
    'height-change',
    'cancel',
    'ok',
    'register',
    'update:open',
    'fullscreen',
  ]);

  const attrs = useAttrs();
  const openRef = ref(false);
  const propsRef = ref<Partial<ModalProps> | null>(null);
  const modalWrapperRef = ref<any>(null);
  const { prefixCls } = useDesign('basic-modal');

  // modal   Bottom and top height
  const extHeightRef = ref(0);
  const modalMethods: ModalMethods = {
    setModalProps,
    emitOpen: undefined,
    redoModalHeight: () => {
      nextTick(() => {
        if (unref(modalWrapperRef)) {
          (unref(modalWrapperRef) as any).setModalHeight();
        }
      });
    },
  };
  // 重点获取实例
  const instance = getCurrentInstance();
  if (instance) {
    emit('register', modalMethods, instance.uid);
  }

  // Custom title component: get title
  const getMergeProps = computed((): Recordable => {
    return {
      ...props,
      ...(unref(propsRef) as any),
    };
  });

  const {
    handleFullScreen: handleFullScreenInner,
    getWrapClassName,
    fullScreenRef,
  } = useFullScreen({
    modalWrapperRef,
    extHeightRef,
    wrapClassName: toRef(getMergeProps.value, 'wrapClassName'),
  });

  // modal component does not need title and origin buttons
  const getProps = computed((): Recordable => {
    const opt = {
      ...unref(getMergeProps),
      open: unref(openRef),
      okButtonProps: undefined,
      cancelButtonProps: undefined,
      title: undefined,
    };
    return {
      ...opt,
      wrapClassName: unref(getWrapClassName),
    };
  });

    // 这里有时间好好看下
  const getBindValue = computed((): Recordable => {
    const attr = {
      ...attrs,
      ...unref(getMergeProps),
      open: unref(openRef),
    };
    attr['wrapClassName'] =
      `${attr?.['wrapClassName'] || ''} ${unref(getWrapClassName)}` + 'vben-basic-modal-wrap';
    if (unref(fullScreenRef)) {
      return omit(attr, ['height', 'title']);
    }
    return omit(attr, 'title');
  });

  const getWrapperHeight = computed(() => {
    if (unref(fullScreenRef)) return undefined;
    return unref(getProps).height;
  });

  watchEffect(() => {
    openRef.value = !!props.open;
    fullScreenRef.value = !!props.defaultFullscreen;
  });

  watch(
    () => unref(openRef),
    (v) => {
      emit('open-change', v);
      emit('update:open', v);
      if (instance && modalMethods.emitOpen) {
        modalMethods.emitOpen(v, instance.uid);
      }
      nextTick(() => {
        if (props.scrollTop && v && unref(modalWrapperRef)) {
          (unref(modalWrapperRef) as any).scrollTop();
        }
      });
    },
    {
      immediate: false,
    },
  );

  // 取消事件
  async function handleCancel(e: Event) {
    e?.stopPropagation();
    // 过滤自定义关闭按钮的空白区域
    if ((e.target as HTMLElement)?.classList?.contains(prefixCls + '-close--custom')) return;
    if (props.closeFunc && isFunction(props.closeFunc)) {
      const isClose: boolean = await props.closeFunc();
      openRef.value = !isClose;
      return;
    }

    openRef.value = false;
    emit('cancel', e);
  }

  /**
   * @description: 设置modal参数
   */
  function setModalProps(props: Partial<ModalProps>): void {
    // Keep the last setModalProps
    propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);
    if (Reflect.has(props, 'open')) {
      openRef.value = !!props.open;
    }
    if (Reflect.has(props, 'defaultFullscreen')) {
      fullScreenRef.value = !!props.defaultFullscreen;
    }
  }

  function handleOk(e: Event) {
    emit('ok', e);
  }

  function handleHeightChange(height: string) {
    emit('height-change', height);
  }

  function handleExtHeight(height: number) {
    extHeightRef.value = height;
  }

  function handleTitleDbClick(e) {
    if (!props.canFullscreen) return;
    e.stopPropagation();
    handleFullScreen(e);
  }

  // 事件传递
  function handleFullScreen(e) {
    handleFullScreenInner(e);
    emit('fullscreen');
  }
</script>

~~~

5. hooks useModal-useModalInner

~~~ts
import type {
  UseModalReturnType,
  ModalMethods,
  ModalProps,
  ReturnMethods,
  UseModalInnerReturnType,
} from '../typing';
import {
  ref,
  onUnmounted,
  unref,
  getCurrentInstance,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
  computed,
} from 'vue';
import { isProdMode } from '@/utils/env';
import { isFunction } from '@/utils/is';
import { isEqual } from 'lodash-es';
import { tryOnUnmounted } from '@vueuse/core';
import { error } from '@/utils/log';

const dataTransfer = reactive<any>({});

const openData = reactive<{ [key: number]: boolean }>({});

/**
 * @description: Applicable to independent modal and call outside
 */
export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<number>(0);

  function register(modalMethod: ModalMethods, uuid: number) {
    if (!getCurrentInstance()) {
      throw new Error('useModal() can only be used inside setup() or functional components!');
    }
    uid.value = uuid;
    isProdMode() &&
      onUnmounted(() => {
        modal.value = null;
        loaded.value = false;
        dataTransfer[String(unref(uid))] = null;
      });
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return;

    modal.value = modalMethod;
    loaded.value = true;
    modalMethod.emitOpen = (open: boolean, uid: number) => {
      openData[uid] = open;
    };
  }

  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props);
    },

    getOpen: computed((): boolean => {
      return openData[~~unref(uid)];
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.();
    },

    openModal: <T = any>(open = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        open,
      });

      if (!data) return;
      const id = unref(uid);
      if (openOnSet) {
        dataTransfer[id] = null;
        dataTransfer[id] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
      if (!equal) {
        dataTransfer[id] = toRaw(data);
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ open: false });
    },
  };
  return [register, methods];
}

export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<number>(0);

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) {
      error('useModalInner instance is undefined!');
    }
    return instance;
  };

  const register = (modalInstance: ModalMethods, uuid: number) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null;
      });
    uidRef.value = uuid;
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading });
      },
      getOpen: computed((): boolean => {
        return openData[~~unref(uidRef)];
      }),

      changeOkLoading: (loading = true) => {
        getInstance()?.setModalProps({ confirmLoading: loading });
      },

      closeModal: () => {
        getInstance()?.setModalProps({ open: false });
      },

      setModalProps: (props: Partial<ModalProps>) => {
        getInstance()?.setModalProps(props);
      },

      redoModalHeight: () => {
        const callRedo = getInstance()?.redoModalHeight;
        callRedo && callRedo();
      },
    },
  ];
};

~~~



# 4、vue ant desgin Carousel 封装的滚动缩略图

> 改版的话可以让ai来改成其他的版式

~~~vue
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Carousel as AntdCarousel } from 'ant-design-vue';

interface Props {
  images?: string[];
  width?: string;
  aspectRatio?: string;
  thumbWidth?: number;
  thumbGap?: number;
}

const props = withDefaults(defineProps<Props>(), {
  images: () => Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/id/${i + 20}/800/450`),
  width: '100%',
  aspectRatio: '16 / 9',
  thumbWidth: 100,
  thumbGap: 10
});

const THUMB_STEP = computed(() => props.thumbWidth + props.thumbGap);
const mainCarousel = ref();
const currentIndex = ref(0);
const lastIndex = ref(0); // 用于判断方向

// --- 容器宽度与位移逻辑 ---
const thumbContainerRef = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const scrollOffset = ref(0); // 实际驱动 transform 的位移

const updateWidth = () => {
  if (thumbContainerRef.value) {
    containerWidth.value = thumbContainerRef.value.offsetWidth;
  }
};

onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
onUnmounted(() => window.removeEventListener('resize', updateWidth));
watch(currentIndex, (newIdx, oldIdx) => {
  if (containerWidth.value <= 0) return;

  // 1. 考虑容器的 px-3.5 (14px) 内边距
  const padding = 14;
  const effectiveViewWidth = containerWidth.value - padding * 2;

  const totalWidth = props.images.length * THUMB_STEP.value - props.thumbGap;
  const maxScroll = Math.max(0, totalWidth - effectiveViewWidth);

  // 2. 当前视口的物理区间（基于内容区的 0 位）
  const viewLeft = Math.abs(scrollOffset.value);
  const viewRight = viewLeft + effectiveViewWidth;

  if (newIdx > oldIdx) {
    // 【向后切换】：判断下一个是否完全在可视区
    const nextIdx = Math.min(newIdx + 1, props.images.length - 1);
    // 下一个缩略图的右边缘坐标
    const nextRight = nextIdx * THUMB_STEP.value + props.thumbWidth;

    // 如果下一个的右边缘超出了视口右边界 (考虑了内边距)
    if (nextRight > viewRight) {
      // 核心计算：目标位移 = 目标的右边缘 - 有效视口宽度
      // 这样滚动后，下一个缩略图的右边缘会刚好紧贴在右侧 padding 内侧
      const targetScroll = nextRight - effectiveViewWidth;
      scrollOffset.value = -Math.min(maxScroll, targetScroll);
    }
  }
  else if (newIdx < oldIdx) {
    // 【向前切换】：判断前一个是否完全在可视区
    const prevIdx = Math.max(newIdx - 1, 0);
    const prevLeft = prevIdx * THUMB_STEP.value;

    if (prevLeft < viewLeft) {
      // 滚动位移：让前一个缩略图对齐左侧 padding 内侧
      scrollOffset.value = -Math.max(0, prevLeft);
    }
  }

  // 3. 边界强制修正 (处理循环和极端对齐)
  if (newIdx === 0) {
    scrollOffset.value = 0;
  } else if (newIdx === props.images.length - 1) {
    scrollOffset.value = -maxScroll;
  }

  lastIndex.value = newIdx;
});

const handleThumbClick = (index: number) => {
  mainCarousel.value?.goTo(index);
};

const handleBeforeChange = (_from: number, to: number) => {
  currentIndex.value = to;
};
</script>

<template>
  <div class="mx-auto select-none antialiased" :style="{ width: props.width }">
    <!-- 1. 主展示区 -->
    <div class="relative overflow-hidden bg-white">
      <AntdCarousel ref="mainCarousel" :before-change="handleBeforeChange" draggable>
        <div v-for="(img, i) in props.images" :key="i"  class="flex items-center">
          <div :style="{ aspectRatio: props.aspectRatio }" class="w-full h-full">
            <img :src="img" class="w-full h-full object-contain bg-slate-900" draggable="false" />
          </div>
        </div>
      </AntdCarousel>
    </div>

    <!-- 2. 指示图区 -->
    <div ref="thumbContainerRef" class="relative -mt-6 overflow-hidden bg-[rgba(217,217,217,0.5)] px-3.5 py-2 rounded-md">
      <div
        class="flex transition-transform duration-500 cubic-bezier"
        :style="{
          gap: `${props.thumbGap}px`,
          transform: `translateX(${scrollOffset}px)`
        }"
      >
        <div
          v-for="(img, i) in props.images"
          :key="i"
          @click="handleThumbClick(i)"
          class="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 border-2"
          :style="{
            width: `${props.thumbWidth}px`,
            aspectRatio: props.aspectRatio
          }"
          :class="[
            currentIndex === i
              ? 'border-blue-500 ring-4 ring-blue-500/20 scale-95 opacity-100'
              : 'border-transparent opacity-40 hover:opacity-100'
          ]"
        >
          <img :src="img" class="h-full w-full object-cover pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-carousel .slick-dots) { display: none !important; }
.cubic-bezier { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
:deep(.ant-carousel .slick-slide > div) { display: flex; }
</style>

~~~





# 面试题

watchEffect异步处理问题

```js
watchEffect(async() => {
  userInfo.vulue = await getUserInfo();
    // 由于是异步任务，所以在这个地方是收集不到依赖的，要想办法将这个行代码移动到异步代码的上面
  tabRef.value && (tabRef.value.timer = sleep.value)
})
```

