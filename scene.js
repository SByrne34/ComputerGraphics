/**
 * 1 - setting up the environment
 * 
 */

// Create scene
const scene = new THREE.Scene();

// Skybox filetype e.g. bmp, jpg, png
const skyboxFileType = "bmp";

// Skybox type; see skyboximages folder for types
const skyboxType = "blue sky"

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

/**
 * 2 - Loading textures and models
 * 
 */
// Load standard textures all textures get repeat set for the ratio of their respective geometries.

// Asphalt material
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

// Pavement material
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

// Bush material
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
// Car model
const carModel = new THREE.Object3D();
loader.load('/models/car.glb', function(gltf) {
    carModel.add(gltf.scene);
    scene.add(carModel);
    });
// Bicycle model
loader.load('/models/bicycle.glb', function(gltf) {
    gltf.scene.position.x = 17;
    gltf.scene.position.y = 4;
    gltf.scene.position.z = -40;
    gltf.scene.rotateY(Math.PI * 0.5);
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

/**
 * 3 - Adding all parts to the scene
 * 
 */
// Add geometries

// Road geometry, the asphalt pathing
const roadGeometry = new THREE.PlaneBufferGeometry(20, 160);
roadGeometry.rotateX(-Math.PI * 0.5);
roadGeometry.translate(0, 0, -80);
const road = new THREE.Mesh( roadGeometry, asphaltMaterial );
scene.add(road);

// Sidewalk geometry, the paved sidewalk
const sideWalkGeometry = new THREE.PlaneBufferGeometry(10, 160);
sideWalkGeometry.rotateX(-Math.PI * 0.5);
sideWalkGeometry.translate(15, 0, -80);
const sideWalk = new THREE.Mesh(sideWalkGeometry, pavementMaterial);
scene.add(sideWalk);

// Bush geometry, the bush parallel to the road
const bushGeometry = new THREE.BoxBufferGeometry(10, 6, 60);
bushGeometry.translate(-15, 3, -30);
const bush = new THREE.Mesh( bushGeometry, bushMaterial);
scene.add(bush);

// Bush geometry two, the bush perpendicular to the road
const bushGeometry2 = new THREE.BoxBufferGeometry(60, 6, 10);
bushGeometry2.translate(-40, 3, -65);
const bush2 = new THREE.Mesh( bushGeometry2, bushMaterial);
scene.add(bush2);

/**
 *  4 - Camera setup and render function
 * 
 */
// Move camera from center
camera.position.x = 2;  // Move right from center of scene
camera.position.y = 1;  // Move up from center of scene
camera.position.z = 5;  // Move camera away from center of scene

// Import camera control and rotation library
const controls = new THREE.OrbitControls(camera, renderer.domElement); 
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.noKeys = true;

// Clock for controlled animations
const clock = new THREE.Clock();
const render = function() {
    requestAnimationFrame(render);
    if (typeof carModel !== 'undefined') {
        const delta = clock.getDelta();
        carModel.translateOnAxis(carModel.worldToLocal(new THREE.Vector3(0,0,-160)),0.1 * delta);
    }
    
    controls.update();
    renderer.render(scene, camera);
}

render();