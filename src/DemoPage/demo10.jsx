import css from "../index.css";
import * as Three from "three";
import React, { useState, useEffect } from "react";
import Orbitcontrols from "three-orbitcontrols";

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
    -48.29395512934191,
    22.285677525066234,
    -0.23486243146612543
  );
  const [scene] = useState(new Three.Scene()); //场景
  const [render] = useState(new Three.WebGLRenderer({ antialias: true })); //渲染器
  const [controls] = useState(new Orbitcontrols(camera, render.domElement));

  //初始化控制器
  function initContors() {
    controls.enableDamping = true;
    controls.dampingFactor = 0.02;
    controls.maxPolarAngle = 1.6;
    controls.rotateSpeed = 0.3;
  }
  //初始化天空盒
  function initSkyBox() {
    var materials = [],
      bMouseDown = false;
    var x = -1;
    var y = -1;
    var texturepx = new Three.TextureLoader().load("static/mode/car/xp.jpg");
    materials.push(new Three.MeshBasicMaterial({ map: texturepx }));
    var texturenx = new Three.TextureLoader().load("static/mode/car/xn.jpg");
    materials.push(new Three.MeshBasicMaterial({ map: texturenx }));
    var texturepy = new Three.TextureLoader().load("static/mode/car/yp.jpg");
    materials.push(new Three.MeshBasicMaterial({ map: texturepy }));
    var textureny = new Three.TextureLoader().load("static/mode/car/yn.jpg");
    materials.push(new Three.MeshBasicMaterial({ map: textureny }));
    var texturepz = new Three.TextureLoader().load("static/mode/car/zp.jpg");
    materials.push(new Three.MeshBasicMaterial({ map: texturepz }));
    var texturenz = new Three.TextureLoader().load("static/mode/car/zn.jpg");
    materials.push(new Three.MeshBasicMaterial({ map: texturenz }));
    var skyBox = new Three.Mesh(
      new Three.BoxBufferGeometry(300, 300, 300),
      materials
    );
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
    animation();
  });
  return <div id="canvas-frame"></div>;
}

export default Demo9;
