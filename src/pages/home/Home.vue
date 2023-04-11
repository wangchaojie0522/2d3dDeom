
<template>
    <dir class="headerBox">
        <NavHeader />
    </dir>
    <div class="homeBox">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, provide } from 'vue';
import storage from 'store';

export default defineComponent({
    components: {
     
    },
    setup() {
       
        const isRouterAlive = ref<boolean>(true)
        const reload = () => {
            isRouterAlive.value = false
            nextTick(() => (
                isRouterAlive.value = true
            ))
        }
        const userName = ref(storage.get("username"))
        provide('reloads', reload)
        return {
            isRouterAlive,
            userName
        }
    }
})
</script>
<style scoped lang="scss">
.headerBox{
    height: 80px;
    padding: 0;
    margin: 0;
}
.homeBox {
    height: calc(100% - 80px);
    overflow: auto;
    padding: 0;
    margin: 0;
}
</style>
   