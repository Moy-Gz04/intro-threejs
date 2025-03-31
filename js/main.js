// Importa la librería Three.js completa
import * as THREE from 'three';

// 🎬 Crea la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a2a); // Fondo azul oscuro

// 🎥 Crea una cámara con perspectiva
const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// 🖼️ Renderer con antialiasing y resolución HiDPI
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 🌟 Luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

// 💡 Luz ambiental suave
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 🧱 Geometría del cubo
const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);

// 🔷 Material tipo vidrio (MeshPhysicalMaterial)
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x87ceeb,           // Azul cielo (sky blue)
  transmission: 1.0,         // Nivel de transparencia (1 = 100%)
  opacity: 1.0,              // Requiere `transparent` en true
  transparent: true,         
  roughness: 0.1,            // Liso
  metalness: 0.0,            // No metálico
  reflectivity: 0.8,         // Algo reflectivo
  clearcoat: 1.0,            // Brillo externo como el vidrio
  clearcoatRoughness: 0.05
});

// 🧊 Malla del cubo de vidrio
const cube = new THREE.Mesh(geometry, glassMaterial);
scene.add(cube);

// 🧠 Wireframe (bordes del cubo)
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
const wireframe = new THREE.LineSegments(edges, lineMaterial);
cube.add(wireframe);

// 🌟 Estrella 3D facetada
const starGeometry = new THREE.IcosahedronGeometry(0.3, 0); // Nivel 0: sin subdividir (más picos visibles)
const starMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,           // Azul intenso
  emissive: 0x0000ff,        // Luz propia azul
  emissiveIntensity: 1.2,
  metalness: 0.6,
  roughness: 0.3
});
const star = new THREE.Mesh(starGeometry, starMaterial);
cube.add(star); // La estrella vive dentro del cubo

// 🧠 Wireframe de la estrella
const starEdges = new THREE.EdgesGeometry(starGeometry);
const starLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); // Bordes en blanco
const starWireframe = new THREE.LineSegments(starEdges, starLineMaterial);
star.add(starWireframe); // Se lo pegamos como hijo a la estrella


// 🔁 Animación
renderer.setAnimationLoop(animate);

function animate() {
  const time = performance.now() * 0.001;

  // Rota el cubo
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.001;

  // Rota también la estrella para que tenga movimiento interno
  star.rotation.x += 0.001;
  star.rotation.y += 0.001;

  // Cámara orbita alrededor del cubo
  const radius = 5;
  camera.position.x = Math.sin(time) * radius;
  camera.position.z = Math.cos(time) * radius;
  camera.lookAt(cube.position);

  renderer.render(scene, camera);
}
