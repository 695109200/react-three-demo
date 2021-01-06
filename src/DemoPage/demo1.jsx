import css from '../index.css'
import * as Three from 'three';
import React, { useState, useEffect, refs } from 'react'
function Demo1() {

  const [camera, setCamera] = useState(new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
  const [scene, setScene] = useState(new Three.Scene())
  const [render, setRender] = useState(new Three.WebGLRenderer({ antialias: true }))

  const geometry = new Three.BoxGeometry(1, 1, 1);
  const material = new Three.MeshBasicMaterial({ color: 0xC71585 });
  const cube = new Three.Mesh(geometry, material);


  function init() {
    render.setPixelRatio(window.devicePixelRatio);
    render.setClearColor(0xFFFFFF, 1.0);
    add()
  }

  function add() {
    scene.add(cube);
    camera.position.z = 5;
  }

  function animation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    render.render(scene, camera);
    requestAnimationFrame(animation);
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

export default Demo1;