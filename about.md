---
layout: default
title: About
---
# About page

<main>
This page tells you a little bit about me.

    <h1>My World!</h1>
<div id='threejs'>
  <div class='cube'>
  <script>
    //vars
    var container = document.getElementById('cube');
    var width = container.clientWidth;
    var height = container.clientHeight;
   //scene
 var scene = new THREE.Scene();
 scene.background = new THREE.Color(0xffffff);
 var geometery = new THREE.BoxGeometry(1, 1, 1);
 var material = new THREE.MeshNormalMaterial();
 var mesh = new THREE.(geometry, material);
 scene.add(mesh);
  //<i class="fa fa-cameravar camera = new T" aria-hidden="true"></i>
  //camera
  var camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
  camera.position.z = 2;
  //renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width,height);
  container.appendChild(renderer.domElement);

  //animation
  function animate(){
    requestAnimatedFrame(animate);
    mesh.rotation.x =+= 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }  

  </script>
  </div>
</div>

</main>