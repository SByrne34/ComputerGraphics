// Create scene
const scene = new THREE.Scene();

// Skybox filetype e.g. bmp, jpg, png
const skyboxFileType = "png";

// Skybox type; see skyboximages folder for types
const skyboxType = "grassy hills"

// Create camera
const camera = new THREE.PerspectiveCamera(
    75,     // fov - Camera frustum vertical field of view
    window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
    0.1,   // near - Camera frustum near plane
    1000); // far - Camera frustum far plane

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define loaders
const textureLoader = new THREE.TextureLoader();
const loader = new THREE.GLTFLoader();

// Load standard textures

const asphaltNormal = textureLoader.load("materials/Asphalt/asphalt_normal.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});
const asphaltColor = textureLoader.load("materials/Asphalt/asphalt_color.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});
const asphaltDisplacement = textureLoader.load("materials/Asphalt/asphalt_displacement.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});
const asphaltAo = textureLoader.load("materials/Asphalt/asphalt_ao.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});
const asphaltRoughness = textureLoader.load("materials/Asphalt/asphalt_roughness.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});
const asphaltMaterial = new THREE.MeshStandardMaterial({
    map: asphaltColor,
    normalMap: asphaltNormal,
    displacementMap: asphaltDisplacement,
    aoMap: asphaltAo,
    roughnessMap: asphaltRoughness
});
const pavementNormal = textureLoader.load("materials/Pavement/pavement_normal.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});
const pavementColor = textureLoader.load("materials/Pavement/pavement_color.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});
const pavementDisplacement = textureLoader.load("materials/Pavement/pavement_displacement.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});
const pavementAo = textureLoader.load("materials/Pavement/pavement_ao.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});
const pavementRoughness = textureLoader.load("materials/Pavement/pavement_roughness.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});
const pavementMaterial = new THREE.MeshStandardMaterial({
    map: pavementColor,
    normalMap: pavementNormal,
    displacementMap: pavementDisplacement,
    aoMap: pavementAo,
    roughnessMap: pavementRoughness
});
const bushNormal = textureLoader.load("materials/Bush/bush_normal.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});
const bushColor = textureLoader.load("materials/Bush/bush_color.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});
const bushDisplacement = textureLoader.load("materials/Bush/bush_displacement.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});
const bushAo = textureLoader.load("materials/Bush/bush_ao.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});
const bushRoughness = textureLoader.load("materials/Bush/bush_roughness.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColor,
    normalMap: bushNormal,
    displacementMap: bushDisplacement,
    displacementScale: 0,
    aoMap: bushAo,
    roughnessMap: bushRoughness
});


// Load models

const carModel = loader.load('/models/car.glb', function(gltf) {
    scene.add(gltf.scene);
    });


// Add skybox
scene.background = new THREE.CubeTextureLoader()
	.setPath( '/skyboximages/' + skyboxType + '/' )
	.load( [
		'posx.' + skyboxFileType,
		'negx.' + skyboxFileType,
		'posy.' + skyboxFileType,
		'negy.' + skyboxFileType,
		'posz.' + skyboxFileType,
		'negz.' + skyboxFileType
	] );


// Define light
const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );


// Add geometries
const roadGeometry = new THREE.PlaneBufferGeometry(20, 160);
roadGeometry.rotateX(-Math.PI * 0.5);
roadGeometry.translate(0, 0, -80)
const road = new THREE.Mesh( roadGeometry, asphaltMaterial );
const sideWalkGeometry = new THREE.PlaneBufferGeometry(10, 160);
sideWalkGeometry.rotateX(-Math.PI * 0.5);
sideWalkGeometry.translate(15, 0, -80);
const sideWalk = new THREE.Mesh(sideWalkGeometry, pavementMaterial);
const bushGeometry = new THREE.BoxBufferGeometry(10, 6, 60);
bushGeometry.translate(-15, 3, -30);
const bush = new THREE.Mesh( bushGeometry, bushMaterial);
const bushGeometry2 = new THREE.BoxBufferGeometry(60, 6, 10);
bushGeometry2.translate(-40, 3, -65);
const bush2 = new THREE.Mesh( bushGeometry2, bushMaterial);
scene.add(bush2);
scene.add(bush);
scene.add( road );
scene.add(sideWalk);
// Move camera from center
camera.position.x = 2;  // Move right from center of scene
camera.position.y = 1;  // Move up from center of scene
camera.position.z = 5;  // Move camera away from center of scene

// Import camera control and rotation library
const controls = new THREE.OrbitControls(camera, renderer.domElement); 
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.noKeys = true;

const render = function() {
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
}

render();