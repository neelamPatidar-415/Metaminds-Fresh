import * as THREE from "https://cdn.skypack.dev/three@0.128.0";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
// 154 --> 128 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0.5,5,2); // X, Y, Z — adjust Z if needed
camera.lookAt(10, 50, 20);       // look slightly upward inside the room


// let mouseX = window.innerWidth / 2;
// let mouseY = window.innerHeight/2;

let object;
let controls;
// let objToRender = 'eye';

const loader = new GLTFLoader();
loader.load(
    "/models/low_poly_room.glb", 
    function(gltf){
        object = gltf.scene;
        object.scale.set(10, 7, 7);      // Try 0.5 if it's too large
        object.position.set(0, 0, 0);   // Center it
        scene.add(object);
    },
    function(xhr){
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error){
        console.error(error);
    }
);


const renderer = new THREE.WebGLRenderer({ alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

// camera.position.z = objToRender === 

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500,500,500)
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// controls = new OrbitControls(camera, renderer.domElement);
// controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.minDistance = 0.1;
// controls.maxDistance = 1000 ;
// controls.minPolarAngle = Math.PI / 2; // 90 degrees (looking straight ahead)
// // controls.maxPolarAngle = Math.PI / 2; // lock vertical movement
// controls.maxPolarAngle = Math.PI / 2.1; // Prevent going under the room


function animate(){
    requestAnimationFrame(animate);
    // if(object){
    //     object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    //     object.rotation.x = -1.2 + mouseX * 2.5/ window.innerHeight;
    // }
    renderer.render(scene,camera);
}

window.addEventListener("resize", function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

document.onmousemove = (e) =>{
    mouseX = e.clientX;
    // mouseY = e.clientY;
}

setInterval(() => {
  console.log(`Camera Position: x=${camera.position.x.toFixed(2)}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`);
}, 1000); // logs every 1 sec


animate();































// import { OrbitControls } from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js';

// const container = document.getElementById('three-container');

// // Scene setup
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xf0f0f0); // Light background

// // Camera
// const camera = new THREE.PerspectiveCamera(
//   45,
//   container.clientWidth / container.clientHeight,
//   0.1,
//   1000
// );
// camera.position.set(2, 2, 5);

// // Renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setSize(container.clientWidth, container.clientHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// container.appendChild(renderer.domElement);

// // Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight.position.set(10, 10, 10);
// scene.add(directionalLight);

// // Controls (optional if you want to allow rotation on drag)
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enablePan = false;
// controls.minDistance = 2;
// controls.maxDistance = 10;

// // Load Model (GLB or GLTF)
// const loader = new THREE.GLTFLoader();
// let mixer;

// loader.load('/models/study-room.glb', (gltf) => {
//   const model = gltf.scene;
//   model.scale.set(1, 1, 1); // Scale if needed
//   scene.add(model);

//   // Animation
//   if (gltf.animations && gltf.animations.length) {
//     mixer = new THREE.AnimationMixer(model);
//     gltf.animations.forEach((clip) => {
//       mixer.clipAction(clip).play();
//     });
//   }
// });

// // Mouse Move Interaction
// const mouse = { x: 0, y: 0 };

// document.addEventListener('mousemove', (event) => {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   // Rotate camera subtly
//   camera.position.x = 2 + mouse.x * 0.5;
//   camera.position.y = 2 + mouse.y * 0.3;
//   camera.lookAt(scene.position);
// });

// // Resize Handler
// window.addEventListener('resize', () => {
//   camera.aspect = container.clientWidth / container.clientHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(container.clientWidth, container.clientHeight);
// });

// // Animate Loop
// const clock = new THREE.Clock();

// function animate() {
//   requestAnimationFrame(animate);

//   const delta = clock.getDelta();
//   if (mixer) mixer.update(delta);

//   controls.update();
//   renderer.render(scene, camera);
// }

// animate();
