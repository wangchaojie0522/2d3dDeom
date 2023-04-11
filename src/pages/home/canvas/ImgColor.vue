
<template>
    <div class="baseBox">
        <div style="padding: 20px 0;">
            <div>
                上传图片：<input type="file" @change="uploadData"  />
            </div>
            <div >
                当前颜色：{{ colorData }} <span :style="{'backgroundColor':colorData,'display':'inline-block','width': '20px','height':'20px','vertical-align': 'middle'}"></span>
            </div>
            <div >
                保存图片：<button @click="onSaveImg">保存</button>
            </div>
           <!--  <div>
                canvas截图：<button @click="onScreenshot">截图</button>
            </div> -->
        </div>
        <div style="height:calc(100% - 100px);overflow:auto;margin-bootom: 20px;cursor:crosshair">
            <canvas ref="canvasBox2" id="canvasBox2" @mousedown="onMousedown"  @mousemove="onMousemove"  @mouseup="onMouseup" ></canvas>
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
        const ctx = ref<CanvasRenderingContext2D | undefined>()
        const colorData = ref()
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
            ctx.value  = canvasBox2.value.getContext("2d") as CanvasRenderingContext2D;
            console.log(ctx.value)
            let reader = new FileReader()
            reader.readAsDataURL(file)
            let img:any = new Image() 
            reader.onload = function () {
               //先创建图片对象
                img.src = this.result
                console.log(this.result)
                img.onload = function () { //图片加载完后
                    console.log(ctx.value)
                    if(ctx.value) {
                        canvasBox2.value.height = img.height
                        canvasBox2.value.width = img.width
                        ctx.value.drawImage(img, 0, 0);
                    }
                }
               
                
            }
            //当图片加载完的时候
           
        }
        const onMousedown = (e:any) => {
           
        }
        const onMousemove = (e:any) => {
            if(imgArr.value.length) {
                let data:any = ctx.value&&ctx.value.getImageData(e.offsetX, e.offsetY, 1, 1).data
                colorData.value = data ? `rgba(${data[0]|| 0},${data[1]|| 0},${data[2]|| 0},${data[3]|| 0})`: 'rgba(255,255,255,255)'
            }
        }
        const onMouseup = (e:any) => {
            
        }
        const onSaveImg = () => {
            let base64 =  canvasBox2.value.toDataURL('image/png', 1)
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
            aLink.download = "图片.jpg"; //这里写保存时的图片名称
            aLink.href = URL.createObjectURL(blob);
            aLink.click();
        }
        const onScreenshot = () => {
           let img =  canvasBox2.value.toDataURL('image/png', 1)
           console.log(img)
        }
        onMounted(() => {
        }); 
        return {
            ctx,
            colorData,
            canvasBox2,
            imgArr,
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

    #canvasBox2 {
        background: #000;
        cursor: pointer;
    }
</style>
   