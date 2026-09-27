<script type="module">
import * as THREE from "three";

/* =========================================================
   PRIME PIZZA — SISTEMA 3D
   Pizza artesanal interativa
========================================================= */

const canvas = document.getElementById("pizza3d");
const hero = document.querySelector(".hero");

if (!canvas) {
    console.error("Canvas #pizza3d não encontrado.");
} else {

    /* =====================================================
       CENA
    ===================================================== */

    const scene = new THREE.Scene();

    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
        45,
        1,
        0.1,
        100
    );

    camera.position.set(0, 5.2, 10);

    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    /* =====================================================
       LUZES
    ===================================================== */

    const luzAmbiente = new THREE.HemisphereLight(
        0xfff3df,
        0x160b05,
        2.2
    );

    scene.add(luzAmbiente);


    const luzPrincipal = new THREE.DirectionalLight(
        0xffe4bd,
        4
    );

    luzPrincipal.position.set(
        -4,
        8,
        5
    );

    luzPrincipal.castShadow = true;

    luzPrincipal.shadow.mapSize.width = 2048;
    luzPrincipal.shadow.mapSize.height = 2048;

    scene.add(luzPrincipal);


    const luzFrontal = new THREE.PointLight(
        0xff8a3d,
        2.5,
        15
    );

    luzFrontal.position.set(
        0,
        3,
        4
    );

    scene.add(luzFrontal);


    const luzCalor = new THREE.PointLight(
        0xff4b18,
        2,
        10
    );

    luzCalor.position.set(
        0,
        0.5,
        0
    );

    scene.add(luzCalor);


    /* =====================================================
       GRUPO PRINCIPAL DA PIZZA
    ===================================================== */

    const pizzaGroup = new THREE.Group();

    pizzaGroup.position.y = -0.45;

    scene.add(pizzaGroup);


    /* =====================================================
       SOMBRA DA PIZZA
    ===================================================== */

    const sombraGeometry = new THREE.CircleGeometry(
        4.2,
        64
    );

    const sombraMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.38
    });

    const sombra = new THREE.Mesh(
        sombraGeometry,
        sombraMaterial
    );

    sombra.rotation.x = -Math.PI / 2;

    sombra.position.y = -0.35;

    pizzaGroup.add(sombra);


    /* =====================================================
       MASSA
    ===================================================== */

    const massaGeometry = new THREE.CylinderGeometry(
        3.2,
        3.25,
        0.38,
        96
    );

    const massaMaterial = new THREE.MeshStandardMaterial({
        color: 0xf3dfbd,
        roughness: 0.82,
        metalness: 0
    });

    const massa = new THREE.Mesh(
        massaGeometry,
        massaMaterial
    );

    massa.position.y = 0;

    massa.castShadow = true;
    massa.receiveShadow = true;

    pizzaGroup.add(massa);


    /* =====================================================
       BORDA
    ===================================================== */

    const bordaGeometry = new THREE.TorusGeometry(
        2.92,
        0.29,
        28,
        96
    );

    const bordaMaterial = new THREE.MeshStandardMaterial({
        color: 0xd99a52,
        roughness: 0.7
    });

    const borda = new THREE.Mesh(
        bordaGeometry,
        bordaMaterial
    );

    borda.rotation.x = Math.PI / 2;

    borda.position.y = 0.22;

    borda.castShadow = true;

    pizzaGroup.add(borda);


    /* =====================================================
       MOLHO DE TOMATE
    ===================================================== */

    const molhoGeometry = new THREE.CylinderGeometry(
        2.86,
        2.86,
        0.08,
        96
    );

    const molhoMaterial = new THREE.MeshStandardMaterial({
        color: 0xb51f16,
        roughness: 0.6
    });

    const molho = new THREE.Mesh(
        molhoGeometry,
        molhoMaterial
    );

    molho.position.y = 0.22;

    molho.castShadow = true;

    pizzaGroup.add(molho);


    /* =====================================================
       QUEIJO BASE
    ===================================================== */

    const queijoGeometry = new THREE.CylinderGeometry(
        2.76,
        2.76,
        0.075,
        96
    );

    const queijoMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffdf72,
        roughness: 0.48,
        metalness: 0,
        clearcoat: 0.18
    });

    const queijo = new THREE.Mesh(
        queijoGeometry,
        queijoMaterial
    );

    queijo.position.y = 0.29;

    queijo.castShadow = true;

    pizzaGroup.add(queijo);


    /* =====================================================
       FUNÇÃO PARA POSIÇÃO SOBRE A PIZZA
    ===================================================== */

    function posicaoNaPizza(
        raio = 2.25,
        altura = 0.42
    ) {

        const angulo =
            Math.random() * Math.PI * 2;

        const r =
            Math.sqrt(Math.random()) * raio;

        return new THREE.Vector3(
            Math.cos(angulo) * r,
            altura,
            Math.sin(angulo) * r
        );
    }


    /* =====================================================
       INGREDIENTES
    ===================================================== */

    const ingredientes = [];


    /* -----------------------------------------------------
       PEPPERONI / CALABRESA
    ----------------------------------------------------- */

    function criarPepperoni() {

        const geometry =
            new THREE.CylinderGeometry(
                0.31,
                0.34,
                0.11,
                32
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0xc52c1c,
                roughness: 0.58
            });

        const obj =
            new THREE.Mesh(
                geometry,
                material
            );

        obj.rotation.x = Math.PI / 2;

        obj.castShadow = true;

        return obj;
    }


    /* -----------------------------------------------------
       TOMATE
    ----------------------------------------------------- */

    function criarTomate() {

        const geometry =
            new THREE.CylinderGeometry(
                0.28,
                0.28,
                0.07,
                32
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0xff4433,
                roughness: 0.48
            });

        const obj =
            new THREE.Mesh(
                geometry,
                material
            );

        obj.rotation.x = Math.PI / 2;

        obj.castShadow = true;

        return obj;
    }


    /* -----------------------------------------------------
       CEBOLA
    ----------------------------------------------------- */

    function criarCebola() {

        const geometry =
            new THREE.TorusGeometry(
                0.18,
                0.045,
                12,
                32
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0xc99acb,
                roughness: 0.4
            });

        const obj =
            new THREE.Mesh(
                geometry,
                material
            );

        obj.rotation.x = Math.PI / 2;

        obj.castShadow = true;

        return obj;
    }


    /* -----------------------------------------------------
       MANJERICÃO
    ----------------------------------------------------- */

    function criarManjericao() {

        const geometry =
            new THREE.SphereGeometry(
                0.23,
                16,
                12
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0x23852d,
                roughness: 0.7
            });

        const obj =
            new THREE.Mesh(
                geometry,
                material
            );

        obj.scale.set(
            1.6,
            0.18,
            0.75
        );

        obj.castShadow = true;

        return obj;
    }


    /* -----------------------------------------------------
       PEQUENOS PEDAÇOS DE QUEIJO
    ----------------------------------------------------- */

    function criarQueijo() {

        const geometry =
            new THREE.SphereGeometry(
                0.13,
                12,
                8
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0xffe891,
                roughness: 0.42
            });

        const obj =
            new THREE.Mesh(
                geometry,
                material
            );

        obj.scale.set(
            1.2,
            0.4,
            0.8
        );

        obj.castShadow = true;

        return obj;
    }


    /* =====================================================
       CRIAÇÃO DOS INGREDIENTES
    ===================================================== */

    function adicionarIngrediente(
        objeto,
        alturaInicial
    ) {

        const destino =
            posicaoNaPizza(
                2.25,
                0.48
            );

        const angulo =
            Math.random() * Math.PI * 2;

        const distancia =
            2.5 + Math.random() * 2.2;

        const inicio =
            new THREE.Vector3(
                Math.cos(angulo) * distancia,
                alturaInicial,
                Math.sin(angulo) * distancia
            );

        objeto.position.copy(inicio);

        objeto.userData.destino =
            destino.clone();

        objeto.userData.inicio =
            inicio.clone();

        objeto.userData.montando = false;

        objeto.userData.delay =
            Math.random() * 1500;

        objeto.userData.rotacao =
            (Math.random() - 0.5) * 0.05;

        objeto.userData.velocidade =
            0.055 + Math.random() * 0.025;

        pizzaGroup.add(objeto);

        ingredientes.push(objeto);
    }


    /* =====================================================
       GERAR INGREDIENTES
    ===================================================== */

    for (let i = 0; i < 12; i++) {

        adicionarIngrediente(
            criarPepperoni(),
            