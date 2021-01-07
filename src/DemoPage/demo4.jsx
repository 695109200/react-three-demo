import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect, refs } from 'react'
import Orbitcontrols from 'three-orbitcontrols';

function Demo2() {

    const [camera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000))    //摄像机
    camera.position.set(-48.29395512934191, 22.285677525066234, -0.23486243146612543);
    const [scene] = useState(new Three.Scene())   //场景
    const [render] = useState(new Three.WebGLRenderer({ antialias: true }))  //渲染器

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
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0 && intersects[ 0 ].object.type !== 'GridHelper') {
            intersects[ 0 ].object.material.color.set( 0xff0000 );
            setTimeout(() => {
                camera.up.set(0, 1, 0)
                intersects[ 0 ].object.material.color.set( 0xFF00FF );
            }, 1200)
        }
    }

    //初始化
    function init() {
        render.setPixelRatio(window.devicePixelRatio);  //设置渲染器设备像素比。通常用于避免HiDPI设备上绘图模糊
        render.setClearColor(0xFFFFFF, 1.0);    //设置渲染器的背景颜色及其透明度
        add()
    }

    //添加东西进去
    function add() {
        scene.add(new Three.Mesh(new Three.BoxGeometry(1, 1, 1), new Three.MeshBasicMaterial({ color: 0xFF00FF })));    //场景添加立方体
        scene.add(new Three.Mesh(new Three.BoxGeometry(1, 1, 1), new Three.MeshBasicMaterial({ color: 0xFF00FF })));    //场景添加立方体
        scene.add(new Three.GridHelper(70, 70))

        scene.children[0].position.set(0,10,10)
        scene.children[1].position.set(0,10,-10)
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
        init()
        animation()
    })
    return (
        <div id='canvas-frame'></div>
    );
}

export default Demo2;