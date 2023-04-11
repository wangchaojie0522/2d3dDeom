
<template>
    <div ref="cesiumContainer" id="cesiumContainer" class="cesiumContainer">
    </div>
</template>

<script lang="ts">
import * as Cesium from 'cesium';
import { defineComponent, onMounted } from 'vue';
import  modifyMap from './common/filterColor'

export default defineComponent({
    components: {

    },
    setup() {
        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmZjOTMzMi1kOWUzLTQyYmEtODZmNy1lMzA4ZGM4YTZlZDciLCJpZCI6NzU0MjgsImlhdCI6MTY3ODc4MzAwN30.RnI84GRgvMwu7CLxUayYQXEAFMtvWZwNd8ClPJG82-Q"
        let viewer
       
        const init = () =>{
            const layer = new Cesium.UrlTemplateImageryProvider({
                url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                minimumLevel: 4,
                maximumLevel: 18
            })
            viewer = new Cesium.Viewer('cesiumContainer',{
                animation: true, //是否显示动画控件
                shouldAnimate : true,
                homeButton: true, //是否显示Home按钮
                fullscreenButton: false, //是否显示全屏按钮
                baseLayerPicker: false, //是否显示图层选择控件
                geocoder: true, //是否显示地名查找控件
                timeline: false, //是否显示时间线控件
                sceneModePicker: true, //是否显示投影方式控件
                navigationHelpButton: false, //是否显示帮助信息控件
                infoBox: false, //是否显示点击要素之后显示的信息
                requestRenderMode: true, //启用请求渲染模式
                scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
                sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
                fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                    minimumLevel: 4,
                    maximumLevel: 18
                }),
                terrainProvider: Cesium.createWorldTerrain({
                    requestWaterMask: true, // 水波纹
                    requestVertexNormals: true, // 法向量
                })
            });
            // 北京鸟巢
            viewer.camera.setView({
                destination:Cesium.Cartesian3.fromDegrees(116.39651645634459, 39.99286415662197, 4000),
                // 方向、俯视和仰视的视角
                orientation:{
                // heading:Cesium.Math.toRadians(90),
                // pitch:Cesium.Math.toRadians(-90)
                }
            })
            //调用
            modifyMap(viewer, {
                //反色?
                invertColor: true,
                //滤镜值
                filterRGB: [60, 145, 172],
            });
        }
        onMounted(() => {
            init()
        })
    }
})
</script>
<style scoped lang="scss">
.cesiumContainer {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
}
</style>
   