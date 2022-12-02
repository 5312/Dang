import styles from './index.module.less';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { useEffect /* useState */ } from 'react';
// @ts-ignore

let Viewer: any = null;
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NzFjNDNjYi0zMGY5LTQ3N2UtODk0Yi0xMzc5MjZiZTc3ZTQiLCJpZCI6MTA3OTM3LCJpYXQiOjE2NjMxMjkzNTV9.HbjzEm8mxEkj3f4LPjmtdF97Qt-AYdbn2lZq1nYsKwc';
// 配置
let config = {
  fullscreenButton: true, // 全屏
  homeButton: true, // 视角返回初始位置
  sceneModePicker: false, // 选择视角的模式（球体、平铺、斜视平铺）
  navigationHelpButton: true, // 导航帮助(手势，鼠标)
  baseLayerPicker: false, // 图层选择器（地形影像服务）
  geocoder: false, // 位置查找工具
  animation: false, // 左下角仪表盘（动画器件）
  timeline: false, // 底部时间线
  vrButton: false, // VR
  infoBox: false, // 沙箱开启报错
  terrainProvider: Cesium.createWorldTerrain(),
};
export default function CesiumView() {
  useEffect(() => {
    // console.log('update');
    if (Viewer) Viewer?.destroy();
    let cesiumChildDom = document.getElementsByClassName('cesium-viewer')[0];
    if (cesiumChildDom) {
      document.getElementById('cesiumContainer')?.removeChild(cesiumChildDom);
    }

    Viewer = new Cesium.Viewer('cesiumContainer', config);
    Viewer.scene.globe.depthTestAgainstTerrain = true;
    Viewer._cesiumWidget._creditContainer.style.display = 'none'; // 底部字体

    Viewer.scene.primitives.add(Cesium.createOsmBuildings());

    Viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000),
    });
    // 位置角度
    let orientation = {
      heading: Cesium.Math.toRadians(90),
      pitch: -0.4, //Cesium.Math.toRadians(-90),
      roll: 0.0,
    };

    Viewer.scene.camera.setView({
      orientation,
    });
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
