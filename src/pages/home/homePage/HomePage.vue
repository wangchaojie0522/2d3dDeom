
<template>
    <div class="configBox">
        <div class="menuBox">
            <Menu :activeItem="activeItem" :menuArr="menuArr" />
        </div>
        <div class="mainBox">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, provide} from 'vue';

export default defineComponent({
    components: {

    },
    setup() {
        const activeItem = ref<string>('systemInfo');
        const menuArr = [
        {
            label: 'canvas',
            path: 'canvas',
            showFlag: true,
            // icon: 'AudioOutlined',
            children: [
                {
                    label: '点线面',
                    path: 'canvasBase',
                },
                {
                    label: '图片颜色',
                    path: 'canvasImgColor',
                },
                {
                    label: '截图',
                    path: 'canvasScreenshot',
                },
                {
                    label: '图片滤镜',
                    path: 'canvasImgFilter',
                },
                {
                    label: '视频滤镜',
                    path: 'canvasVideoFilter',
                },
                {
                    label: 'osd设置',
                    path: 'canvasOSD',
                },
                {
                    label: '录屏',
                    path: 'canvasScreenRecord',
                }
            ]
        },
        {
            label: 'webgl',
            path: 'webgl',
            showFlag: true,
            children: [
                {
                    label: '绘制点',
                    path: 'webglPoint',
                },
                {
                    label: '绘制线',
                    path: 'webglLine',
                },
                {
                    label: '绘制面',
                    path: 'webglPlane',
                },
                {
                    label: '异步绘制',
                    path: 'webglAsync',
                },
                {
                    label: '纹理绘制',
                    path: 'webglTexture',
                }
            ]
        },
        {
            label: 'three',
            path: 'three',
            showFlag: true,
            // icon: 'AudioOutlined',
            children: [
                {
                    label: 'demo1',
                    path: 'threeDemo1',
                },
                {
                    label: 'demo2',
                    path: 'threeDemo2',
                }
            ]
        },
        {
            label: 'cesium',
            path: 'cesium',
            showFlag: true,
            // icon: 'AudioOutlined',
            children: [
                {
                    label: 'demo1',
                    path: 'cesiumDemo1',
                },
                {
                    label: 'demo2',
                    path: 'cesiumDemo2',
                }
            ]
        },
    ]
        const isRouterAlive = ref<boolean>(true)
        const reload = () => {
            isRouterAlive.value = false
            nextTick(() => (
                isRouterAlive.value = true
            ))
        }
        provide('reloads', reload)
        return {
            isRouterAlive,
            menuArr,
            activeItem,
        }
    }
})
</script>
<style scoped lang="scss">
.configBox {
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background: rgb(12, 31, 56);
    .menuBox {
        display: inline-block;
        width: 288px;
        height: 100%;
        vertical-align: top;
    }

    .mainBox {
        display: inline-block;
        width: calc(100% - 312px);
        background: rgb(12, 31, 56);
        color: rgb(246, 247, 248);
        margin: 12px;
        height: calc(100% - 24px);
        vertical-align: top;

    }
}
</style>
   