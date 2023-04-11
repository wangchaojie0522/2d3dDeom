
<template>
    <div ref="demo1Box" id="demo1Box" class="demo1Box">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, provide } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue'
import { Scene } from 'three';

export default defineComponent({
    components: {

    },
    setup() {
        // 场景
        let scene:any = new THREE.Scene();
        // 模型
        let mesh: any = {};
        // 相机
        let camera: any = {};
        // 画布设置
        let renderer: any = {};
        // 初始化
        const init = () => {
            initMesh();
            initPoint();
            initCamera();
            initRender();
            // 挂载到dom中
            (document as any)
                .getElementById("demo1Box")
                .appendChild(renderer.domElement);
            // 渲染一次
            renderer.render(scene, camera);
            //创建控件对象
            let controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener("change", () => {
                renderer.render(scene, camera);
            }); //监听鼠标、键盘事件
        }
        // 初始化模型
        const initMesh = () => {
            //  (1). 创建一个立方体几何对象Geometry
            let geometry = new THREE.BoxGeometry(100, 100, 100);
            //  (2). 创建材质，就是立方体的表面那一层，这里设置成蓝色
            let material = new THREE.MeshLambertMaterial({
                color: 0x0000ff,
            });
            //  (3). 使用刚刚定义的玩意儿创建网格模型对象（一个有蓝色的立方体）
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        }
        // 初始化光源
        const initPoint = () => {
            // 白色的光源
            let point = new THREE.PointLight(0xffffff);
            // 点光源位置
            point.position.set(400, 200, 300);
            // 点光源添加到场景中
            scene.add(point);
            //  环境光
            let ambient = new THREE.AmbientLight(0x444444);
            scene.add(ambient);
        }
        // 初始化相机
        const initCamera = () => {
            let dom = document.querySelector('#demo1Box') as HTMLBaseElement
            let width = dom.offsetWidth; //窗口宽度
            let height = dom.offsetHeight; //窗口高度
            let k = width / height; //窗口宽高比
            let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
            //创建相机对象
            camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
            //设置相机位置
            camera.position.set(200, 300, 200);
            //设置相机方向(指向的场景对象)
            camera.lookAt(scene.position);
        }
        // 渲染画布
        const initRender = () => {
            let dom = document.querySelector('#demo1Box') as HTMLBaseElement
            let width = dom.offsetWidth; //窗口宽度
            let height = dom.offsetHeight; //窗口高度
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height); //设置渲染区域尺寸
            renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        }
        onMounted(() => {
            init();
        });
    }
})
</script>
<style scoped lang="scss">
.demo1Box{
    height: 100%;
}

</style>
   