import * as THREE from 'three';
import { Group, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
/* 图片资源 */
import a0 from '../assets/img/0.jpg';
/*
 * 全局变量
 */
let canvas: any;
// 声明视口宽度
let width: number; //= canvas.clientWidth;
// 声明视口高度
let height: number; // = canvas.clientHeight;
// 场景
let scene: Scene;
// 声明相机
let camera: any;
// 声明相机目标点
let cameraTarget: any = new THREE.Vector3(0, 0, 0);
// 声明相机在z轴的位置
let zAxisNumber: number;
// 盒模型的深度
const depth = 1400;
//  控制器
let controls: any;
//
let renderer: any;

// 初始化相机
const initCamera = () => {
  /**
   * 方式1：固定视野的距离，求满足完整的视野画面需要多大的视域角度
   * tan正切值（直角边除以临边）
   * const mathTan_value = width / 2 / depth
   * 视域角度
   * const fov_angle = (Math.atan(mathTan_value) * 180) / Math.PI
   * 创建透视相机
   * new THREE.PerspectiveCamera(fov_angle, width / height, 1, depth)
   * 场景是一个矩形容器（坐标(0, 0, 0)是矩形容器的中心），相机能看到的距离是depth，
   * camera.position.set(0, 0, depth / 2)
   */
  /**
   * 使用透视相机
   * 参数值分别是：
   * fov（field of view） — 摄像机视锥体垂直视野角度
   * aspect — 摄像机视锥体长宽比
   * near — 摄像机视锥体近端面
   * far — 摄像机视锥体远端面
   * 这里需要注意：透视相机是鱼眼效果，如果视域越大，边缘变形越大。
   * 为了避免边缘变形，可以将fov角度设置小一些，距离拉远一些
   */
  /**
   * 方式2:固定视域角度，求需要多少距离才能满足完整的视野画面
   * 15度等于(Math.PI / 12)
   */
  const fov = 15;
  const distance = width / 2 / Math.tan(Math.PI / 12);
  zAxisNumber = Math.floor(distance - depth / 2);
  camera = new THREE.PerspectiveCamera(fov, width / height, 1, 30000);
  /**
   * 这里给z轴的距离加了100，原因是做调整，使得视域更完整
   * 这么做并不代表前面计算错误了，根据前面的计算值并不能很完整的看到
   * 至于原因，我想大概就类似于0.1+0.2不等于0.3吧
   * 所以我自作主张地加了100的值做调整（但是不建议，因为当屏幕足够宽时候会看到边缘）
   */
  // camera.position.set(0, 0, zAxisNumber + 100)
  camera.position.set(0, 0, zAxisNumber);
  camera.lookAt(cameraTarget);
  // const helper = new THREE.CameraHelper(camera)
  // helper.update()
  // scene.add(helper)
  //* ------------------
  /* 透视相机 */
  /*  */
};
//* 初始化相机
const cameraFunc = () => {
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    10,
    20000,
  );
  camera.position.set(220, 3299, 2166);
  camera.lookAt(scene.position);
};
/*
 * render渲染canvas
 */
function render() {
  /* 视图控制器 */
  // 创建一个 WebGL 渲染器，Three.js 还提供 <canvas>, <svg>, CSS3D 渲染器。
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    preserveDrawingBuffer: true,
  });

  // 渲染，即摄像机拍下此刻的场景
  renderer.render(scene, camera);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x409eff, 1);
  renderer.setSize(innerWidth, innerHeight);
}
/*
 *光源
 */
const light = () => {
  /* 平行光 */
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);
  /* 环境光 */
  const light = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(light);
};
/*
 * 控制器
 */
const OrbitControlsInit = () => {
  controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  // controls.enableZoom = false;// 缩放
  // controls.maxAzimuthAngle = 0;
  // controls.minAzimuthAngle = 0;
  // controls.maxPolarAngle = 0; // Math.PI / 4;
};

/*
 *  窗口变化
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/*
 * 动画
 */
function animate() {
  /* animation */
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  /* 鼠标控制 */
  if (controls) {
    controls.update();
  }
}

/*
 * 初始化
 */
export function threeInitRender(login?: boolean): [Scene, Group] {
  // 视图容器
  canvas = document.querySelector('#canvas');
  width = canvas.clientWidth;
  height = canvas.clientHeight;

  /* 场景对象Scene */
  scene = new THREE.Scene();
  /* 纹理 */
  let textureLoader = new THREE.TextureLoader();
  textureLoader.load(a0, function (bg) {
    scene.background = bg;
  });
  /* threejs 组 */
  let group1 = new THREE.Group();
  let group2 = new THREE.Group();
  let group3 = new THREE.Group();
  group1.position.set(-40, 0, -105);
  group2.position.set(-40, 0, -25);
  group3.position.set(+10, 0, -85);
  /* all group */
  let AllGroup = new THREE.Group();
  AllGroup.add(group1, group2, group3);
  scene.add(AllGroup);
  // 场景判断
  if (login) {
    //  登录页
    initCamera(); // 相机
  } else {
    cameraFunc(); // 相机
    OrbitControlsInit(); // 控制器
    light(); // 光源
  }

  render(); // 渲染
  // 窗口变化
  window.addEventListener('resize', onWindowResize);
  // 开启动画
  animate();

  return [scene, group1];
}
