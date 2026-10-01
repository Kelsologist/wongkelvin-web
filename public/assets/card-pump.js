let modelGroup = new THREE.Group();
scene.add(modelGroup);

const loader = new THREE.GLTFLoader();

// Change 'your_pump_file.glb' to your actual file name inside the GLB folder:
const candidatePaths = [
  './GLB/your_pump_file.glb',
  './assets/nk_pump_v01.glb',
  './assets/bosch_ve_pump.glb'
];

function tryLoadModel(pathIndex) {
  if (pathIndex >= candidatePaths.length) {
    console.error("Could not find GLB file in GLB/ or assets/ folders.");
    return;
  }

  loader.load(
    candidatePaths[pathIndex],
    (gltf) => {
      const rawScene = gltf.scene;
      modelGroup.add(rawScene);

      // Auto-center and fit model inside viewport without detaching sub-meshes
      const box = new THREE.Box3().setFromObject(modelGroup);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      const scale = 3.2 / maxDim;
      modelGroup.scale.setScalar(scale);

      modelGroup.position.x = -center.x * scale;
      modelGroup.position.y = -center.y * scale + (size.y * scale) / 2 - 1.6;
      modelGroup.position.z = -center.z * scale;
    },
    undefined,
    () => tryLoadModel(pathIndex + 1) // Tries next path if 404
  );
}

tryLoadModel(0);