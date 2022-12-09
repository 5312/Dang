import styles from './index.module.less';
import InitCesium from './init';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { useEffect } from 'react';
// @ts-ignore

let Viewer: any = null;

export default function CesiumView() {
  useEffect(() => {
    // update 更新出现多个问题
    if (Viewer) Viewer?.destroy();
    let cesiumChildDom = document.getElementsByClassName('cesium-viewer')[0];
    if (cesiumChildDom) {
      document.getElementById('cesiumContainer')?.removeChild(cesiumChildDom);
    }
    // 创建实例
    Viewer = InitCesium();
  }, []);
  return (
    <>
      <div
        id="cesiumContainer"
        className={styles.cesiumContainer}
        style={{ height: '100vh' }}
      ></div>
    </>
  );
}
