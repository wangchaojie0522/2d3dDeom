import { RouteRecordRaw } from 'vue-router';
// 主框架内显示的路由
export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component:  () => import('../App.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        redirect: '/home/homePage',
        component: () => import('../pages/home/Home.vue'),
        children: [
          {
            path: 'homePage',
            name: 'homePage',
            redirect: '/home/homePage/canvasBase',
            component: () => import('../pages/home/homePage/HomePage.vue'),
            children: [
                // canvas
                { path: 'canvasBase',
                  name: 'canvasBase',
                  component: () => import('../pages/home/canvas/Base.vue')
                },
                { path: 'canvasImgColor',
                  name: 'canvasImgColor',
                  component: () => import('../pages/home/canvas/ImgColor.vue')
                },
                { path: 'canvasScreenshot',
                  name: 'canvasScreenshot',
                  component: () => import('../pages/home/canvas/Screenshot.vue')
                },
                { path: 'canvasScreenRecord',
                  name: 'canvasScreenRecord',
                  component: () => import('../pages/home/canvas/ScreenRecord.vue')
                },
                { path: 'canvasImgFilter',
                  name: 'canvasImgFilter',
                  component: () => import('../pages/home/canvas/ImgFilter.vue')
                },
                { path: 'canvasVideoFilter',
                  name: 'canvasVideoFilter',
                  component: () => import('../pages/home/canvas/VideoFilter.vue')
                },
                { path: 'canvasOSD',
                  name: 'canvasOSD',
                  component: () => import('../pages/home/canvas/OSD.vue')
                },
                // webgl
                { path: 'webglPoint',
                  name: 'webglPoint',
                  component: () => import('../pages/home/webgl/Point.vue')
                },
                { path: 'webglLine',
                  name: 'webglLine',
                  component: () => import('../pages/home/webgl/Line.vue')
                },
                { path: 'webglPlane',
                  name: 'webglPlane',
                  component: () => import('../pages/home/webgl/Plane.vue')
                },
                { path: 'webglAsync',
                  name: 'webglAsync',
                  component: () => import('../pages/home/webgl/Async.vue')
                },
                { path: 'webglTexture',
                  name: 'webglTexture',
                  component: () => import('../pages/home/webgl/Texture.vue')
                },
                // three
                { path: 'threeDemo1',
                  name: 'threeDemo1',
                  component: () => import('../pages/home/three/Demo1.vue')
                },
                { path: 'threeDemo2',
                  name: 'threeDemo2',
                  component: () => import('../pages/home/three/Demo2.vue')
                },
                // cesium
                { path: 'cesiumDemo1',
                  name: 'cesiumDemo1',
                  component: () => import('../pages/home/cesium/Demo1.vue')
                },
                { path: 'cesiumDemo2',
                  name: 'cesiumDemo2',
                  component: () => import('../pages/home/cesium/Demo2.vue')
                },
              ]
          }
        ]
      },
    ],
  },
];

// 主框架外显示的路由
const frameOut = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/Login.vue'),
  }
];
const errorPage = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/login/404.vue'),
  },
];

export default [
  ...frameIn,
  ...frameOut,
  ...errorPage,
];