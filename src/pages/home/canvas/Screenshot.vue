
<template>
    <div class="baseBox">
        <div style="padding: 20px 0;">
            <div>
                上传图片：<input type="file" @change="uploadData"  />
            </div>
        </div>
        <div class="canvasDivLeft">
            <canvas ref="canvasBox1" id="canvasBox1" ></canvas>
            <canvas ref="canvasBox2" id="canvasBox2" @mousedown="onMousedown"  @mousemove="onMousemove"  @mouseup="onMouseup" ></canvas>
        </div>
        <div class="canvasDivRight">
            <div>
                <button @click="onSaveImg">保存截图</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { onMounted } from 'vue'

export default defineComponent({
    components: {

    },
    setup() {
        const ctx1 = ref<CanvasRenderingContext2D | undefined>()
        const ctx2 = ref<CanvasRenderingContext2D | undefined>()
        const colorData = ref()
        const canvasBox1 = ref()
        const canvasBox2 = ref()
        const imgArr = ref<any[]>([])
        const uploadData = (e:any) => {
            if(e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpg" ) {
                imgArr.value[0] = e.target.files[0]
                init(e.target.files[0])
            } else {
                alert("请选择png,jpg格式的图片")
                return
            }
        }

        const init = (file:any) => {
            ctx1.value  = canvasBox1.value.getContext("2d") as CanvasRenderingContext2D;
            ctx2.value  = canvasBox2.value.getContext("2d") as CanvasRenderingContext2D;
       
            let reader = new FileReader()
            reader.readAsDataURL(file)
            let img:any = new Image() 
            reader.onload = function () {
               //先创建图片对象
                img.src = this.result
                console.log(this.result)
                img.onload = function () { //图片加载完后
                    if(ctx1.value) {
                        canvasBox1.value.height = img.height
                        canvasBox1.value.width = img.width
                        canvasBox2.value.height = img.height
                        canvasBox2.value.width = img.width
                        ctx1.value.drawImage(img, 0, 0);
                    }
                }
               
                
            }
            //当图片加载完的时候
           
        }
        const X0 = ref(0)
        const Y0 = ref(0)
        const X1 = ref(0)
        const Y1 = ref(0)
        const drawFlag = ref(false)
        const onMousedown = (e:any) => {
           X0.value = e.offsetX
           Y0.value = e.offsetY
           drawFlag.value = true
           onClean()
        }
        const onMousemove = (e:any) => {
           if(drawFlag.value){
             X1.value = e.offsetX
             Y1.value = e.offsetY
             drawRect()
           }
        }
        const onMouseup = (e:any) => {
            drawFlag.value = false
            X1.value = e.offsetX
            Y1.value = e.offsetY
            if(X0.value != X1.value && Y0.value != Y1.value){
                drawRect()
            }
        }
        const drawRect = () =>{
            if(ctx2.value) {
                onClean()
                let X = X0.value <=  X1.value ? X0.value:X1.value
                let Y = Y0.value <=  Y1.value ? Y0.value:Y1.value
                let W = Math.abs(X1.value - X0.value)
                let H = Math.abs(Y1.value - Y0.value)
                // 背景遮罩
                ctx2.value.fillRect(0, 0, canvasBox2.value.width, canvasBox2.value.height)
                ctx2.value.fillStyle = "rgba(0,0,0,0.3)"
                ctx2.value.fill()
                // 截图区域
                ctx2.value.clearRect(X-1,Y-1, W-2,H-2);
                //截图框
                ctx2.value.beginPath()
                ctx2.value.strokeRect(X,Y, W,H)
                ctx2.value.strokeStyle = "green"
                ctx2.value.stroke()
                ctx2.value.beginPath()
            }
            
        }
        const drawImage = () => {

        }
        const onSaveImg = () => {
            let X = X0.value <=  X1.value ? X0.value:X1.value
            let Y = Y0.value <=  Y1.value ? Y0.value:Y1.value
            let W = Math.abs(X1.value - X0.value)
            let H = Math.abs(Y1.value - Y0.value)
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            const data = ctx1.value&&ctx1.value.getImageData(X,Y, W,H) 
            canvas.width = W
            canvas.height = H
            if(data){
                context.putImageData(data, 0, 0)
                let base64 =  canvas.toDataURL('image/png', 1)
                let byteCharacters = atob(
                    base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
                );
                let byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                let byteArray = new Uint8Array(byteNumbers);
                let blob = new Blob([byteArray], {
                    type: undefined,
                });
                let aLink = document.createElement("a");
                aLink.download = "截图.jpg"; //这里写保存时的图片名称
                aLink.href = URL.createObjectURL(blob);
                aLink.click();
            }
            
        }
        const onScreenshot = () => {
           let img =  canvasBox2.value.toDataURL('image/png', 1)
           console.log(img)
        }
        const onClean = () => {
            if(ctx2.value) {

                ctx2.value.clearRect(0, 0, canvasBox2.value.width, canvasBox2.value.height);
                
            }
        }
        const onDrawMask = () => {
            if(ctx2.value) {
                
            }
        }
        onMounted(() => {
        }); 
        return {
            ctx1,
            ctx2,
            colorData,
            canvasBox1,
            canvasBox2,
            imgArr,
            drawFlag,
            X0,
            Y0,
            X1,
            Y1,
            drawRect,
            drawImage,
            onClean,
            onDrawMask,
            init,
            uploadData,
            onMousedown,
            onMousemove,
            onMouseup,
            onScreenshot,
            onSaveImg,
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
    .canvasDivLeft {
        height:calc(100% - 140px);
        overflow:auto;
        margin:  0 0 20px 0;
        cursor:crosshair;
        position: relative;
        // width: 60%;
        // display: inline-block;
        // vertical-align: top;
    }
    .canvasDivRight {
        margin: 0 0  20px 0;
    }
    #canvasBox1 {
        background: #000;
    }
    #canvasBox2 {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
    }
</style>
   