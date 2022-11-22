import * as THREE from 'three';
import sky from '@/assets/bg/sky.png';
import earth_bg from '@/assets/bg/earth_bg.png';
import starflake1 from '@/assets/bg/starflake1.png';
import starflake2 from '@/assets/bg/starflake2.png';
import _ from 'lodash';

export default async (scene: THREE.Scene) => {
  // 视图容器
  let canvas: any = document.querySelector('#canvas');
  // 声明视口宽度
  let width = canvas.clientWidth;
  // 声明视口高度
  let height = canvas.clientHeight;
  // 盒模型的深度
  const depth = 1400;
  let Sphere_Group: any;
  // 声明点的参数
  let parameters: any;
  // 声明点材质
  let materials: any = []; // 星星
  // 声明粒子1
  let particles_first: any[];
  // 声明粒子2
  let particles_second: any[];
  // 声明粒子1的初始化位置
  let particles_init_position: number;

  // 声明点在z轴上移动的进度
  let zprogress: number;
  // 声明同上（第二个几何点）
  let zprogress_second: number;

  // 声明流动的云对象1（包含路径、云实例）
  let cloudParameter_first: any;
  // 声明流动的云对象2（包含路径、云实例）
  let cloudParameter_second: any;
  // 声明云流动的渲染函数1
  let renderCloudMove_first: any;
  // 声明云流动的渲染函数1
  let renderCloudMove_second: any;
  // 在场景中添加雾的效果，Fog参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
  scene.fog = new THREE.Fog(0x000000, 0, 10000);

  // 1.创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // 2.创建点光源，位于场景右下角
  const light_rightBottom = new THREE.PointLight(0x0655fd, 5, 0);
  light_rightBottom.position.set(0, 100, -200);
  // 3.把光源放入场景中
  scene.add(light_rightBottom);
  scene.add(ambientLight);

  // 初始化背景
  new THREE.TextureLoader().load(sky, (texture) => {
    const geometry = new THREE.BoxGeometry(
      window.innerWidth,
      window.innerHeight,
      1400,
    ); // 创建一个球形几何体 SphereGeometry
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    }); // 创建基础为网格基础材料
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });

  // 创建地球
  const earth = () => {
    // 加载纹理
    const texture = new THREE.TextureLoader().load(earth_bg);
    // 创建网格材质
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      blendDstAlpha: 1,
    });
    // 创建几何球体
    const sphereGeometry = new THREE.SphereGeometry(60, 74, 52);
    // 生成网格
    const sphere = new THREE.Mesh(sphereGeometry, material);

    // 加入场景
    // scene.add(sphere);
    // 为了单独操作球体的运动效果，我们把球体放到一个组中
    Sphere_Group = new THREE.Group();
    Sphere_Group.add(sphere);
    // 设置该组（球体）在空间坐标中的位置
    let x = -(width / 2 - 120);

    let v3 = new THREE.Vector3(x / 2, height / 2 - 120 - 180, -100);
    Sphere_Group.position.set(v3.x, v3.y, v3.z);

    // 加入场景
    scene.add(Sphere_Group);
  };

  earth();

  const distance = width / 2 / Math.tan(Math.PI / 12);
  let zAxisNumber = Math.floor(distance - depth / 2);
  // 初始化场景星星效果
  const initSceneStar = (initZposition: number): any => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const pointsGeometry: any[] = [];
    const textureLoader = new THREE.TextureLoader();
    const sprite1 = textureLoader.load(starflake1);
    const sprite2 = textureLoader.load(starflake2);
    parameters = [
      [[0.6, 100, 0.75], sprite1, 50],
      [[0, 0, 1], sprite2, 20],
    ];
    // 初始化500个节点
    for (let i = 0; i < 500; i++) {
      /**
       * const x: number = Math.random() * 2 * width - width
       * 等价
       * THREE.MathUtils.randFloatSpread(width)
       */
      const x: number = THREE.MathUtils.randFloatSpread(width);
      const y: number = _.random(0, height / 2);
      const z: number = _.random(-depth / 2, zAxisNumber);
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    );

    // 创建2种不同的材质的节点（500 * 2）
    for (let i = 0; i < parameters.length; i++) {
      const color = parameters[i][0];
      const sprite = parameters[i][1];
      const size = parameters[i][2];

      materials[i] = new THREE.PointsMaterial({
        size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        transparent: true,
      });
      materials[i].color.setHSL(color[0], color[1], color[2]);
      const particles = new THREE.Points(geometry, materials[i]);
      particles.rotation.x = Math.random() * 0.2 - 0.15;
      particles.rotation.z = Math.random() * 0.2 - 0.15;
      particles.rotation.y = Math.random() * 0.2 - 0.15;
      particles.position.setZ(initZposition);
      pointsGeometry.push(particles);
      scene.add(particles);
    }
    return pointsGeometry;
  };
  // 初始化流动路径
  const initTubeRoute = (
    route?: any,
    geometryWidth?: number,
    geometryHeigh?: number,
  ) => {
    const curve = new THREE.CatmullRomCurve3(route, false);
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      // color: '0x4488ff',
      opacity: 0,
      transparent: true,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);

    const clondGeometry = new THREE.PlaneGeometry(geometryWidth, geometryHeigh);
    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load(require('@/assets/bg/cloud.png'));
    const clondMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });
    const cloud = new THREE.Mesh(clondGeometry, clondMaterial);
    scene.add(cloud);
    return {
      cloud,
      curve,
    };
  };
  // 星星
  particles_init_position = -zAxisNumber - depth / 2;
  zprogress = particles_init_position;
  zprogress_second = particles_init_position * 2;
  particles_first = initSceneStar(particles_init_position);
  particles_second = initSceneStar(zprogress_second);
  // 云
  cloudParameter_first = initTubeRoute(
    [
      new THREE.Vector3(-width / 10, 0, -depth / 2),
      new THREE.Vector3(-width / 4, height / 8, 0),
      new THREE.Vector3(-width / 4, 0, zAxisNumber),
    ],
    400,
    200,
  );
  cloudParameter_second = initTubeRoute(
    [
      new THREE.Vector3(width / 8, height / 8, -depth / 2),
      new THREE.Vector3(width / 8, height / 8, zAxisNumber),
    ],
    200,
    100,
  );
  // 渲染星星的运动
  const renderStarMove = () => {
    const time = Date.now() * 0.00005;
    zprogress += 1;
    zprogress_second += 1;

    if (zprogress >= zAxisNumber + depth / 2) {
      zprogress = particles_init_position;
    } else {
      particles_first.forEach((item) => {
        item.position.setZ(zprogress);
      });
    }
    if (zprogress_second >= zAxisNumber + depth / 2) {
      zprogress_second = particles_init_position;
    } else {
      particles_second.forEach((item) => {
        item.position.setZ(zprogress_second);
      });
    }

    for (let i = 0; i < materials.length; i++) {
      const color = parameters[i][0];

      const h = ((360 * (color[0] + time)) % 360) / 360;
      materials[i].color.setHSL(color[0], color[1], parseFloat(h.toFixed(2)));
    }
  };

  // 初始化云的运动函数
  const initCloudMove = (
    cloudParameter: any,
    speed: number,
    scaleSpeed = 0.0006,
    maxScale = 1,
    startScale = 0,
  ) => {
    let cloudProgress = 0;
    return () => {
      if (startScale < maxScale) {
        // eslint-disable-next-line no-param-reassign
        startScale += scaleSpeed;
        cloudParameter.cloud.scale.setScalar(startScale);
      }
      if (cloudProgress > 1) {
        cloudProgress = 0;
        // eslint-disable-next-line no-param-reassign
        startScale = 0;
      } else {
        cloudProgress += speed;
        if (cloudParameter.curve) {
          const point = cloudParameter.curve.getPoint(cloudProgress);
          if (point && point.x) {
            cloudParameter.cloud.position.set(point.x, point.y, point.z);
          }
        }
      }
    };
  };

  renderCloudMove_first = initCloudMove(cloudParameter_first, 0.0002);
  renderCloudMove_second = initCloudMove(cloudParameter_second, 0.0008, 0.001);
  //  加入动画
  function animate() {
    requestAnimationFrame(animate);
    // 云
    renderCloudMove_first();
    renderCloudMove_second();
    // 使球能够自转，需要在loopAnimate中加上
    Sphere_Group.rotateY(0.003);
    renderStarMove();
  }
  animate();
};
