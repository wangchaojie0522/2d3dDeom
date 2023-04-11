
<template>
    <div class="baseBox">
        <div style="height:56px;line-height: 56px">
            <span v-for="(item) in typeArr" :key="item.type">
                <span :class="{'label': true, 'labelActive': typeActive == item.type}" @click="onChange(item.type)">
                    {{item.name}} 
                </span>
                <span>{{ " | " }}</span>
            </span>
            <span class="label" @click="onClean">
                清除
            </span>
        </div>
        <div style="height:calc(100% - 60px)">
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
        const typeArr = ref([
            {
                name: '点',
                type: 'point'
            },
            {
                name: '线',
                type: 'line'
            },
            {
                name: '面',
                type: 'plane'
            },
        ])
        const typeActive = ref('point')
        const color = ref('#008000')
       
        const LineFlag = ref(false)
        const lineX0 = ref(0)
        const lineY0 = ref(0)
        const lineX1 = ref(0)
        const lineY1 = ref(0)
        const onChange = (val:string) => {
            typeActive.value = val
            onClean()
        }
        let cxt:any;
        const init = () => {
            let canvasDiv:any = document.querySelector("#canvasBox2")
            cxt = canvasDiv.getContext("2d")
        }
        const drawPoint = (X:number,Y:number) => {
            cxt.beginPath()
            cxt.arc(X,Y,Math.random() * 30,0,2*Math.PI);
            cxt.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},${Math.random()})`
            cxt.fill()
        }
        const drawLine = (X:number,Y:number,X1:number,Y1:number) => {
            onClean()
            cxt.beginPath()
            cxt.moveTo(X,Y)
            cxt.lineTo(X1,Y1)
            cxt.strokeStyle = color.value
            cxt.stroke()
        }
        const onMousedown = (e:any) => {
            if(typeActive.value == 'point') {
                drawPoint(e.offsetX,e.offsetY)
            } else if(typeActive.value == 'line') {
                LineFlag.value = true
                lineX0.value = e.offsetX
                lineY0.value = e.offsetY
                drawLine(e.offsetX,e.offsetY,e.offsetX,e.offsetY)
            } 
        }
        const onMousemove = (e:any) => {
            if(typeActive.value == 'line') {
                if(LineFlag.value) {
                    lineX1.value = e.offsetX
                    lineY1.value = e.offsetY
                    drawLine(lineX0.value,lineY0.value,e.offsetX,e.offsetY)
                }
            } 
        }
        const onMouseup = (e:any) => {
            if(typeActive.value == 'line') {
                if(LineFlag.value) {
                    lineX1.value = e.offsetX
                    lineY1.value = e.offsetY
                    drawLine(lineX0.value,lineY0.value,lineX1.value,lineY1.value)
                    LineFlag.value = false
                    lineX0.value = e.offsetX
                    lineY0.value = e.offsetY
                    lineX1.value = e.offsetX
                    lineY1.value = e.offsetY
                }
            } 
        }
        const onClean = () => {
            cxt.clearRect(0, 0, 960, 600);
        }
        onMounted(() => {
            init()
        });
        return {
            typeArr,
            typeActive,
            color,
            LineFlag,
            lineX0,
            lineY0,
            lineX1,
            lineY1,
            drawPoint,
            drawLine,
            onChange,
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
        padding: 10px 20px;
        cursor: pointer;
    }
    .labelActive {
        color: rgb(18, 231, 239);
    }

    #canvasBox2 {
        background: #000;
        cursor: pointer;
    }
</style>
   