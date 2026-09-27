// Configuração básica do Three.js para renderizar a pizza 3D no celular
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Luz ambiente e direcional para dar destaque aos ingredientes
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffaa33, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Provisório: Um cilindro estilizado simulando a base de uma pizza até carregar o modelo 3D real
const geometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xd47a3e, roughness: 0.4 });
const pizzaMesh = new THREE.Mesh(geometry, material);
scene.add(pizzaMesh);

camera.position.z = 5;

// Animação de rotação suave
function animate() {
    requestAnimationFrame(animate);
    pizzaMesh.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Ajustar tamanho se virar o celular
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
