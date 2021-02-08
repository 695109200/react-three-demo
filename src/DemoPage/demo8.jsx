import css from "../index.css";
import * as Three from "three";
import React, { useState, useEffect } from "react";
import Orbitcontrols from "three-orbitcontrols";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

function Demo8() {
  const [camera] = useState(
    new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
  ); //摄像机
  camera.position.set(
    -61.92039539596215,
    37.43254204157204,
    -0.3011303294813202
  );
  const [scene] = useState(new Three.Scene()); //场景
  const [render] = useState(new Three.WebGLRenderer({ antialias: true })); //渲染器
  const [controls] = useState(new Orbitcontrols(camera, render.domElement));
  const [loader] = useState(new GLTFLoader()); //gltf加载器
  const [light] = useState(new Three.AmbientLight(0xffffff)); //全局光
  const [light2] = useState(new Three.SpotLight(0xffffff)); //跟随光
  const [transformControls] = useState(
    new TransformControls(camera, render.domElement)
  );
  const [plane] = useState(
    new Three.Mesh(
      new Three.PlaneBufferGeometry(70, 70),
      new Three.MeshStandardMaterial({ color: 0xffffff })
    )
  );
  const [cube] = useState(
    new Three.Mesh(
      new Three.CubeGeometry(4, 4, 4),
      new Three.MeshLambertMaterial({ color: "#12B7F5" })
    )
  ); //跟随光

  var dragControls;

  //添加东西进去
  function add() {
    scene.add(light, light2, plane, transformControls, cube);
  }
  //初始地板
  function initPlan() {
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;
  }
  //主要加载函数
  function load() {
    transformControls.attach(cube);

    //增加拖动控制器
    dragControls = new DragControls(scene.children, camera, render.domElement);

    //鼠标松开后 释放镜头控制器
    dragControls.addEventListener("dragend", (event) => {
      //   transformControls.visible = false;
      controls.enabled = true;
    });

    //鼠标按下进行判断是否锁住镜头控制器
    dragControls.addEventListener("dragstart", function (event) {
      if (event.object.type == "Mesh" || event.object.type == "GridHelper") {
        controls.enabled = false;
      }
    });
  }

  //每秒渲染
  function animation() {
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
    add();
    initPlan();
    animation();
    load();
  });
  return <div id="canvas-frame"></div>;
}

export default Demo8;
