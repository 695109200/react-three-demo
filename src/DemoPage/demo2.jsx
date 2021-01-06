import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect, refs } from 'react'
import { CSS2DRenderer, CSS2DObject, } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import Orbitcontrols from 'three-orbitcontrols';

function Demo2() {

    const [camera, setCamera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    const [scene, setScene] = useState(new Three.Scene())
    const [render, setRender] = useState(new Three.WebGLRenderer({ antialias: true }))
    const [axisHelper, setAxisHelper] = useState(new Three.AxisHelper(30, 30))
    const [gridHelper, setGridHelper] = useState(new Three.GridHelper(70, 70))
    const [labelRenderer, setLabelRenderer] = useState(new CSS2DRenderer())

    const [controls, setControls] = useState(new Orbitcontrols(camera, labelRenderer.domElement))

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 0xC71585 });
    const cube = new Three.Mesh(geometry, material);


    function init() {
        render.setPixelRatio(window.devicePixelRatio);
        render.setClearColor(0xFFFFFF, 1.0);
        scene.add(axisHelper)
        scene.add(gridHelper)

        camera.position.set(10, 10, 0)
        
        add()
    }

    function add() {
        scene.add(cube);
        cube.position.set(0, 2, 0)
        camera.position.z = 5;
    }

    function animation() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        render.render(scene, camera);
        labelRenderer.render(scene, camera);

        requestAnimationFrame(animation);
    }

    useEffect(() => {
        render.setSize(window.innerWidth, window.innerHeight)
        document.getElementById('canvas-frame').appendChild(render.domElement);
        labelRenderer.setSize(window.innerWidth, window.innerHeight)
        labelRenderer.domElement.style.position = "absolute";
        labelRenderer.domElement.style.top = "0px";
        document.body.appendChild(labelRenderer.domElement);
        init()
        animation()
    })
    return (
        <div id='canvas-frame'></div>
    );
}

export default Demo2;