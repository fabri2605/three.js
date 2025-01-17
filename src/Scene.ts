import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui'

/* CREAR ESCENA (Scene hereda de Object3D) */
const sceneA = new THREE.Scene()
sceneA.background = new THREE.Color(0x123456)

const sceneB = new THREE.Scene()
sceneB.background = new THREE.TextureLoader().load('https://sbcode.net/img/grid.png')

const sceneC = new THREE.Scene()
sceneC.background = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
//sceneC.backgroundBlurriness = 0.5

/* CREAR CAMARA (y perpectiva) */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
/* ACERCAMIENTO */
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cubeA = new THREE.Mesh(geometry, material)
const cubeC = new THREE.Mesh(geometry, material)
sceneA.add(cubeA)
sceneC.add(cubeC)
/* sceneC.add(cube) <- This will detatch the cube from sceneA */

const stats = new Stats();
document.body.appendChild(stats.dom)

let activeScene = sceneA
const setScene = {
  sceneA: () => {
    activeScene = sceneA
  },
  sceneB: () => {
    activeScene = sceneB
  },
  sceneC: () => {
    activeScene = sceneC
  },
}

const gui = new GUI();
gui.add(setScene, 'sceneA').name('Scene A')
gui.add(setScene, 'sceneB').name('Scene B')
gui.add(setScene, 'sceneC').name('Scene C')

const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cubeA.rotation, 'x', 0, Math.PI * 2);
cubeFolder.add(cubeA.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cubeA.rotation, 'z', 0, Math.PI * 2);

const camaraFolder = gui.addFolder('Camara');
camaraFolder.add(camera.position, 'z', 0, 200);

function animate() {
  requestAnimationFrame(animate)

  cubeA.rotation.x += 0.01
  cubeA.rotation.y += 0.01

  renderer.render(activeScene, camera)
  stats.update()
}

animate()
