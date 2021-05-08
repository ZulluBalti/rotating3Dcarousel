import * as THREE from '/build/three.module.js';

import {OrbitControls} from '/build/OrbitControls.js';
import {OBJLoader} from '/build/OBJLoader.js';

var renderer, scene, camera, banana;

var ww = window.innerWidth,
	wh = window.innerHeight;

function init(){

	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('c')});
	renderer.setSize(ww,wh);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50,ww/wh, 0.1, 10000 );
	camera.position.set(0,0,5);
	scene.add(camera);

	//Add a light in the scene
	let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 0, 0, 350 );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene.add( directionalLight );

	//Load the obj file
	loadOBJ();
}

var loadOBJ = function(){

	//Manager from ThreeJs to track a loader and its status
	var manager = new THREE.LoadingManager();
	//Loader for Obj from Three.js
	const loader = new OBJLoader(manager);

	//Launch loading of the obj file, addBananaInScene is the callback when it's ready
	loader.load( '/animations/vmu/vmu.obj', addBananaInScene);

};

var addBananaInScene = function(object){
	banana = object;
	//Move the banana in the scene
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
	scene.add(banana);
	render();
};


var render = function () {
	requestAnimationFrame(render);

	//Turn the banana
	banana.rotation.z += .01;
  banana.rotation.y += .01;
  banana.rotation.x += .01;

	renderer.render(scene, camera);
};

init();
