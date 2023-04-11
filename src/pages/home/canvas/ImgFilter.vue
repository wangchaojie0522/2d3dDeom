
<template>
    <div class="baseBox">
        <div style="padding: 20px 0;">
            <div>
                上传图片：<input type="file" @change="uploadData"  />
            </div>
        </div>
        <div style="height:calc(100% - 100px);overflow:auto;margin-bootom: 20px;cursor:crosshair">
            <div>
                <h3>原图</h3>
                <canvas ref="canvasBox" id="filterBox" ></canvas>
            </div>
            <div v-for="item in filterArr" :key="item.id">
                <h3>{{ item.name }}</h3>
                <canvas :id="'filterBox' + item.id" ></canvas>
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
        const colorData = ref()
        const ctx1 = ref<CanvasRenderingContext2D | undefined>()
        const canvasBox1 = ref()
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
        const filterArr = ref([
            {id: 1, name: '黑白滤镜',fun: 'blackFilter'},
            {id: 2, name: '反向滤镜',fun: 'revertFilter'},
            {id: 3, name: '灰度滤镜',fun: 'grayFilter'},
            {id: 4, name: '去色滤镜',fun: 'discolorFilter'},
            {id: 5, name: '怀旧滤镜',fun: 'retroFilter'},
            {id: 6, name: '冰冻滤镜',fun: 'frozenFilter'},
            {id: 7, name: '熔铸滤镜',fun: 'castingFilter'},
            {id: 8, name: '连环画滤镜',fun: 'comicStripFilter'},
            {id: 9, name: '高斯模糊滤镜',fun: 'gaussBlurFilter'},
            {id: 10, name: '水平翻转滤镜',fun: 'hRevertFilter'},
            {id: 11, name: '垂直翻转滤镜',fun: 'vRevertFilter'},
            {id: 12, name: '红色滤镜',fun: 'redFilter'},
            {id: 13, name: '绿色滤镜',fun: 'greenFilter'},
            {id: 14, name: '蓝色滤镜',fun: 'blueFilter'},
            {id: 15, name: '暗调滤镜',fun: 'crypticFilter'},
            {id: 16, name: '曝光过度滤镜',fun: 'overexposureFilter'},
            {id: 17, name: '浮雕滤镜',fun: 'relief1Filter'},
            {id: 18, name: '雕刻滤镜',fun: 'relief2Filter'},
        ])
        const init = (file:any) => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            let img:any = new Image() 
            reader.onload = function () {
               //先创建图片对象
                img.src = this.result
                img.onload = function () { //图片加载完后
                    let dom = document.querySelector("#filterBox") as HTMLCanvasElement
                    let ctx  = dom.getContext("2d") as CanvasRenderingContext2D;
                   
                    if(ctx1) {
                        dom.height = img.height
                        dom.width = img.width
                        ctx.drawImage(img, 0, 0);
                        filterArr.value.forEach(item => {
                            let dom2 = document.querySelector("#filterBox" + item.id) as HTMLCanvasElement
                            let ctx2  = dom2.getContext("2d") as CanvasRenderingContext2D;
                            dom2.height = img.height
                            dom2.width = img.width
                            let myImageData = ctx.getImageData(0, 0, img.width, img.height);
                            ctx2.putImageData(eval(item.fun)(myImageData), 0, 0);
                        })
                        
                    }
                }
               
                
            }
        }
        // 黑白滤镜
        const  blackFilter = (imageData:any) =>{
            const { data } = imageData;
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg >= 100 ? 255 : 0;
            }
            return imageData
        }
        // 反向滤镜
        const  revertFilter = (imageData:any) =>{
            const { data } = imageData;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            return imageData
        }
        // 灰度滤镜
        const  grayFilter = (imageData:any) =>{
            const { data } = imageData;
            for (let i = 0; i < data.length; i += 4) {
                let grayVal = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
                if (grayVal > 255) {
                    grayVal = 255;
                }
                data[i] = grayVal;
                data[i + 1] = grayVal;
                data[i + 2] = grayVal;
            }
            return imageData
        }
        // 去色滤镜
        const  discolorFilter = (imageData:any) =>{
            const { data } = imageData;
            for (let i = 0; i < data.length; i++) {
                const avg = Math.floor((Math.min(data[i], data[i + 1], data[i + 2]) + Math.max(data[i], data[i + 1], data[i + 2])) / 2);
                data[i] = data[i + 1] = data[i + 2] = avg;
            }
            return imageData
        }
        // 怀旧滤镜
        const  retroFilter = (imageData:any) =>{
            const { data } = imageData;
            for (let i = 0; i < data.length; i++) {
                let r = data[i * 4],
                    g = data[i * 4 + 1],
                    b = data[i * 4 + 2];
                const newR = 0.393 * r + 0.769 * g + 0.189 * b;
                const newG = 0.349 * r + 0.686 * g + 0.168 * b;
                const newB = 0.272 * r + 0.534 * g + 0.131 * b;
                const rgbArr = [newR, newG, newB].map((e) => {
                    return e > 255 ? 255 : e;
                });
                [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]] = rgbArr;
            }
            return imageData
        }
        // 冰冻滤镜
        const  frozenFilter = (imageData:any) =>{
            const { data, width, height } = imageData;
            for (let i = 0; i < width * height; i++) {
                const r = data[i * 4],
                    g = data[i * 4 + 1],
                    b = data[i * 4 + 2];

                data[i * 4] = (r - g - b) * 3 / 2;
                data[i * 4 + 1] = (g - r - b) * 3 / 2;
                data[i * 4 + 2] = (b - g - r) * 3 / 2;
            }
            return imageData
        }
        // 熔铸滤镜
        const  castingFilter = (imageData:any) =>{
            const { data, width, height } = imageData;
            for (let i = 0; i < width * height; i++) {
                const r = data[i * 4],
                    g = data[i * 4 + 1],
                    b = data[i * 4 + 2];

                data[i * 4] = r * 128 / (g + b + 1);
                data[i * 4 + 1] = g * 128 / (r + b + 1);
                data[i * 4 + 2] = b * 128 / (g + r + 1);
            }
            return imageData
        }
        // 连环画滤镜
        const  comicStripFilter = (imageData:any) =>{
            const { data, width, height } = imageData;
            for (let i = 0; i < width * height; i++) {
                const r = data[i * 4],
                    g = data[i * 4 + 1],
                    b = data[i * 4 + 2];

                data[i * 4] = Math.abs(g - b + g + r) * r / 256;
                data[i * 4 + 1] = Math.abs(b - g + b + r) * r / 256;
                data[i * 4 + 2] = Math.abs(b - g + b + r) * g / 256;
            }
            return imageData
        }
        // 高斯模糊滤镜
        const handleEdge = (i:number, x:number, w:number) => {
            var m = x + i;
            if (m < 0) {
                m = -m;
            } else if (m >= w) {
                m = w + i - x;
            }
            return m;
        }

        const  gaussBlurFilter = (imageData:any,radius = 5, sig:any) =>{
            const { data, width, height } = imageData;
            const sigma = sig || radius / 3;
            const gaussEdge = radius * 2 + 1;
            const gaussMatrix = [];
            const a = 1 / (2 * sigma * sigma * Math.PI);
            const b = -a * Math.PI;
            let gaussSum = 0;

            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    const gxy = a * Math.exp((i * i + j * j) * b);
                    gaussMatrix.push(gxy);
                    gaussSum += gxy;
                }
            }
            const gaussNum = (radius + 1) * (radius + 1);
            for (let i = 0; i < gaussNum; i++) {
                gaussMatrix[i] /= gaussSum;
            }

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let r = 0, g = 0, b = 0;
                    for (let i = -radius; i <= radius; i++) {
                        const m = handleEdge(i, x, width);
                        for (let j = -radius; j <= radius; j++) {
                            const mm = handleEdge(j, y, height);
                            const index = (mm * width + m) * 4;
                            const jj = j + radius;
                            const ii = i + radius;
                            r += data[index] * gaussMatrix[jj * gaussEdge + ii];
                            g += data[index + 1] * gaussMatrix[jj * gaussEdge + ii];
                            b += data[index + 2] * gaussMatrix[jj * gaussEdge + ii];
                        }
                    }
                    const index = (y * width + x) * 4;
                    data[index] = Math.floor(r);
                    data[index + 1] = Math.floor(g);
                    data[index + 2] = Math.floor(b);
                }
            }
            return imageData
        }
       
        // 水平翻转滤镜
        const createNewImageData = (imageData:any) =>{
            const { data, width, height } = imageData;
            const newImgData = new ImageData(width, height);
            newImgData.data.set(data);
            return newImgData;
        }

        const hRevertFilter = (imageData:any) => {
            const { data, width, height } = imageData;
            const oriImageData = createNewImageData(imageData);
            const { data: oriData } = oriImageData;
            for (let i = 0, h = height; i < h; i++) {
                for (let j = 0, w = width; j < w; j++) {
                    data[i * w * 4 + j * 4 + 0] = oriData[i * w * 4 + (w - j) * 4 + 0];
                    data[i * w * 4 + j * 4 + 1] = oriData[i * w * 4 + (w - j) * 4 + 1];
                    data[i * w * 4 + j * 4 + 2] = oriData[i * w * 4 + (w - j) * 4 + 2];
                    data[i * w * 4 + j * 4 + 3] = oriData[i * w * 4 + (w - j) * 4 + 3];
                }
            }
            return imageData
        }
        // 垂直翻转滤镜
        const vRevertFilter = (imageData:any) =>{
            const { data, width, height } = imageData;
            const oriImageData = createNewImageData(imageData);
            const { data: oriData } = oriImageData;
            for (let i = 0, h = height; i < h; i++) {
                for (let j = 0, w = width; j < w; j++) {
                    data[i * w * 4 + j * 4 + 0] = oriData[(h - i) * w * 4 + j * 4 + 0];
                    data[i * w * 4 + j * 4 + 1] = oriData[(h - i) * w * 4 + j * 4 + 1];
                    data[i * w * 4 + j * 4 + 2] = oriData[(h - i) * w * 4 + j * 4 + 2];
                    data[i * w * 4 + j * 4 + 3] = oriData[(h - i) * w * 4 + j * 4 + 3];
                }
            }
            return imageData
        }
        // 单色滤镜
        const redFilter = (imageData:any) =>{
            const { data } = imageData;
            const length = data.length / 4;
            for (let i = 0; i < length; i++) {
                data[i * 4 + 1] = 0;
                data[i * 4 + 2] = 0;
            }
            return imageData
        }
        const greenFilter = (imageData:any) =>{
            const { data } = imageData;
            const length = data.length / 4;
            for (let i = 0; i < length; i++) {
                data[i * 4 ] = 0;
                data[i * 4 + 2] = 0;
            }
            return imageData
        }
        const blueFilter = (imageData:any) =>{
            const { data } = imageData;
            const length = data.length / 4;
            for (let i = 0; i < length; i++) {
                data[i * 4] = 0;
                data[i * 4 + 1] = 0;
            }
            return imageData
        }

        // 暗调滤镜
        const crypticFilter = (imageData:any) =>{
            const { data } = imageData;
            for (let i = 0; i < data.length; i++) {
                const r = data[i * 4],
                    g = data[i * 4 + 1],
                    b = data[i * 4 + 2];
                data[i * 4] = (r * r) / 255;
                data[i * 4 + 1] = (g * g) / 255;
                data[i * 4 + 2] = (b * b) / 255;
            }
            return imageData
        }

        // 曝光过度滤镜
        const overexposureFilter = (imageData:any) =>{
            const { data } = imageData;
            for (let i = 0; i < data.length; i += 4) {
                const r = 255 - data[i];
                const g = 255 - data[i + 1];
                const b = 255 - data[i + 2];
                data[i] = Math.min(r, data[i]);
                data[i + 1] = Math.min(g, data[i + 1]);
                data[i + 2] = Math.min(b, data[i + 2]);
            }
            return imageData
        }
        // 浮雕滤镜
        const relief1Filter = (imageData:any) =>{
            const { data, width, height } = imageData;
            const oriImageData = createNewImageData(imageData);
            const { data: oriData } = oriImageData;
            for (let i = 1; i < width - 1; i++) {
                for (let j = 1; j < height - 1; j++) {
                    const index = 4 * (j * width + i);
                    const nextIndex = index + 4;
                    const lastIndex = index - 4;
                    const r = oriData[nextIndex] - oriData[lastIndex] + 128;
                    const g = oriData[nextIndex + 1] - oriData[lastIndex + 1] + 128;
                    const b = oriData[nextIndex + 2] - oriData[lastIndex + 2] + 128;
                    const rgbArr = [r, g, b].map((e) => {
                        return e < 0 ? 0 : e > 255 ? 255 : e;
                    });
                    [data[index], data[index + 1], data[index + 2]] = rgbArr;
                }
            }
            return imageData
        }
        // 雕刻滤镜
        const relief2Filter = (imageData:any) =>{
            const { data, width, height } = imageData;
            const oriImageData = createNewImageData(imageData);
            const { data: oriData } = oriImageData;
            for (let i = 1; i < width - 1; i++) {
                for (let j = 1; j < height - 1; j++) {
                    const index = 4 * (j * width + i);
                    const lastIndex = index - 4;
                    const r = oriData[index] - oriData[lastIndex] + 128;
                    const g = oriData[index + 1] - oriData[lastIndex + 1] + 128;
                    const b = oriData[index + 2] - oriData[lastIndex + 2] + 128;
                    const rgbArr = [r, g, b].map((e) => {
                        return e < 0 ? 0 : e > 255 ? 255 : e;
                    });
                    [data[index], data[index + 1], data[index + 2]] = rgbArr;
                }
            }
            return imageData
        }
        onMounted(() => {
        }); 
        return {
            ctx1,
            canvasBox1,
            colorData,
            imgArr,
            filterArr,
            init,
            handleEdge,
            createNewImageData,
            uploadData,
            blackFilter,
            revertFilter,
            grayFilter,
            discolorFilter,
            retroFilter,
            frozenFilter,
            castingFilter,
            comicStripFilter,
            gaussBlurFilter,
            hRevertFilter,
            vRevertFilter,
            redFilter,
            greenFilter,
            blueFilter,
            crypticFilter,
            overexposureFilter,
            relief1Filter,
            relief2Filter,
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
   