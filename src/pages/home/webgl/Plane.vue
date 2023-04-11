
<template>
    <canvas ref="webglBox1" id="webglBox3" width="960" height="600">
    </canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { onMounted } from 'vue'
export default defineComponent({
    components: {

    },
    setup() {
        let webgl:any;
        let points:any = [];
        let mat4:any = window.glMatrix.mat4;
        let projectionMatrix:any = mat4.create();
        // window.glMatrix.mat4
        // 顶点着色器
        let vertexString = `
            attribute vec4 a_position;
            void main(){
                gl_Position = a_position;
            }
        `;
        // 片元着色器
        let fragmentString = `
            void main() {
                gl_FragColor = vec4(0,1.0, 0,1.0);
            }
        `;
        // 初始化
        const init = () => {
            initWebgl()
            initShader()
            initBuffer()
            draw()
        }
        // 初始化webgl 函数
        const initWebgl = () => {
            let webglDiv:any = document.getElementById("webglBox3")
            webgl = webglDiv.getContext("webgl")
            // 设置可视区域
            webgl.viewport(0,0, webglDiv.clientWidth, webglDiv.clientHeight)
            // 设置相机
            const fieldOfView = 45 * Math.PI / 180;   // in radians
            const aspect = webglDiv.clientWidth / webglDiv.clientHeight;
            const zNear = 0.1;
            const zFar = 100.0;
            mat4.perspective(projectionMatrix,
                            fieldOfView,
                            aspect,
                            zNear,
                            zFar);
            //mat4.ortho([], webglDiv.clientWidth, webglDiv.clientHeight, 0, -1.0, 1.0, projectionMatrix) //(out, left, right, bottom, top, near, far) 

        }
        // 初始化着色器 顶点着色器 片元着色器
        const initShader = () => {
            let vsshader = webgl.createShader(webgl.VERTEX_SHADER);// 顶点
            let fsshader = webgl.createShader(webgl.FRAGMENT_SHADER);//片元
            //绑定
            webgl.shaderSource(vsshader,vertexString)
            webgl.shaderSource(fsshader,fragmentString)
            //编译
            webgl.compileShader(vsshader)
            webgl.compileShader(fsshader)
            // 获取着色器编译状态
            if (!webgl.getShaderParameter(vsshader, webgl.COMPILE_STATUS)) {
                var err = webgl.getShaderInfoLog(vsshader);
                alert(err);
                return;
            }

            if (!webgl.getShaderParameter(fsshader, webgl.COMPILE_STATUS)) {
                var err = webgl.getShaderInfoLog(fsshader);
                alert(err);
                return;
            }
            //绑定到webgl
            let program = webgl.createProgram();
            webgl.attachShader(program, vsshader);
            webgl.attachShader(program, fsshader);

            webgl.linkProgram(program)
            webgl.useProgram(program)

            webgl.program = program

        }
        // 初始化数据缓冲区 
        const initBuffer = () => {
            // 创建三角形顶点
            const points = new Float32Array([
                -0.5, -0.5,
                -0.5, 0.5,
                0.5, -0.5,
                0.6, 0.5,
                -0.4, 0.5,
                0.6, -0.5,
            ]);

            // 将定义好的数据写入 WebGL 的缓冲区
            const bufferId = webgl.createBuffer();
            webgl.bindBuffer(webgl.ARRAY_BUFFER, bufferId);
            webgl.bufferData(webgl.ARRAY_BUFFER, points, webgl.STATIC_DRAW);

            // 将缓冲区的数据读取到 GPU
            // 获取顶点着色器中的position变量的地址
            const vPosition = webgl.getAttribLocation(webgl.program, 'a_position');
            // 给变量设置长度和类型
            webgl.vertexAttribPointer(vPosition, 2, webgl.FLOAT, false, 0, 0);
            // 激活这个变量
            webgl.enableVertexAttribArray(vPosition);
        }
        // 绘制
        const draw = () => {
            webgl.clearColor(0.0, 0.0, 0.0, 1.0);
            webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
            webgl.drawArrays(webgl.TRIANGLES, 0,6);
        }
        onMounted(() => {
            init();
        });
        return {
            init,
            initWebgl,
            initShader,
            initBuffer,
            draw   
        }
    }
})
</script>
<style scoped lang="scss"></style>
   