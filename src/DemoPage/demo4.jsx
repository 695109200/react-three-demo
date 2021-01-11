import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect, refs } from 'react'
import Orbitcontrols from 'three-orbitcontrols';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Demo4() {

    const [camera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000))    //摄像机
    camera.position.set(-48.29395512934191, 22.285677525066234, -0.23486243146612543);
    const [scene] = useState(new Three.Scene())   //场景
    const [render] = useState(new Three.WebGLRenderer({ antialias: true }))  //渲染器
    const [loader, setLoader] = useState( new GLTFLoader())                 //gltf加载器
    const [light, setLight] = useState( new Three.AmbientLight(0xffffff))   //全局光
    const [light2, setLight2] = useState(new Three.SpotLight(0xffffff))     //跟随光
    const [controls] = useState(new Orbitcontrols(camera, render.domElement))
    const [raycaster] = useState(new Three.Raycaster())
    const [mouse] = useState(new Three.Vector2())

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    function onMouseDown(event) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children,true);
        if (intersects.length > 0 && intersects[ 0 ].object.type !== 'GridHelper') {
            intersects[ 0 ].object.material.color.set( 0xff0000 );
            setTimeout(() => {
                camera.up.set(0, 1, 0)
                // intersects[ 0 ].object.material.color.set(color );
            }, 1200)
        }
    }

    function load(){
        loader.load("Bee.glb", (object) => {
            scene.add(object.scene);    //加载成功添加进场景
        });
    }
    //添加东西进去
    function add() {
        scene.add(new Three.GridHelper(70, 70),light2,light)
    }

    //每秒渲染
    function animation() {
        render.render(scene, camera);    //每次渲染器把场景和摄像机一起渲染
        requestAnimationFrame(animation);//采用系统时间间隔,保持最佳绘制效率进行渲染
    }

    useEffect(() => {
        render.setSize(window.innerWidth, window.innerHeight)
        render.domElement.removeAttribute("tabindex")   //清除点击canvas的黑边
        document.getElementById('canvas-frame').appendChild(render.domElement);
        render.setPixelRatio(window.devicePixelRatio);  //设置渲染器设备像素比。通常用于避免HiDPI设备上绘图模糊
        render.setClearColor(0xFFFFFF, 1.0);    //设置渲染器的背景颜色及其透明度
        add()
        animation()
        load()
    })
    return (
        <div id='canvas-frame'></div>
    );
}

export default Demo4;