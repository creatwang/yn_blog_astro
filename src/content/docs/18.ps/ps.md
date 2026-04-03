---
title: 'ps'
---

## 一、常见的图片格式

1. jpg图像格式:JPEG (JPG )对色彩的信息保留较好，高清，颜色较多，**我们产品类的图片经常用jpg格**
**式的**
2. gif图像格式∶GIF格式最多只能储存256色，所以通常用来显示简单图形及字体，但是可以保存透明背景
和动画效果,**实际经常用于一些图片小动画效果**
3. png图像格式是一种新兴的网络图形格式，结合了GIF和JPEG的优点，具有存储形式丰富的特点，能够保
持透明背景.**如果想要切成背景透明的图片,请选择png格式.**
4. PSD图像格式PSD格式是Photoshop的专用格式，里面可以存放图层、通道、遮罩等多种设计稿.对我们
    前端人员来说,最大的优点**我们可以直接从上面复制文字,获得图片,还可以测量大小和距离.**

### 切图

1. 图层切图（常用）：
   - 使用工具栏的**移动工具**选中图片，之后在图层栏**右击快速导出png**
   - 合并成一个图选中两个图层右击或者`ctrl+e`合并图层，之后在图层栏右击快速导出png

2. 切片切图：

   - 选中切片工具，截取所需要的图片点击菜单->导出->存数为web所用格式然后后选中格式导出

     **最后要保存选中的切片不是所有的切片**

   - 导出透明背景的话，**选中图层的背景**之后导出，格式设置为`png-8`或者`png24`都可以

3. 插件导出cutterman

   - 窗口>扩展功能>cutterman
   - 选中要导出的图层，点击`合并导出选中的图层` 点击导出

4. 蓝湖



### 截取图片

1. 获取矩形选图工具
    ![image-20230812140635918.png](/assets/markdown/assets/ps.assets/image-20230812140635918.png)
2. 选中之后 `ctrl+j`







```jsx
import { useContext, useEffect, useState } from 'react';
import { CustomLayer, CustomLayerContext } from '@sunzi/components';
import type { IClientPreview, IStore } from '@sunzi/customeow';
import { LayoutProvider } from '@sunzi/customeow';
import CustomeowLink from '@sunzi/customeow-link';
import { isEmpty, throttle } from 'lodash-es';
import { useLocale, useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';
import { Spin } from '@/customeow/src/components';
import { IFragment } from '@/customeow/src/hoc';
import { classnames, getMaiyuanLang } from '@/customeow/src/utils';
import { type ClientJsonData } from '@/https/store/link/types';
import type { Languages } from '@/utils';
import {
  ModifyBioThemeContainerContext,
  SwitchMode,
  UserCustomFinishStatus,
} from '../../../custom-link/modify-bio-theme-container';
import CustomDetailsMobilePreview from '../custom-details-mobile-preview';
import CustomDetailsPcPreview from '../custom-details-pc-preview';
import MobileCustomDetailsContainer from './mobile-custom-details-container';
import PcCustomDetailsContainer from './pc-custom-details-container';

const ENV = process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV;

const ClientDetailsBox = ({
  isXmdScreen,
  controlCustomNumber,
  clientJsonData,
  ableMobilePreview,
}: {
  isXmdScreen: boolean;
  controlCustomNumber: number;
  clientJsonData?: ClientJsonData;
  ableMobilePreview?: boolean;
}) => {
  const st = useTranslations('store');
  const ct = useTranslations('common');
  const {
    alertData,
    mode,
    isSlScreen,
    isUserCustomFinish,
    customLinkProduct,
    setIsUserCustomFinish,
    setCustomAreaHeight,
    orderNumber,
    previewData,
    setPreviewData,
    customDataId,
    setCustomDataId,
  } = useContext(ModifyBioThemeContainerContext);
  const { json } = clientJsonData || { json: {} };
  const { customData, ...otherJson } = json || { customData: {} };
  const local = useLocale();
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);

  // 添加消息监听
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case 'CUSTOM_LINK_CLOSE':
          customewLinkOnClose();
          break;
        case 'CUSTOM_LINK_CONFIRM':
          customewLinkOnConfirm(event.data.data);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const renderDrawer = () => {
    // ------------------------------ 定制成功 ------------------------------
    if (isUserCustomFinish === UserCustomFinishStatus.FINISHED) {
      const previewProps = {
        local,
        customDataId,
        customFeatureId: clientJsonData?.json?.customizerId,
        previewData,
        isXmdScreen,
        controlCustomNumber,
      };
      if (mode === SwitchMode.DESKTOP && isSlScreen && !isXmdScreen) {
        return <CustomDetailsPcPreview {...previewProps} customewLinkOnClose={customewLinkOnClose} />;
      }

      return <CustomDetailsMobilePreview {...previewProps} />;
    } else {
      return (
          <CustomeowLink
            lang={getMaiyuanLang(local) as Languages}
            env={ENV}
            previewMode={true}
            onConfirm={async (customInfoId: string, preview: IClientPreview, _stores: IStore[]) => {
              customewLinkOnConfirm({ customInfoId, preview });
            }}
            onClose={() => {
              customewLinkOnClose();
            }}
            onConfirmError={() => {}}
            layers={customData?.layers}
            connects={customData?.connects}
            functions={customData?.functions}
            showLayerTitle={customData?.showLayerTitle}
            {...otherJson}
          />
      );
    }
  };

  const customewLinkOnConfirm = ({
    customInfoId,
    preview,
  }: {
    customInfoId: string;
    preview: IClientPreview;
  }) => {
    console.log('customewLinkOnConfirm--->>', customewLinkOnConfirm);
    // 创建一个 18 位的纯数字随机数
    const randomNumber = Math.random().toString().slice(2, 20).padEnd(18, '0');
    setCustomDataId(customInfoId || randomNumber);
    setPreviewData(preview);
    setIsUserCustomFinish(UserCustomFinishStatus.FINISHED);
    setIframeLoaded(false);
  };

  const customewLinkOnClose = () => {
    document.body.classList.remove('cm-overflow-hidden');
    setIframeLoaded(false);
    setCustomAreaHeight(undefined);
    setIsUserCustomFinish(UserCustomFinishStatus.NONE_STARTED);
  };

  if (isUserCustomFinish === UserCustomFinishStatus.NONE) return null;

  if (isUserCustomFinish === UserCustomFinishStatus.NONE_STARTED) {
    if (mode === SwitchMode.DESKTOP && !isXmdScreen) {
      return <PcCustomDetailsContainer clientJsonData={clientJsonData} isXmdScreen={isXmdScreen} />;
    }

    return (
      <MobileCustomDetailsContainer clientJsonData={clientJsonData} isXmdScreen={isXmdScreen} />
    );
  }

  if (!isEmpty(clientJsonData)) {
    // ------------------------------ 开始定制 ------------------------------
    if (mode === SwitchMode.DESKTOP && isSlScreen && !isXmdScreen) {
      const customLinkTarget = document.getElementById('custom-area');

      return (
        <div className="pc-customeow-link-container cm-h-screen">
          {/*<CustomLayerContext.Provider value={{ target: customLinkTarget }}>*/}
          {createPortal(
            <div className={'cm-fixed cm-inset-0 cm-z-30 cm-mt-20 cm-bg-opacity-grayAlpha40 _extra_customeow_link_layout_class'}>
              {renderDrawer()}
            </div>,
            document.body,
          )}
          {/*</CustomLayerContext.Provider>*/}
        </div>
      );
    }

    return (
      <>
        {!iframeLoaded && (
          <div className="cm-absolute cm-inset-0 cm-z-[100] cm-flex cm-items-center cm-justify-center cm-bg-white sm-only:cm-fixed">
            <Spin size={32} iconClassName="cm-text-black" />
          </div>
        )}
        <iframe
          src={`/custom-link-preview`}
          className={classnames(
            'cm-h-full cm-w-full cm-border-none sm-only:cm-fixed sm-only:cm-inset-0 sm-only:cm-z-[13] sm-only:cm-overflow-hidden sm-only:cm-bg-white sm-only:cm-pt-20',
            {
              'cm-hidden cm-opacity-0': !iframeLoaded,
            },
          )}
          scrolling="no"
          frameBorder="0"
          onLoad={() => {
            setIframeLoaded(true);
          }}
        />
      </>
    );
  }

  return null;
};

export default ClientDetailsBox;
```