<template>
  <div class="leftBox" >
    <template v-for="(item, index) of menuArrN">
      <template v-if="item.children">
        <!-- 有子菜单的 -->
        <div 
          :key="index"
          class="leftFontContainer"
          :class="{active: activeItemN.indexOf(item.path) > -1}"
          @click="menuExpend(item)">
          <i class="iconfont leftFont leftIcon" v-html="item.icon"></i>
          <span class="leftFont">{{item.label}}</span>
          <span  style="margin:-2px 10px 0 0;float: right;">
            <UpOutlined v-if="item.showFlag" />
            <DownOutlined v-else />
          </span>
        </div>
        <template v-if="item.showFlag">
          <div 
            v-for="(subItem, subIndex) of item.children"
            :key="subIndex"
            class="leftFontContainerChild"
            :class="{active: activeItemN === subItem.path}"
            @click="menuBtn(subItem)">
            <i class="iconfont leftFont leftIconChild" v-html="subItem.icon"></i>
            <span class="leftFont">{{subItem.label}}</span>
          </div>
        </template>  
      </template>
      <template v-else >
        <!-- 没有子菜单 -->
        <div 
          :key="index"
          class="leftFontContainer"
          :class="{active: activeItemN === item.path}"
          @click="menuBtn(item)">
          <i class="iconfont leftFont leftIcon" v-html="item.icon"></i>
          <span class="leftFont">{{item.label}}</span>
        </div>  
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref ,onMounted} from 'vue';
import { DownOutlined,UserOutlined, UpOutlined   } from '@ant-design/icons-vue';
import {useRoute,useRouter} from 'vue-router'
interface menuItem {
  label: string,
  path: string,
  showFlag: boolean,
  children: []
}

export default defineComponent({
  components: {
    DownOutlined,
    UserOutlined,
    UpOutlined,
  },
  props: {
    menuArr: {
      type: Array,
      required: true
    },
    activeItem: {
      type: String,
      required: true
    }
  },
  setup(props){
      let activeItemN = ref<string>("") 
      let menuArrN = ref<any[]>([]) 
      //路由
      const router = useRouter()
      const route = useRoute()
      // 获取当前URL激活的子组件
      const getNewItem = () => {
        activeItemN.value = route.path.split('/')[3] || props.activeItem
        menuArrN.value = props.menuArr
      }
      const menuBtn = (obj:any) => {
        activeItemN.value = obj.path;
        router.push({path: obj.path})
      }
      const menuExpend =  (obj:any) =>{
        obj.showFlag = !obj.showFlag
      }
      onMounted(getNewItem)
      
      return {
        activeItemN,
        menuArrN,
        // menuClick,
        menuBtn,
        menuExpend,
      }
  }
});
</script>
<style lang="scss" scoped>
 .leftBox {
  background:rgba(255, 255, 255, 1);
  box-shadow:2px 0px 10px 0px rgba(80,131,254,0.2);
  overflow-y: auto;
}
.leftFontContainer {
  text-align: left;
  height:40px;
  line-height: 40px;
  margin-bottom:3px;
  color:#303133;
}
.leftFontContainerChild {
  text-align: left;
  height:30px;
  line-height: 30px;
  margin-bottom:3px;
  color:#303133;
}
.leftFontContainer:hover {
  color:rgba(255, 255, 255, 1);
  background:#3A74FF;
  box-shadow:0px 4px 10px 0px rgba(58,116,255,0.5);
  cursor:pointer;
}
.leftFontContainer.active {
  color:rgba(255, 255, 255, 1);
  background:#3A74FF;
  box-shadow:0px 4px 10px 0px rgba(58,116,255,0.5);
}
.leftFontContainerChild:hover {
  color:rgba(255, 255, 255, 1);
  background:#3A74FF;
  box-shadow:0px 4px 10px 0px rgba(58,116,255,0.3);
  cursor:pointer;
}
.leftFontContainerChild.active {
  color:rgba(255, 255, 255, 1);
  background:#3A74FF;
  box-shadow:0px 4px 10px 0px rgba(58,116,255,0.3);
}
.leftFont {
  font-size:14px;
  font-weight:400;
  line-height:30px;
}
.leftFont:hover {
  cursor:pointer;
}
.leftIcon {
  margin:0px 9px 0 17px;
}
.leftIconChild {
  margin:0px 9px 0 27px;
}
</style>