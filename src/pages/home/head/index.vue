<template>
  <div class="head">
    <div class="canvas-container" ref="screenDom"></div>
    <div class="content">
    <h1>学习更多前端技术</h1>
    <h2>请关注
      <a href="https://blog.csdn.net/qq_53123067" target="_blank">亦世凡华、</a>
    </h2>
  </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ref,onMounted } from 'vue'
 
let screenDom = ref();
// 设置场景
const scene = new THREE.Scene()
// 设置相机
const camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0,0,5)
// 渲染器
let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth,window.innerHeight)
onMounted(()=>{
  screenDom.value.appendChild(renderer.domElement);
})
 
// 监听屏幕大小变化
window.addEventListener("resize",()=>{ 
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
})
 
// 加载纹理
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("/src/assets/bg2.jpg")
const depthTexture = textureLoader.load("/src/assets/bg2_depth.jpg")
 
// 创建屏幕
const geomery = new THREE.PlaneGeometry(20.2,12.8)
// 创建鼠标对象
const mouse = new THREE.Vector2()
// 设置着色器材质
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: texture },
    uDepthTexture: { value: depthTexture },
    uMouse: { value: mouse }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform sampler2D uDepthTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      vec4 depth = texture2D(uDepthTexture, vUv);
      float depthValue = depth.r;
      float x = vUv.x + (uMouse.x+sin(uTime))*0.01*depthValue;
      float y = vUv.y + (uMouse.y+cos(uTime))*0.01*depthValue;
      vec4 newColor = texture2D(uTexture, vec2(x, y));
      gl_FragColor = newColor;
    }
  `,
})
const plane = new THREE.Mesh(geomery,material)
scene.add(plane)
 
// 设置渲染函数
const render = () =>{ 
  material.uniforms.uMouse.value = mouse;
  material.uniforms.uTime.value = performance.now() / 1000;
  requestAnimationFrame(render)
  renderer.render(scene,camera)
} 
render()
 
// 设置鼠标移动监听事件
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  .content{
    position: fixed;
    top: 40%;
    left: 20%;
    h1 {
      color: rgb(255, 247, 0);
      font-size: 40px;
      margin-bottom: 30px;
    }
    h2 {
      color: red;
      width: 100vh;
      text-align: center;
      font-size: 30px;
      a {
        text-decoration: none;
        color: #008c8c;
        &:hover {
          color: rgb(145, 6, 85);
        }
      }
    }
  }
}
</style>