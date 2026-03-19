import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas');
if (!canvas) throw new Error('hero-canvas not found');

const hero = canvas.parentElement;
const W = () => hero.offsetWidth;
const H = () => hero.offsetHeight;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(W(), H());

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 100);
camera.position.z = 6;

/* ── Particles ── */
const COUNT = 180;
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(COUNT * 3);
const vel = [];

for (let i = 0; i < COUNT; i++) {
  pos[i * 3]     = (Math.random() - 0.5) * 14;
  pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
  vel.push(
    (Math.random() - 0.5) * 0.0025,
    (Math.random() - 0.5) * 0.0025,
    0
  );
}

geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

const mat = new THREE.PointsMaterial({
  color: 0x6C63FF,
  size: 0.07,
  transparent: true,
  opacity: 0.85,
  sizeAttenuation: true,
});

scene.add(new THREE.Points(geo, mat));

/* ── Connection lines ── */
const MAX_LINES = 350;
const linePos = new Float32Array(MAX_LINES * 6);
const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
lineGeo.setDrawRange(0, 0);

const lineMat = new THREE.LineBasicMaterial({
  color: 0x8B85FF,
  transparent: true,
  opacity: 0.18,
});
scene.add(new THREE.LineSegments(lineGeo, lineMat));

/* ── Mouse parallax ── */
let mx = 0, my = 0;
window.addEventListener('mousemove', e => {
  mx = (e.clientX / window.innerWidth  - 0.5);
  my = -(e.clientY / window.innerHeight - 0.5);
});

/* ── Animate ── */
let frame = 0;
const DIST_THRESH = 2.4;

function animate() {
  requestAnimationFrame(animate);
  frame++;

  // Move particles
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3]     += vel[i * 3];
    pos[i * 3 + 1] += vel[i * 3 + 1];
    if (Math.abs(pos[i * 3])     > 7) vel[i * 3]     *= -1;
    if (Math.abs(pos[i * 3 + 1]) > 4.5) vel[i * 3 + 1] *= -1;
  }
  geo.attributes.position.needsUpdate = true;

  // Update connections every 3 frames
  if (frame % 3 === 0) {
    let lc = 0;
    for (let i = 0; i < COUNT && lc < MAX_LINES; i++) {
      for (let j = i + 1; j < COUNT && lc < MAX_LINES; j++) {
        const dx = pos[i*3]   - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < DIST_THRESH) {
          linePos[lc*6]   = pos[i*3];   linePos[lc*6+1] = pos[i*3+1]; linePos[lc*6+2] = pos[i*3+2];
          linePos[lc*6+3] = pos[j*3];   linePos[lc*6+4] = pos[j*3+1]; linePos[lc*6+5] = pos[j*3+2];
          lc++;
        }
      }
    }
    lineGeo.setDrawRange(0, lc * 2);
    lineGeo.attributes.position.needsUpdate = true;
  }

  // Camera parallax
  camera.position.x += (mx * 1.8 - camera.position.x) * 0.03;
  camera.position.y += (my * 0.9 - camera.position.y) * 0.03;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}
animate();

/* ── Resize ── */
window.addEventListener('resize', () => {
  renderer.setSize(W(), H());
  camera.aspect = W() / H();
  camera.updateProjectionMatrix();
});
