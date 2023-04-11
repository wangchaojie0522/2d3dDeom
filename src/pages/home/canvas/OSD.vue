
<template>
    <div class="baseBox">
        <div style="padding: 20px 0">
            <div>
                <span class="label">OSD文字</span>
                <a-input v-model:value="osdText" @change="textChange" style="width: 200px" placeholder="请输入" />
                <span class="label">OSD大小</span>
                <a-select v-model:value="osdSize" @change="textChange" style="width: 200px">
                    <a-select-option value="12">12x12</a-select-option>
                    <a-select-option value="16">16x16</a-select-option>
                    <a-select-option value="20">20x20</a-select-option>
                    <a-select-option value="24">24x24</a-select-option>
                    <a-select-option value="32">32x32</a-select-option>
                    <a-select-option value="48">48x48</a-select-option>
                </a-select>
                <span class="label">OSD颜色</span>
                <a-input v-model:value="osdColor" @change="textChange" size="small" style="width: 40px;margin: 0 20px 0 0" type="color" />
                <a-button @click="onClean">
                    清除
                </a-button>
            </div>
           
        </div>
        <div style="height:calc(100% - 80px);position:relative">
            <canvas ref="canvasBox1" id="canvasBox1" width="960" height="600"></canvas>
            <canvas ref="canvasBox2" id="canvasBox2" @mousedown="onMousedown"  @mousemove="onMousemove"  @mouseup="onMouseup" width="960" height="600"></canvas>
        </div>
    </div>
   
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, provide } from 'vue';
import { onMounted } from 'vue'

export default defineComponent({
    components: {

    },
    setup() {

        const osdColor = ref('#ff0000')
        const osdText = ref("测试text111111")
        const osdSize = ref("24")
        const drawFlag = ref(false)
        const lineX0 = ref(0)
        const lineY0 = ref(0)
        const lineX1 = ref(0)
        const lineY1 = ref(0)
        const canvasBox2 = ref()
        let ctx:any;
        const init = () => {
            let canvasDiv:any = document.querySelector("#canvasBox2")
            ctx = canvasDiv.getContext("2d")
            drawText()
        }
        const drawText = () => {
            onClean()
             //设置填充文字样式
            ctx.font = osdSize.value + "px Georgia"
            ctx.textAlign = 'start' // 文字对齐方式
            ctx.textBaseline = 'top' // 文字基线
            const { width } = ctx.measureText(osdText.value);
            ctx.fillStyle="#999";
            ctx.fillRect(lineX0.value, lineY0.value, width, Number(osdSize.value));
            ctx.fillStyle = "" + osdColor.value
            
            //设置文字及其位置
            ctx.fillText(osdText.value, lineX0.value, lineY0.value);
           
            //设置线性渐变色
     /*        let gradient = ctx.createLinearGradient(0, 0, 800, 0);
            gradient.addColorStop("0", "magenta")
            gradient.addColorStop("0.5", "blue")
            gradient.addColorStop("1.0", "red")
            ctx.strokeStyle = gradient;
            ctx.strokeText("Big smile!", 10, 90) */
        }
        const textChange = (val:string) => {
            drawText()
        }
        const onMousedown = (e:any) => {
            let flag = onCheck(e.offsetX, e.offsetY)
            if(flag) {
                drawFlag.value = true
                lineX1.value = e.offsetX - lineX0.value
                lineY1.value = e.offsetY - lineY0.value
            }
        }
        const onMousemove = (e:any) => {
            ctx.font = osdSize.value + "px Georgia"
            ctx.textAlign = 'start' // 文字对齐方式
            ctx.textBaseline = 'top' // 文字基线
            const { width } = ctx.measureText(osdText.value);
            let flag = onCheck(e.offsetX, e.offsetY)
            if(drawFlag.value) {
                lineX0.value = e.offsetX - lineX1.value < 0 ? 0 :(e.offsetX - lineX1.value > 960 - width ? 960 -width : e.offsetX - lineX1.value) 
                lineY0.value = e.offsetY - lineY1.value < 0 ? 0 :(e.offsetY - lineY1.value > 600 - Number(osdSize.value) ? 600 - Number(osdSize.value) : e.offsetY - lineY1.value)
                drawText()
            } else {
                if(flag){
                    canvasBox2.value.style.cursor = 'grab'
                } else {
                    canvasBox2.value.style.cursor = 'revert'
                }
            }
        }
        const onMouseup = (e:any) => {
            let flag = onCheck(e.offsetX, e.offsetY)
            ctx.font = osdSize.value + "px Georgia"
            ctx.textAlign = 'start' // 文字对齐方式
            ctx.textBaseline = 'top' // 文字基线
            const { width } = ctx.measureText(osdText.value);
            if(flag) {
                lineX0.value = e.offsetX - lineX1.value < 0 ? 0 :(e.offsetX - lineX1.value > 960 - width ? 960 -width : e.offsetX - lineX1.value) 
                lineY0.value =  e.offsetY - lineY1.value < 0 ? 0 :(e.offsetY - lineY1.value > 600 - Number(osdSize.value) ? 600 - Number(osdSize.value) : e.offsetY - lineY1.value)
                drawFlag.value = false
                drawText()
            }   
           
        }
        const onCheck = (X:number,Y:number) => {
            ctx.font = osdSize.value + "px Georgia"
            ctx.textAlign = 'start' // 文字对齐方式
            ctx.textBaseline = 'top' // 文字基线
            const { width } = ctx.measureText(osdText.value);
            if(X>= lineX0.value && X<=lineX0.value + width && Y >= lineY0.value && Y <= lineY0 .value + Number(osdSize.value)){
                return true
            } else {
                return false
            }
        }
        const onClean = () => {
            ctx.clearRect(0, 0, 960, 600);
        }
        onMounted(() => {
            init()
        });
        return {
            drawFlag,
            lineX0,
            lineY0,
            lineX1,
            lineY1,
            osdColor,
            osdText,
            osdSize,
            canvasBox2,
            textChange,
            drawText,
            onMousedown,
            onMousemove,
            onMouseup,
            onClean,
        }
    }
})
</script>
<style scoped lang="scss">
    .baseBox {
        height: 100%;
        overflow: auto;
    }
    .label{
        padding: 10px 20px 10px 10px;
    }
    .labelActive {
        color: rgb(18, 231, 239);
    }

    #canvasBox1 {
        background: #000;
    }
    #canvasBox2 {
       position: absolute;
       top: 0;
       left: 0;
    }
</style>
   