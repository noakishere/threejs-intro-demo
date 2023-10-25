import * as THREE from "three";
import { GLTFLoader } from "three/addons/GLTFLoader.js";
import { OrbitControls } from "three/addons/OrbitControls.js";
import { FirstPersonControls } from "three/addons/FirstPersonControls.js";

const clock = new THREE.Clock();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const ambient = new THREE.AmbientLight(0x404040, 50);
scene.add(ambient);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 10;
// controls.lookSpeed = 0.1;

// Cube creation
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(1, 2, -3);
scene.add(cube);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-1, 0, 0));
points.push(new THREE.Vector3(0, 1, 0));
points.push(new THREE.Vector3(1, 0, 0));
points.push(new THREE.Vector3(-1, 0, 0));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);

line.position.set(0, -1, 0);

scene.add(line);

// Camera Distance
camera.position.z = 5;

const maxRight = 1;
const maxLeft = -1;
let dir = 0.01;

const loader = new GLTFLoader();

loader.load(
	"./3dassets/pumpkin/mr_pumpkin.glb",
	function (gltf) {
		gltf.scene.position.set(-15, -5, 0);
		// gltf.scene.position.set(0, -200, 0);
		gltf.scene.scale.set(0.05, 0.05, 0.05);
		scene.add(gltf.scene);
		renderer.render(scene, camera);
	},
	undefined,
	function (error) {
		console.error(error);
	}
);

// camera.position.z = 200;

function animate() {
	requestAnimationFrame(animate);
	// TO ANIMATE
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	// line.rotateX(0.01);
	// line.rotateZ(-0.01);
	// if (camera.position.x >= maxRight) dir = -0.01;
	// else if (camera.position.x <= maxLeft) dir = 0.01;

	// camera.position.x += dir;
	controls.update();
	// controls.update(clock.getDelta());
	renderer.render(scene, camera);
}
animate();
