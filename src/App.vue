<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent,ref} from 'vue';

export default defineComponent({
  setup(){
    const locale = ref()
    locale.value = zhCN
    return {
      locale,
    }
  }
})
</script>

<template>
<a-config-provider :locale="locale">
      <router-view />
</a-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgb(12, 31, 56);
}
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-size: 16px;
}

</style>
