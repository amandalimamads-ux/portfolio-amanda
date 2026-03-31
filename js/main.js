/* =========================
CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor")

document.addEventListener("mousemove", e => {

cursor.style.left = e.clientX + "px"
cursor.style.top = e.clientY + "px"

})

document.querySelectorAll("a").forEach(el => {

el.addEventListener("mouseenter", () => {
cursor.classList.add("active")
})

el.addEventListener("mouseleave", () => {
cursor.classList.remove("active")
})

})


/* =========================
AMBIENT LIGHT FOLLOW
========================= */

document.addEventListener("mousemove",(e)=>{

document.body.style.setProperty("--x",e.clientX+"px")
document.body.style.setProperty("--y",e.clientY+"px")

})


/* =========================
TECH CARD LIGHT EFFECT
========================= */

document.querySelectorAll(".tech-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect()

card.style.setProperty("--mouseX",(e.clientX-rect.left)+"px")
card.style.setProperty("--mouseY",(e.clientY-rect.top)+"px")

})

})


/* =========================
GSAP HERO ANIMATION
========================= */

gsap.from(".hero-name",{
y:80,
opacity:0,
duration:1
})

gsap.from(".hero-role",{
y:60,
opacity:0,
delay:.2
})

gsap.from(".hero-text",{
y:40,
opacity:0,
delay:.4
})


/* =========================
SCROLL SECTION ANIMATION
========================= */

gsap.utils.toArray("section").forEach(section=>{

gsap.from(section,{

scrollTrigger:{
trigger:section,
start:"top 85%"
},

y:80,
opacity:0,
duration:1

})

})


/* =========================
HERO PARALLAX
========================= */

const hero = document.querySelector(".hero")

hero.addEventListener("mousemove",(e)=>{

const x = (window.innerWidth/2 - e.pageX)/30
const y = (window.innerHeight/2 - e.pageY)/30

document.querySelector(".hero-avatar").style.transform =
`translate(${x}px,${y}px)`

})


/* =========================
THREE JS NEURAL NETWORK
========================= */

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({
alpha:true
})

renderer.setSize(window.innerWidth, window.innerHeight)

renderer.domElement.style.position = "fixed"
renderer.domElement.style.top = "0"
renderer.domElement.style.left = "0"
renderer.domElement.style.zIndex = "-1"

document.body.appendChild(renderer.domElement)


/* PARTICLE SETTINGS */

const particleCount = 180
const particles = []

const geometry = new THREE.BufferGeometry()
const positions = []


for(let i=0;i<particleCount;i++){

let x = (Math.random()-0.5)*800
let y = (Math.random()-0.5)*800
let z = (Math.random()-0.5)*800

positions.push(x,y,z)

particles.push({
x:x,
y:y,
z:z,
vx:(Math.random()-0.5)*0.2,
vy:(Math.random()-0.5)*0.2,
vz:(Math.random()-0.5)*0.2
})

}

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(positions,3)
)


/* PARTICLE MATERIAL */

const material = new THREE.PointsMaterial({
color:0xff4fa3,
size:3
})

const pointMesh = new THREE.Points(geometry,material)

scene.add(pointMesh)


/* LINE CONNECTIONS */

const lineMaterial = new THREE.LineBasicMaterial({
color:0xff7ab8,
transparent:true,
opacity:0.3
})

let lineGeometry = new THREE.BufferGeometry()
let lineMesh = new THREE.LineSegments(lineGeometry,lineMaterial)

scene.add(lineMesh)


camera.position.z = 500


/* MOUSE */

let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove",e=>{

mouseX = (e.clientX - window.innerWidth/2) * 0.001
mouseY = (e.clientY - window.innerHeight/2) * 0.001

})


/* ANIMATION LOOP */

function animate(){

requestAnimationFrame(animate)


const pos = geometry.attributes.position.array

for(let i=0;i<particles.length;i++){

let p = particles[i]

p.x += p.vx
p.y += p.vy
p.z += p.vz

if(p.x>400||p.x<-400)p.vx*=-1
if(p.y>400||p.y<-400)p.vy*=-1
if(p.z>400||p.z<-400)p.vz*=-1

pos[i*3] = p.x
pos[i*3+1] = p.y
pos[i*3+2] = p.z

}

geometry.attributes.position.needsUpdate = true


/* CREATE CONNECTION LINES */

let linePositions = []

for(let i=0;i<particles.length;i++){

for(let j=i+1;j<particles.length;j++){

let dx = particles[i].x - particles[j].x
let dy = particles[i].y - particles[j].y
let dz = particles[i].z - particles[j].z

let dist = Math.sqrt(dx*dx+dy*dy+dz*dz)

if(dist < 120){

linePositions.push(
particles[i].x,particles[i].y,particles[i].z,
particles[j].x,particles[j].y,particles[j].z
)

}

}

}

lineGeometry.dispose()

lineGeometry = new THREE.BufferGeometry()

lineGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(linePositions,3)
)

lineMesh.geometry = lineGeometry


/* CAMERA PARALLAX */

camera.position.x += (mouseX*200 - camera.position.x)*0.05
camera.position.y += (-mouseY*200 - camera.position.y)*0.05

camera.lookAt(scene.position)

renderer.render(scene,camera)

}

animate()


/* =========================
RESPONSIVE
========================= */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})