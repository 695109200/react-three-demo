import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect, refs } from 'react'
function Demo1() {

  const [camera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))    //摄像机
  const [scene] = useState(new Three.Scene())   //场景
  const [render] = useState(new Three.WebGLRenderer({ antialias: true }))  //渲染器
  const geometry = new Three.BoxGeometry(1, 1, 1);  //定义geometry(一个几何体)   BoxGeometry(立方几何体)
  const material = new Three.MeshBasicMaterial({ color: 0xC71585 });  //定义material(材质)  MeshBasicMaterial(网格基本材质,不受光照影响，一个以简单的着色)
  const cube = new Three.Mesh(geometry, material);  //定义一个网格，这个网格由一个几何体和一个材质构成,也就是旋转着的正方体由这两个构成

  function add() {
    scene.add(cube);  //往场景添加正方体
    camera.position.z = 5;
  }

  function animation() {
    cube.rotation.x += 0.01;            //每次渲染正方体的x轴+0.1
    cube.rotation.y += 0.01;            //每次渲染正方体的y轴+0.1
    render.render(scene, camera);       //每次渲染器把场景和摄像机一起渲染
    requestAnimationFrame(animation);   //采用系统时间间隔,保持最佳绘制效率进行渲染
  }

  useEffect(() => {
    render.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('canvas-frame').appendChild(render.domElement);
    render.setPixelRatio(window.devicePixelRatio);  //设置渲染器设备像素比。通常用于避免HiDPI设备上绘图模糊
    render.setClearColor(0xFFFFFF, 1.0);          //设置渲染器的背景颜色及其透明度
    add()
    animation()
  })

  return (
    <div id='canvas-frame'></div>
  );
}

export default Demo1;