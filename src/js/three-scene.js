// Configuração simples do cenário 3D com Three.js (Pizza girando no Hero)
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Luz ambiente e direcional
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xff5722, 1.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Criando uma representação geométrica estilizada de Pizza (Cilindro achatado)
const geometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xdc7633, 
    roughness: 0.4,
    metalness: 0.1
});
const pizzaMesh = new THREE.Mesh(geometry, material);
scene.add(pizzaMesh);

camera.position.z = 5;

// Animação de rotação contínua
function animate() {
    requestAnimationFrame(animate);
    pizzaMesh.rotation.y += 0.008;
    pizzaMesh.rotation.x = 0.3; // Inclinação leve para dar destaque
    renderer.render(scene, camera);
}

animate();

// Responsividade da tela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
