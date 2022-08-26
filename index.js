import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import '/textAnimation.js';
//Splash Text Animation
export var dataText = [titleText(), "Designer", "Editor", "Creator"];

function titleText() {
    return "Developer";
}

// start the text animation
StartTextAnimation(0);

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Loading
var loader = new GLTFLoader();
const objectDistance = -.09;
let laptop;
let dslr;
let play;
// Mesh
loader.load("static/laptop.glb", function (laptopGLTF) {
    laptop = laptopGLTF;
    scene.add(laptop.scene);
    laptop.scene.scale.set(.37, .37, .37);
    laptop.scene.position.x = .9;
    laptop.scene.position.y = objectDistance * 25;
})

loader.load("static/play.glb", function (playGLTF) {
    play = playGLTF;
    scene.add(play.scene);
    play.scene.scale.set(.23, .23, .23);
    play.scene.position.x = -1;
    play.scene.position.y = objectDistance * 42;
})

loader.load("static/DSLR.glb", function (dslrGLTF) {
    dslr = dslrGLTF;
    scene.add(dslr.scene);
    dslr.scene.scale.set(.20, .20, .20);
    dslr.scene.position.x = .9;
    dslr.scene.position.y = objectDistance * 62;
})

const allMeshes = [laptop, dslr, play]

//Particles
const objectsDistance = 4
const particlesCount = 100
const positions1 = new Float32Array(particlesCount * 3)
const positions2 = new Float32Array(particlesCount * 3)
const positions3 = new Float32Array(particlesCount * 3)
const texture1 = new THREE.TextureLoader().load('static/particle_textures/Particle1.png');
const texture2 = new THREE.TextureLoader().load('static/particle_textures/Particle2.png');
const texture3 = new THREE.TextureLoader().load('static/particle_textures/Particle3.png');

//Assign particle positions across webpage's xyz axis
for (let i = 0; i < particlesCount; i++) {
    positions1[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions1[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * allMeshes.length
    positions1[i * 3 + 2] = (Math.random() - 0.5) * 10
}

for (let i = 0; i < particlesCount; i++) {
    positions2[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions2[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * allMeshes.length
    positions2[i * 3 + 2] = (Math.random() - 0.5) * 10
}

for (let i = 0; i < particlesCount; i++) {
    positions3[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions3[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * allMeshes.length
    positions3[i * 3 + 2] = (Math.random() - 0.5) * 10
}

//Place particles
const particlesGeometry1 = new THREE.BufferGeometry()
particlesGeometry1.setAttribute('position', new BufferAttribute(positions1, 3))

const particlesGeometry2 = new THREE.BufferGeometry()
particlesGeometry2.setAttribute('position', new BufferAttribute(positions2, 3))

const particlesGeometry3 = new THREE.BufferGeometry()
particlesGeometry3.setAttribute('position', new BufferAttribute(positions3, 3))

// Material
const particlesMaterial1 = new THREE.PointsMaterial({
    sizeAttenuation: true,
    size: 0.12,
    alphaTest: .3,
    transparent: true,
    map: texture1
})

const particlesMaterial2 = new THREE.PointsMaterial({
    sizeAttenuation: true,
    size: 0.15,
    alphaTest: .3,
    transparent: true,
    map: texture2
})

const particlesMaterial3 = new THREE.PointsMaterial({
    sizeAttenuation: true,
    size: 0.13,
    alphaTest: .3,
    transparent: true,
    map: texture3
})

// Points
const particles1 = new THREE.Points(particlesGeometry1, particlesMaterial1)
scene.add(particles1)
const particles2 = new THREE.Points(particlesGeometry2, particlesMaterial2)
scene.add(particles2)
const particles3 = new THREE.Points(particlesGeometry3, particlesMaterial3)
scene.add(particles3)

// Lights

const pointLight = new THREE.PointLight(0x6EB6FF, 0.9)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.intensity = 1
scene.add(pointLight)

const backLight = new THREE.PointLight(0xFDFEF7, 0.9)
backLight.position.set(0, 0, -5)
backLight.intensity = 1
scene.add(backLight)

//Left Accent Light
const rectWidth = 10
const rectHeight = 10
const intensity = 1
const rectLight = new THREE.RectAreaLight(0xFFECA9, intensity, rectWidth, rectHeight)
rectLight.position.set(-5, -5, -1)
rectLight.lookAt(0, 0, 0)
scene.add(rectLight)

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if (newSection != currentSection) {
        currentSection = newSection
    }
})

var container = document.getElementsByClassName('container')[0];

container.addEventListener('scroll', () => {
    scrollY = container.scrollTop;

    var sections = document.getElementsByTagName('section');
    // If a section is in view, fade it in and fade out all other sections
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionTop = section.offsetTop;

        // Fade in sections as they come into view
        if (container.scrollTop + 400 > sectionTop && container.scrollTop < sectionTop) {
            section.classList.add('in-view');
        }
    }
})

//Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
cameraGroup.add(camera)

//Control Object
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animate
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
const smoothness = .5

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const clock = new THREE.Clock()
let previousTime = 0

//Handle lightbox
var clickableImages = document.getElementsByClassName('clickable-image');
var lightbox = document.getElementsByClassName('lightbox')[0];
//When a clickable image is clicked, open the lightbox and add the image to it's lightbox-image child
for (var i = 0; i < clickableImages.length; i++) {
    clickableImages[i].addEventListener('click', function () {
        var lightboxImage = document.getElementById('lightbox-image');
        lightboxImage.src = this.src;
        lightbox.style.opacity = 1;
        lightbox.style.visibility = 'visible';
    });
}
lightbox.addEventListener('click', function () {
    lightbox.style.visibility = 'hidden';
    lightbox.style.opacity = 0;
})


//Add clicks event listener to graphics, Video, coding, and contactid links
var graphicsLink = document.getElementById('graphics-link');
var videoLink = document.getElementById('video-link');
var codingLink = document.getElementById('coding-link');
var contactLink = document.getElementById('contact-link');
var graphicsSection = document.getElementById("graphics");
var videoSection = document.getElementById("video");
var codingSection = document.getElementById("coding");
var contactSection = document.getElementById("contactid");

graphicsLink.addEventListener('click', function () {
    graphicsSection.scrollIntoView({ behavior: "smooth" });
}
)
videoLink.addEventListener('click', function () {
    videoSection.scrollIntoView({ behavior: "smooth" });
}
)
codingLink.addEventListener('click', function () {
    codingSection.scrollIntoView({ behavior: "smooth" });
}
)
contactLink.addEventListener('click', function () {
    contactSection.scrollIntoView({ behavior: "smooth" });
}
)

const tick = () => {

    targetX = mouseX * .0005
    targetY = mouseY * .0005

    const parallaxX = targetX * smoothness
    const parallaxY = targetY * smoothness

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if (laptop) {
        laptop.scene.rotation.y += .3 * (targetX - laptop.scene.rotation.y) + 90
        laptop.scene.rotation.x += .35 * (targetY - laptop.scene.rotation.x)
    }

    if (dslr) {
        dslr.scene.rotation.y += .3 * (targetX - dslr.scene.rotation.y) - 90
        dslr.scene.rotation.x += .3 * (targetY - dslr.scene.rotation.x)
    }

    if (play) {
        play.scene.rotation.y += .36 * (targetX - play.scene.rotation.y) + 90
        play.scene.rotation.x += .31 * (targetY - play.scene.rotation.x)
    }

    //Camera movement smoothing
    camera.position.y = -scrollY / sizes.height * objectsDistance / 2.22

    cameraGroup.position.x += .2 * (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += .2 * (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    // Render
    renderer.render(scene, camera)
    raycaster.setFromCamera(pointer, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()