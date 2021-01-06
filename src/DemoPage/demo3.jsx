import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect, refs } from 'react'
import Orbitcontrols from 'three-orbitcontrols';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Demo3() {
    const [camera, setCamera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))    //摄像机
    const [scene, setScene] = useState(new Three.Scene())   //场景
    const [render, setRender] = useState(new Three.WebGLRenderer({ antialias: true }))  //渲染器
    const [axisHelper, setAxisHelper] = useState(new Three.AxisHelper(30, 30))      //三维坐标系
    const [gridHelper, setGridHelper] = useState(new Three.GridHelper(70, 70))      //地板辅助线
    const [controls, setControls] = useState(new Orbitcontrols(camera, render.domElement))
    const [loader, setLoader] = useState( new GLTFLoader())                 //gltf加载器
    const [light, setLight] = useState( new Three.AmbientLight(0xffffff))   //全局光
    const [light2, setLight2] = useState(new Three.SpotLight(0xffffff))     //跟随光
    
    //初始化
    function init() {
        render.setPixelRatio(window.devicePixelRatio);  //设置渲染器设备像素比。通常用于避免HiDPI设备上绘图模糊
        render.setClearColor(0xFFFFFF, 1.0);    //设置渲染器的背景颜色及其透明度
        scene.add(axisHelper)   //场景添加三维坐标系
        scene.add(gridHelper)   //场景添加地板
        scene.add(light)
        scene.add(light2)
        camera.position.set(0, 30, 0)  //设置镜头位置
        load()
    }

    function load(){
        //主要加载函数
        loader.load("1.glb", (object) => {
            scene.add(object.scene);    //加载成功添加进场景
        });
    }

    function animation() {
        render.render(scene, camera);    //每次渲染器把场景和摄像机一起渲染
        requestAnimationFrame(animation);//采用系统时间间隔,保持最佳绘制效率进行渲染
    }

    useEffect(() => {
        render.setSize(window.innerWidth, window.innerHeight)
        document.getElementById('canvas-frame').appendChild(render.domElement);
        init()
        animation()
    })
    return (
        <div id='canvas-frame'></div>
    );
}

export default Demo3;