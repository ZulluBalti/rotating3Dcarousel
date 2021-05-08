import * as THREE from '/build/three.module.js';

import {OrbitControls} from '/build/OrbitControls.js';
import {OBJLoader} from '/build/OBJLoader.js';

var renderer2, scene2, camera2, plate;

var ww = 500,
	wh = 500;

const textureLoader = new THREE.TextureLoader();
//var texture = textureLoader.load('/animations/shoe/eb_house_plant_01_c.tga');



function init(){

	renderer2 = new THREE.WebGLRenderer({canvas : document.getElementById('s'),
  alpha: true});
	renderer2.setSize(ww,wh);

	scene2 = new THREE.Scene();

	camera2 = new THREE.PerspectiveCamera(75,ww/wh, 0.1, 100000 );
	camera2.position.set(0,5,36);
	scene2.add(camera2);

	//Add a light in the scene
	let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 0, 0, 350 );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene2.add( directionalLight );

	//Load the obj file
	loadOBJ();
}

var loadOBJ = function(){

	//Manager from ThreeJs to track a loader and its status
	var manager = new THREE.LoadingManager();
	//Loader for Obj from Three.js
	const loader = new OBJLoader(manager);

	//Launch loading of the obj file, addplateInScene is the callback when it's ready
	loader.load( '/animations/shoe/grind_shoe.obj', addPlateInScene);

};

var addPlateInScene = function(object){
	plate = object;
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
	scene2.add(plate);
	render();
};


var render = function () {
	requestAnimationFrame(render);

	//Turn the plant
	plate.rotation.z += .01;
  plate.rotation.y += .01;
  plate.rotation.x += .01;

	renderer2.render(scene2, camera2);
};

init();
