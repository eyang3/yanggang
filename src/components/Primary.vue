<template>
  <div>
    <v-navigation-drawer style="padding-top:0px" :height="400" absolute></v-navigation-drawer>
    <div align="center">
      <div v-bind:id="mapid" style="width: 800px; height: 800px;" />
    </div>
  </div>
</template>

<script lang="ts">
import 'bingmaps';
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';

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
          console.log('something is here');
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
