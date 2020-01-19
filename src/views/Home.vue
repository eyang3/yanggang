<template>
  <div class="home">
    <Primary mapid="map2" />
  </div>
</template>

<script>
// @ is an alias to /src
import * as bingmaps from 'bingmaps';
import Primary from '@/components/Primary.vue';

export default {
  name: 'home',
  components: {
    Primary
  }
};
</script>
