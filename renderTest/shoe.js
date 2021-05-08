import * as THREE from '/build/three.module.js';

import {OrbitControls} from '/build/OrbitControls.js';
import {OBJLoader} from '/build/OBJLoader.js';

var renderer3, scene3, camera3, shoe;

var ww = 500,
	wh = 500;

function init(){

	renderer3 = new THREE.WebGLRenderer({canvas : document.getElementById('q'),
  alpha: true});
	renderer3.setSize(ww,wh);

	scene3 = new THREE.Scene();

	camera3 = new THREE.PerspectiveCamera(75,ww/wh, 0.1, 100000 );
	camera3.position.set(0,5,40);
	scene3.add(camera3);

	//Add a light in the scene
	let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 0, 0, 350 );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene3.add( directionalLight );

	//Load the obj file
	loadOBJ();
}

var loadOBJ = function(){

	//Manager from ThreeJs to track a loader and its status
	var manager = new THREE.LoadingManager();
	//Loader for Obj from Three.js
	const loader = new OBJLoader(manager);

	//Launch loading of the obj file, addshoeInScene is the callback when it's ready
	loader.load( '/animations/shoe/grind_shoe.obj', addShoeInScene);

};

var addShoeInScene = function(object){
	shoe = object;
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
	scene3.add(shoe);
	render();
};


var render = function () {
	requestAnimationFrame(render);

	//Turn the plant
	shoe.rotation.z += .01;
  shoe.rotation.y += .01;
  shoe.rotation.x += .01;

	renderer3.render(scene3, camera3);
};

init();
