import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect } from 'react'
import Orbitcontrols from 'three-orbitcontrols';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Demo6() {
    const [camera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000))    //摄像机
    camera.position.set(-48.29395512934191, 22.285677525066234, -0.23486243146612543);
    const [scene] = useState(new Three.Scene())   //场景
    const [render] = useState(new Three.WebGLRenderer({ antialias: true }))  //渲染器
    const [controls] = useState(new Orbitcontrols(camera, render.domElement))
    const [loader] = useState(new GLTFLoader())                 //gltf加载器
    const [light] = useState(new Three.AmbientLight(0xffffff))   //全局光
    const [light2] = useState(new Three.SpotLight(0xffffff))     //跟随光
    const [gridHelper] = useState(new Three.GridHelper(70, 70))      //地板辅助线
    var mixer;

    //添加东西进去
    function add() {
        scene.add(light, gridHelper, light2)
    }

    //主要加载函数
    function load() {
        loader.load("Bee.glb", (glt) => {
            scene.add(glt.scene);                        //加载成功添加进场景
            mixer = new Three.AnimationMixer(scene.children[3])   //把刚刚添加进场景的模型添加进动画的播放器
            glt.animations.forEach((clip) => {             //循环导入模型里自带的动画数组，轮流播放
                mixer.clipAction(clip).play();                    //clipAction: 获取播放器对应的动画
            });
        });
    }

    //每秒渲染
    function animation() {
        render.render(scene, camera);    //每次渲染器把场景和摄像机一起渲染
        if (mixer) mixer.update(0.03)          //刷新动画渲染速度
        requestAnimationFrame(animation);//采用系统时间间隔,保持最佳绘制效率进行渲染
    }
    
    //初始化
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

export default Demo6;