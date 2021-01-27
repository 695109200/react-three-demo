import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect } from 'react'
import Orbitcontrols from 'three-orbitcontrols';
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

function Demo7() {
    const [camera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000))    //摄像机
    camera.position.set(1.0129047378979918, 28.92529159500555, -44.62414386051219);

    const [scene] = useState(new Three.Scene())   //场景
    const [render] = useState(new Three.WebGLRenderer({ antialias: true }))  //渲染器
    const [controls] = useState(new Orbitcontrols(camera, render.domElement))
    const [light] = useState(new Three.AmbientLight(0xffffff,0.34))   //全局光

    const [light2] = useState(new Three.PointLight(0xffffff))     
    const [plane] = useState(new Three.Mesh(new Three.PlaneBufferGeometry(70, 70), new Three.MeshStandardMaterial({ color: 0xeeeeee })))     //跟随光
    const [cube] = useState(new Three.Mesh(new Three.CubeGeometry(4, 4, 4), new Three.MeshLambertMaterial({ color: '#12B7F5' })))     //跟随光
    const [lightCube] = useState(new Three.Mesh(new Three.CubeGeometry(2, 2, 2), new Three.MeshBasicMaterial({ color: 0x00ff00,opacity:0.5,transparent:true})))     //跟随光
    const [transformControls] = useState(new TransformControls(camera, render.domElement))     

    var dragControls,dragArr = [];
    //添加东西进去
    function add() {
        controls.autoRotate = true
        transformControls.attach(lightCube);
        transformControls.setSize(0.4);

        dragArr.push(cube,lightCube,transformControls)

        scene.add(light2, plane, cube, transformControls, lightCube,light)

        dragControls = new DragControls(dragArr, camera, render.domElement)
        //鼠标松开后 释放镜头控制器
        dragControls.addEventListener('dragend', (event) => {
            controls.enabled = true;
        });
        //鼠标按下进行判断是否锁住镜头控制器
        dragControls.addEventListener('dragstart', function (event) {
                controls.enabled = false;
        });

    }

    //初始化地板
    function initPlan() {
        plane.rotation.x = -0.5 * Math.PI
        plane.receiveShadow = true;
        plane.name = 'plane'
    }
    //初始化立方体
    function initCube() {
        cube.castShadow = true;    // 立方体的阴影
        cube.position.x = -3;    // 立方体的坐标位置
        cube.position.y = 3;
        cube.position.z = 0;
        lightCube.position.set(13.681386802704136,4.571928018846691,2.9562836363154545)
    }
    //初始化光源
    function initLight() {
        light2.castShadow = true
        light2.position.set(10, 10, 10)
        light2.angle = Math.PI / 4
        light2.decay = 2
    }

    //每秒渲染
    function animation() {
        render.render(scene, camera);    //每次渲染器把场景和摄像机一起渲染
        requestAnimationFrame(animation);//采用系统时间间隔,保持最佳绘制效率进行渲染
        light2.position.copy(lightCube.position)
        controls.update()
    }

    //初始化
    useEffect(() => {
        render.setSize(window.innerWidth, window.innerHeight)
        render.domElement.removeAttribute("tabindex")   //清除点击canvas的黑边
        document.getElementById('canvas-frame').appendChild(render.domElement);
        render.setPixelRatio(window.devicePixelRatio);  //设置渲染器设备像素比。通常用于避免HiDPI设备上绘图模糊
        render.setClearColor(0x000000, 1.0);    //设置渲染器的背景颜色及其透明度
        render.shadowMap.enabled = true;
        initPlan()
        initCube()
        initLight()
        add()
        animation()
    })
    return (
        <div id='canvas-frame'></div>
    );
}

export default Demo7;