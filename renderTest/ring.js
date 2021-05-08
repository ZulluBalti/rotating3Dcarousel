import * as THREE from '/build/three.module.js';

import {OrbitControls} from '/build/OrbitControls.js';
import {OBJLoader} from '/build/OBJLoader.js';

var renderer5, scene5, camera5, ring;

var ww = 500,
	wh = 500;

function init(){

	renderer5 = new THREE.WebGLRenderer({canvas : document.getElementById('w'),
  alpha: true});
	renderer5.setSize(ww,wh);

	scene5 = new THREE.Scene();

	camera5 = new THREE.PerspectiveCamera(75,ww/wh, 0.01, 100000 );
	camera5.position.set(0,.03,.03);
	camera5.lookAt(new THREE.Vector3(0,0,0));
	scene5.add(camera5);

	//Add a light in the scene
	let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 0, 0, 7 );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene5.add( directionalLight );

	//Load the obj file
	loadOBJ();
}

var loadOBJ = function(){

	//Manager from ThreeJs to track a loader and its status
	var manager = new THREE.LoadingManager();
	//Loader for Obj from Three.js
	const loader = new OBJLoader(manager);

	//Launch loading of the obj file, addringInScene is the callback when it's ready
	loader.load( '/animations/shoe/scaled-ring.obj', addRingInScene);

};

var addRingInScene = function(object){
	ring = object;
	//Move the plant in the scene
	//Go through all children of the loaded object and search for a Mesh
	object.traverse( function ( child ) {
		//This allow us to check if the children is an instance of the Mesh constructor
		if(child instanceof THREE.Mesh){
			child.material.color = new THREE.Color(0X00FF00);
      //child.material.map = texture;
			//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
			child.geometry.computeVertexNormals();
		}
	});

	//Add the 3D object in the scene
	scene5.add(ring);
	//camera5.target.position.copy( object );
	render();
};


var render = function () {
	requestAnimationFrame(render);

	//Turn the plant
	ring.rotation.z += .01;
  ring.rotation.y += .01;
  ring.rotation.x += .01;

	renderer5.render(scene5, camera5);
};

init();
