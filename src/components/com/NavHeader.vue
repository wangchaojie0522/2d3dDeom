<template>
    <div class="navbar-header">
        <img src="../../assets/imgs/navBg.png" style="width: 100%;height: 80px" alt="">
        <div class="nav-logo">
            <span class="home-logo">{{ logoName }}</span>
        </div>
        <div class="nav-title">
            <span class="home-title">{{ deviceName }}</span>
        </div>
        <div class="nav-user">
           
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, onBeforeMount } from 'vue';
import { DownOutlined, FlagOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router'
import storage from 'store';

interface MenuInfo {
    key: string;
    keyPath: string[];
    item: any;
    domEvent: MouseEvent;
}
export default defineComponent({
    components: {
        DownOutlined,
        UserOutlined
    },
    props: {
        userName: {
            type: String,
            required: false
        }
    },
    setup(props) {
        const activeItem = ref('')
        const userName = ref('admin')
        const logoName = ref("")
        const deviceName = ref("ThreeDemo")
       
        return {
           
            activeItem,
            userName,
            logoName,
            deviceName,
        }
    }
});
</script>
<style scoped lang="scss">
.navbar-header {
    height: 80px;
    line-height: 80px;
    position: relative;
    padding: 0px 20px;
}

.nav-title {
    position: absolute;
    width: calc(100% - 70px);
    text-align: center;
    height: 54px;
    line-height: 54px;
    // left: 0;
    // right: 0;
    top: 10px;
    // bottom: 0;
    color: rgb(178, 202, 238);
    font-family: Noto Sans SC;
    font-size: 36px;
    font-weight: 700;
    line-height: 53px;
    letter-spacing: 0px;
    // text-align: left;
    // z-index: 9;
}

.nav-user {
    position: absolute;
    height: 20px;
    line-height: 20px;
    right: 60px;
    top: 18px;
    color: rgb(178, 202, 238);
    padding-right: 10px;
    font-size: 18px;
    vertical-align: middle;

    a {
        font-size: 18px;
        margin-top: 10px;
    }
}
.nav-logo {
    position: absolute;
    left: 120px;
    top: -10px;
    color: rgb(178, 202, 238);
    padding-right: 10px;
    font-size: 18px;
    vertical-align: middle;

}
</style>