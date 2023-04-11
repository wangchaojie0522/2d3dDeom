
<template>
    <canvas ref="webglBox1" id="webglBox4" @click="onClick" width="960" height="600">
    </canvas>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import { onMounted } from 'vue'
interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Point {
  x: number;
  y: number;
  size: number;
  color: Color;
}

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
            attribute vec4 a_Position;
            attribute float a_PointSize;
            void main(){
                gl_PointSize = a_PointSize;
                gl_Position = a_Position;
            }
        `;
        // 片元着色器
        let fragmentString = `
            precision mediump float;
            uniform vec4 u_FragColor;
            void main() {
                float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
                if (dist < 0.5) {
                    gl_FragColor = u_FragColor;
                } else {
                    discard;
                }
            }
        `;
        const points = ref<Array<Point>>([{
            x: 0,
            y: 0,
            size: 10.0,
            color: {
                r: 1.0,
                g: 0.0,
                b: 0.0,
                a: 1.0,
            }
        }]);
        // 初始化
        const init = () => {
            initWebgl()
            initShader()
            initBuffer()
            draw()
        }
        // 初始化webgl 函数
        const initWebgl = () => {
            webglDiv = document.getElementById("webglBox4")
            webgl = webglDiv.getContext("webgl")
            // 开启片元的颜色合成功能
            webgl.enable(webgl.BLEND);
            // 设置片元的合成方式
            webgl.blendFunc(webgl.SRC_ALPHA, webgl.ONE_MINUS_CONSTANT_ALPHA);
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
         
        }
        // 绘制
        const draw = () => {
            webgl.clearColor(0.0, 0.0, 0.0, 1.0);
            webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
            webgl.drawArrays(webgl.POINTS, 0,3);
        }
         // 获取着色器中的 attribute 变量
       
        const render = () => {
            const a_Position = webgl.getAttribLocation(webgl.program, 'a_Position');
            const a_PointSize = webgl.getAttribLocation(webgl.program, 'a_PointSize');

            // 获取 uniform 变量
            const u_FragColor = webgl.getUniformLocation(webgl.program, 'u_FragColor');
            webgl.clear(webgl.COLOR_BUFFER_BIT);
            points.value.forEach(point => {
                webgl.vertexAttrib2f(a_Position, point.x, point.y);
                webgl.vertexAttrib1f(a_PointSize, point.size);
                const { r, g, b, a } = point.color;
                const arr = new Float32Array([r, g, b, a]);
                webgl.uniform4fv(u_FragColor, arr);
                webgl.drawArrays(webgl.POINTS, 0, 1);
            })
        }
        const onClick = (event: MouseEvent) => {
            const { clientX, clientY } = event;

            const { left, top, height, width } = webglDiv.getBoundingClientRect();

            const [cssX, cssY] = [clientX - left, clientY - top];

            // WebGL 的坐标原点在画布中心，canvas 里面则是左上角
            const [halfWidth, halfHeight] = [width / 2, height / 2];

            // WebGL 里面的一个单位代表画布的宽或高的一半，canvas 里面则是代表一个像素
            const [xBaseCenter, yBaseCenter] = [
            cssX - halfWidth,
            -(cssY - halfHeight), // WebGL Y 轴方向与 canvas 也是相反的
            ];

            // 解决坐标基底差异
            const [x, y] = [xBaseCenter / halfWidth, yBaseCenter / halfHeight];

            points.value.push({
            x,
            y,
            size: Math.random() * 30,
            color: {
                r: Math.random(),
                g: Math.random(),
                b: Math.random(),
                a: Math.random(),
            }
            });
            render();
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
            onClick,
        }
    }
})
</script>
<style scoped lang="scss"></style>
   