<template>
  <div align="center">
    Hello World
    <div id="map" style="width: 400px; height: 400px;" />
  </div>
</template>

<script lang="ts">
import 'bingmaps';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import $Scriptjs from 'scriptjs';

function test2() {
  console.log('done');
}

@Component
export default class Primary extends Vue {
  mapid: string = '#map';
  map: Microsoft.Maps.Map | null = null;

  mounted() {
    window.addEventListener('bingloaded', () => {
      this.map = new Microsoft.Maps.Map(this.mapid, {
        credentials:
          'AnfGtNHs8hQ5nogVT8wtSPFwdgY_unSzIoZpHNc0DTpm1tBhRfekwa7Ld53H6hSe',
        center: new Microsoft.Maps.Location(51.50632, -0.12714),
        mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
        zoom: 10
      });
    });
  }
}
</script>
