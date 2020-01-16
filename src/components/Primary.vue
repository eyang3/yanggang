<template>
  <div align="center">
    Hello World {{mapid}}
    <div v-bind:id="mapid" style="width: 800px; height: 800px;" />
  </div>
</template>

<script lang="ts">
import 'bingmaps';
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';

function test2() {
  console.log('done');
}

@Component
export default class Primary extends Vue {
  @Prop() mapid!: string;

  map: Microsoft.Maps.Map | null = null;

  mounted() {
    window.addEventListener('bingloaded', () => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          this.map = new Microsoft.Maps.Map(`#${this.mapid}`, {
            credentials:
              'AnfGtNHs8hQ5nogVT8wtSPFwdgY_unSzIoZpHNc0DTpm1tBhRfekwa7Ld53H6hSe',
            center: new Microsoft.Maps.Location(lat, lon),
            mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
            zoom: 10
          });
        },
        err => {}
      );
    });
  }
}
</script>
