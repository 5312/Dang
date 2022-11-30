import styles from './index.less';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { useEffect /* useState */ } from 'react';
// @ts-ignore
// window.CESIUM_BASE_URL = '../Cesium/';

export default function CesiumView() {
  // const [viewer, setViewer] = useState(null as any);
  useEffect(() => {
    let config = {
      geocoder: false, // 位置查找工具
      homeButton: true, // 视角返回初始位置
      sceneModePicker: true, // 选择视角的模式（球体、平铺、斜视平铺）
      baseLayerPicker: false, // 图层选择器（地形影像服务）
      navigationHelpButton: true, // 导航帮助(手势，鼠标)
      animation: false, // 左下角仪表盘（动画器件）
      timeline: false, // 底部时间线
      fullscreenButton: true, // 全屏
      vrButton: true, // VR
    };

    const Viewer: any = new Cesium.Viewer('cesiumContainer', config);
    Viewer.scene.globe.depthTestAgainstTerrain = true;

    Viewer._cesiumWidget._creditContainer.style.display = 'none';
    // setViewer(Viewer);
  }, []);

  return (
    <>
      <div id="cesiumContainer" className={styles.cesiumContainer}></div>
      {/* {viewer} */}
    </>
  );
}
