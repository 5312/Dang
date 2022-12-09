import * as Cesium from 'cesium';

let Viewer: any = null;

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NzFjNDNjYi0zMGY5LTQ3N2UtODk0Yi0xMzc5MjZiZTc3ZTQiLCJpZCI6MTA3OTM3LCJpYXQiOjE2NjMxMjkzNTV9.HbjzEm8mxEkj3f4LPjmtdF97Qt-AYdbn2lZq1nYsKwc';

// 配置
let config: Cesium.Viewer.ConstructorOptions = {
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

const InitCesium = async () => {
  Viewer = new Cesium.Viewer('cesiumContainer', config);

  // Enable lighting based on sun/moon positions
  Viewer.scene.globe.enableLighting = true;
  Viewer.scene.globe.depthTestAgainstTerrain = true;
  Viewer._cesiumWidget._creditContainer.style.display = 'none'; // 底部字体
  // 地下可视化
  Viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
  // Viewer.scene.primitives.add(Cesium.createOsmBuildings());

  // 位置角度
  const initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(
    334.32, //21.27879878293835, // heading 偏航角
    -18.43, //-21.34390550872461, //pitch俯仰角
    360, //0.0716951918898415, // 翻滚角
  );
  /* eslint-disable */
  let homeCameraView = {
    destination: Cesium.Cartesian3.fromDegrees(107.97038, 35.06478, 1376),
    orientation: initialOrientation, // orientation,
  };
  // 转动相机
  Viewer.camera.flyTo({
    ...homeCameraView,
    duration: 5, // 持续时间
  });
  // set init view setView功能设置相机的位置和方向

  // 3dtiles模型
  let url = '/3Dtiles/3DtilesDafosi/tileset.json';
  // let url = '/3Dtiles/3DtilesDafosiScale/tileset.json';
  const tileset = Viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(1437273),
    }),
  );
  await tileset.readyPromise;
  console.log('加载成功');
  // Apply the default style if it exists
  let extras = tileset.asset.extras;
  if (
    Cesium.defined(extras) &&
    Cesium.defined(extras.ion) &&
    Cesium.defined(extras.ion.defaultStyle)
  ) {
    tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
  }
  // Viewer.zoomTo(tileset);
  let Longitude = 107.9679787955;
  let Latitude = 35.0790418397;
  let height = 683.851427036;
  //创建平移矩阵方法二
  var translation = Cesium.Cartesian3.fromArray([0, 0, 0]);
  let m = Cesium.Matrix4.fromTranslation(translation);
  //生效
  tileset._modelMatrix = m;

  return Viewer;
};

export default InitCesium;
