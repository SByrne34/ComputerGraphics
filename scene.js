// Create scene
const scene = new THREE.Scene();

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

// Define texture loader
const textureLoader = new THREE.TextureLoader();

// Create geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Define material
const material = new THREE.MeshBasicMaterial({map: textureLoader.load('Yellobrk.bmp')});

// Create mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Define light
const light = new THREE.DirectionalLight(0xdddddd, 1);
light.position.set(0, 0, 1);
scene.add(light);

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

//-------------------------------------------------------------------------
/**
 * A simple triangle composed of 3 vertices.
 * @param vertices Array An array of 3 vertices.
 * @constructor
  */
window.Triangle = function (vertices) {
  var self = this;
  self.vertices = vertices;
};

//-------------------------------------------------------------------------
/**
 * A simple model composed of an array of triangles.
 * @param name String The name of the model.
 * @constructor
 */
window.SimpleModel = function (name) {
  var self = this;
  self.name = name;
  self.triangles = [];
};

//-------------------------------------------------------------------------
/**
 * Create a Simple_model of 4 triangles that forms a pyramid.
 * @return SimpleModel
 */
window.CreatePyramid = function () {
  var vertices, triangle1, triangle2, triangle3, triangle4;

  // Vertex data
  vertices = [  [ 0.0, -0.25, -0.50],
                [ 0.0,  0.25,  0.00],
                [ 0.5, -0.25,  0.25],
                [-0.5, -0.25,  0.25] ];

  // Create 4 triangles
  triangle1 = new Triangle([vertices[2], vertices[1], vertices[3]]);
  triangle2 = new Triangle([vertices[3], vertices[1], vertices[0]]);
  triangle3 = new Triangle([vertices[0], vertices[1], vertices[2]]);
  triangle4 = new Triangle([vertices[0], vertices[2], vertices[3]]);

  // Create a model that is composed of 4 triangles
  var model = new SimpleModel("simple");
  model.triangles = [ triangle1, triangle2, triangle3, triangle4 ];

  return model;
};




render();
