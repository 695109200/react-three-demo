import css from "../index.css";
import * as Three from "three";
import React, { useState, useEffect } from "react";
import Orbitcontrols from "three-orbitcontrols";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Mesh物体 = (几何体(Geometry) + 材质(material))
// matrix(矩阵) materialLibraries(材质库) layers(层)

function Demo9() {
  const [camera] = useState(
    new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
  ); //摄像机
  camera.position.set(
    -9.870566837643196,
    3.162256206475837,
    -1.423413491523009
  );
  const [scene] = useState(new Three.Scene()); //场景
  const [render] = useState(new Three.WebGLRenderer({ antialias: true })); //渲染器
  const [controls] = useState(new Orbitcontrols(camera, render.domElement));
  const loader = new Three.ObjectLoader();

  function loadBodyObj(){
    loader.load("static/mode/car/body.json", (object) => {
      object.scale.set(0.001, 0.001, 0.001);
      object.children[0].material.color.set(0xc0c0c0);
      object.children[1].material.color.set(0xc0c0c0);
      object.children[2].material.color.set(0xc0c0c0);
      object.children[3].material.color.set(0xc0c0c0);
      object.children[4].material.color.set(0xc0c0c0);
      object.rotation.set(0, 1.55, 0);
      object.position.set(1.5, 0, 4);

      scene.add(object);
      console.log(scene)
    });
  }
  //加载轮胎JSON
  function loadTireObj() {
    loader.load("static/mode/car/wheel.json", (object) => {
     
      // object.children[1].children[0] RimsBlack   黑色钢圈
      // object.children[1].children[1] Rims Silver 银色钢圈
      // object.children[1].children[2] Tire        轮胎

      object.children[1].scale.set(0.0016,0.0016,0.0016);
      object.children[1].rotation.set(1.55, 0, 1.55);
      object.children[1].children[2].material.color.set(0x000000);
      object.children[1].children[1].material.color.set(0xc0c0c0);
      object.children[1].children[0].material.color.set(0x000000);


      let tire_left_1 = object.children[1].clone(),
          tire_left_2 = object.children[1].clone(),
          tire_right_1 = object.children[1].clone(),
          tire_right_2 = object.children[1].clone();


      tire_left_1.position.set(0.18, 1.65, -0.16);
      tire_left_2.position.set(3.55, 1.55, -0.1);
      tire_right_1.position.set(0, 1.65, 6.3);
      tire_right_2.position.set(3.55, 1.65, 6.3);

      scene.add(tire_left_1,tire_left_2,tire_right_1,tire_right_2);
    });
  }

  //初始化控制器
  function initContors() {
    controls.enableDamping = true;
    controls.dampingFactor = 0.02;
    controls.maxPolarAngle = 1.6;
    controls.rotateSpeed = 0.25;
  }

  //初始化天空盒
  function initSkyBox() {
    var skyBox = new Three.Mesh(new Three.BoxBufferGeometry(300, 300, 300), [
      new Three.MeshBasicMaterial({
        map: new Three.TextureLoader().load("static/mode/car/xp.jpg"),
        skinning: true,
      }),
      new Three.MeshBasicMaterial({
        map: new Three.TextureLoader().load("static/mode/car/xn.jpg"),
        skinning: true,
      }),
      new Three.MeshBasicMaterial({
        map: new Three.TextureLoader().load("static/mode/car/yp.jpg"),
        skinning: true,
      }),
      new Three.MeshBasicMaterial({
        map: new Three.TextureLoader().load("static/mode/car/yn.jpg"),
        skinning: true,
      }),
      new Three.MeshBasicMaterial({
        map: new Three.TextureLoader().load("static/mode/car/zp.jpg"),
        skinning: true,
      }),
      new Three.MeshBasicMaterial({
        map: new Three.TextureLoader().load("static/mode/car/zn.jpg"),
        skinning: true,
      }),
    ]);
    skyBox.geometry.scale(1, 1, -1);
    scene.add(skyBox);
  }

  //每秒渲染
  function animation() {
    controls.update();
    render.render(scene, camera); //每次渲染器把场景和摄像机一起渲染
    requestAnimationFrame(animation); //采用系统时间间隔,保持最佳绘制效率进行渲染
  }

  //初始化
  useEffect(() => {
    render.setSize(window.innerWidth, window.innerHeight);
    render.domElement.removeAttribute("tabindex"); //清除点击canvas的黑边
    document.getElementById("canvas-frame").appendChild(render.domElement);
    render.setPixelRatio(window.devicePixelRatio); //设置渲染器设备像素比。通常用于避免HiDPI设备上绘图模糊
    render.setClearColor(0xeeeeee, 1.0); //设置渲染器的背景颜色及其透明度
    initSkyBox();
    initContors();
    loadTireObj();
    loadBodyObj()
    animation();
  });
  return <div id="canvas-frame"></div>;
}

export default Demo9;
