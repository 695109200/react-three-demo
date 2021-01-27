import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect } from 'react'
import Orbitcontrols from 'three-orbitcontrols';

function Demo9() {
    const [camera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000))    //摄像机
    camera.position.set(-48.29395512934191, 22.285677525066234, -0.23486243146612543);
    const [scene] = useState(new Three.Scene())   //场景
    const [render] = useState(new Three.WebGLRenderer({ antialias: true }))  //渲染器
    const [controls] = useState(new Orbitcontrols(camera, render.domElement))
    const [light] = useState(new Three.AmbientLight(0xffffff))   //全局光
    const [plane] = useState(new Three.Mesh(new Three.PlaneBufferGeometry(70, 70), new Three.MeshStandardMaterial({ color: 0xffffff })))     //跟随光

    const [firstCube] = useState(new Three.Mesh(new Three.BoxBufferGeometry(0.2, 0.2, 0.2), new Three.MeshBasicMaterial({ color: 0x000000 })))     //跟随光
    const [scendCube] = useState(new Three.Mesh(new Three.BoxBufferGeometry(0.2, 0.2, 0.2), new Three.MeshBasicMaterial({ color: 0x000000 })))     //跟随光


    //添加东西进去
    function add() {
        firstCube.visible = false
        scendCube.visible = false
        scene.add(light, plane, firstCube, scendCube)
    }

    document.addEventListener('click', function (e) {
        onMouseClick(e);
    });

    //每秒渲染
    function animation() {
        render.render(scene, camera);    //每次渲染器把场景和摄像机一起渲染
        requestAnimationFrame(animation);//采用系统时间间隔,保持最佳绘制效率进行渲染
    }

    //初始光源
    function initLight(){
        light.position.set(10, 10, 10)
    }
    //初始地板
    function initPlan(){
        plane.rotation.x = -0.5 * Math.PI
        plane.receiveShadow = true;
    }

    //添加直线
    function addLine(){
        scene.add(new Three.Line(new Three.BufferGeometry().setFromPoints([scendCube.position, firstCube.position]), new Three.LineBasicMaterial({
            color: 0x000000
        })))
        // var center = new Three.Vector3();
        // console.log(scene.children[4].getCenter(center))
        // console.log(firstCube.position.distanceTo(scendCube.position))
    }

    //点击事件
    function onMouseClick(event) {
        event.preventDefault();
        var vector = new Three.Vector3(); //三维坐标对象
        vector.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5
        );
        vector.unproject(camera);
        var raycaster = new Three.Raycaster(
            camera.position,
            vector.sub(camera.position).normalize()
        );
        var intersects = raycaster.intersectObjects(
            scene.children,
            true
        );

        if (intersects.length > 0) {
            var selected = intersects[0]; //取第一个物体

            if (scendCube.visible == true) {    //如果第二个点是显示状态再次点击则隐藏全部
                scene.children.pop()
                scendCube.visible = false
                firstCube.visible = false
                return
            }

            if (firstCube.visible == true) {    //判断当前应该显示哪个点位
                scendCube.visible = true        
                scendCube.position.copy(selected.point)
                addLine()                       //第二个显示出来了则可以进行连线
                setTimeout(()=>{
                    alert('长度:'+firstCube.position.distanceTo(scendCube.position))
                },1200)

            } else {
                firstCube.visible = true
                firstCube.position.copy(selected.point)
            }
        }

    }

    //初始化
    useEffect(() => {
        render.setSize(window.innerWidth, window.innerHeight)
        render.domElement.removeAttribute("tabindex")   //清除点击canvas的黑边
        document.getElementById('canvas-frame').appendChild(render.domElement);
        render.setPixelRatio(window.devicePixelRatio);  //设置渲染器设备像素比。通常用于避免HiDPI设备上绘图模糊
        render.setClearColor(0xeeeeee, 1.0);    //设置渲染器的背景颜色及其透明度
        add()
        addLine()
        initLight()
        initPlan()
        animation()
    })
    return (
        <div id='canvas-frame'></div>
    );
}

export default Demo9;