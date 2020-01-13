<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Primary msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import * as bingmaps from 'bingmaps';
import Primary from '@/components/Primary.vue';


export default {
  name: 'home',
  components: {
    Primary,
  },
};
</script>
