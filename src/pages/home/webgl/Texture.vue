
<template>
    <canvas  id="webglBox5" width="960" height="600">
    </canvas>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import { onMounted } from 'vue'

export default defineComponent({
    components: {

    },
    setup() {
        let webgl:any;
        let mat4:any = window.glMatrix.mat4;
        let projectionMatrix:any = mat4.create();
        let webglDiv:any;
        // window.glMatrix.mat4
        // 顶点着色器
        let vertexString = `
            precision mediump float;
            attribute vec2 a_Position;
            attribute vec2 a_Uv;
            varying vec2 v_Uv;
            void main() {
                gl_Position = vec4(a_Position, 0, 1);
                v_Uv = a_Uv;
            } 
        `;
        // 片元着色器
        let fragmentString = `
            precision mediump float;
            varying vec2 v_Uv;
            uniform sampler2D u_Texture;
            void main() {
                gl_FragColor = texture2D(u_Texture, v_Uv);
                // gl_FragColor = texture2D(u_Texture, vec2(v_Uv.x, v_Uv.y));
            }
        `;
        const points =  new Float32Array([
            // 前两位是 WebGL 坐标，后面两位是 canvas 坐标
            -0.85, -0.85, 0, 0,
            -0.85, 0.85, 0, 1,
            0.85, 0.85, 1, 1,
            -0.85, -0.85, 0, 0,
            0.85, 0.85, 1, 1,
            0.85, -0.85, 1, 0,
        ]);
        // 初始化
        const init = () => {
            initWebgl()
            initShader()
            initBuffer()
            draw()
           
        }
        // 初始化webgl 函数
        const initWebgl = () => {
            webglDiv = document.getElementById("webglBox5")
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
            // 创建缓冲区
            const bufferId = webgl.createBuffer();
            
            webgl.bindBuffer(webgl.ARRAY_BUFFER, bufferId);
            webgl.bufferData(webgl.ARRAY_BUFFER, points, webgl.STATIC_DRAW);

            const a_Position = webgl.getAttribLocation(webgl.program, 'a_Position');
            webgl.vertexAttribPointer(a_Position, 2, webgl.FLOAT, false, 16, 0);
            webgl.enableVertexAttribArray(a_Position);

            const a_Uv = webgl.getAttribLocation(webgl.program, 'a_Uv');
            // 缓冲区数据读取到 GPU
            webgl.vertexAttribPointer(a_Uv, 2, webgl.FLOAT, false, 16, 8);
            webgl.enableVertexAttribArray(a_Uv); 

          
        }
        // 绘制
        const draw = () => {
            const u_Texture = webgl.getUniformLocation(webgl.program, 'u_Texture');
            loadTexture(webgl, 'xcx.jpg', u_Texture, render); // 图片分辨率必须是 2的N次方

        }
         // 获取着色器中的 attribute 变量
       
        const render = () => {
            webgl.clearColor(0, 0, 0, 1);
            webgl.clear(webgl.COLOR_BUFFER_BIT);
            webgl.drawArrays(webgl.TRIANGLES, 0, points.length / 4);
        }
        const loadTexture = (
            gl: WebGLRenderingContext,
            src: string,
            attribute: WebGLUniformLocation,
            callback?: () => void,
            ) => {
            let  img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                let texture = gl.createTexture();//创建纹理图像缓冲区
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转,使得图片的左下角与UV坐标原点重合。
                gl.activeTexture(gl.TEXTURE0);//激活0号纹理单元TEXTURE0
                
                gl.bindTexture(gl.TEXTURE_2D, texture);//绑定纹理缓冲区
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); //设置纹素格式，jpg格式对应gl.RGB
                //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                // 水平填充
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                //竖直填充
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.uniform1i(attribute, 0);
                if (callback) {
                 callback();
                }
            };
            img.src = src;
        }
        onMounted(() => {
            init();
        });
        return {
            init,
            initWebgl,
            initShader,
            initBuffer,
            draw,
            render,
            loadTexture,
        }
    }
})
</script>
<style scoped lang="scss"></style>
   