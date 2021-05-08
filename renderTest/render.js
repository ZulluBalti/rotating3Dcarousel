import * as THREE from '/build/three.module.js';

import {OrbitControls} from '/build/OrbitControls.js';
import {OBJLoader} from '/build/OBJLoader.js';



function init(){

	const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;
	camera.position.y = 3;
	camera.position.x = 3;
	camera.lookAt(new THREE.Vector3(0,0,0));

  const scene = new THREE.Scene();

	{
	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);
	}


  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); // greenish blue

  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);


	loadOBJ();

}
init();

function loadOBJ() {
	//Manager from ThreeJs to track a loader and its status
	var manager = new THREE.LoadingManager();
	//Loader for Obj from Three.js
	var loader = new THREE.OBJLoader( manager );
	objLoader.load('/animations/vmu/vmu.obj', addVMU);

}

var addVMU = function(object) {
	vmu = object;
	root.rotateX(3.14/2);

	//Go through all children of the loaded object and search for a Mesh
	object.traverse( function ( child ) {
		//This allow us to check if the children is an instance of the Mesh constructor
		if(child instanceof THREE.Mesh){
			child.material.color = new THREE.Color(0X00FF00);
			//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
			child.geometry.computeVertexNormals();
		}
	});
	//Add the 3D object in the scene
	scene.add(vmu);
	render();
}

function render(time) {
	requestAnimationFrame(render);

	//Turn the vmu
	vmu.rotation.z += .01;

	renderer.render(scene, camera);
}
