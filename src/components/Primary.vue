<template>
  <div align="center">
    Hello World
    <div id="map" style="width: 100vw; height: 100vh;" />
  </div>
</template>

<script lang="ts">
import 'bingmaps';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import $Scriptjs from 'scriptjs';

@Component
export default class Primary extends Vue {
  mapid: string = '#map';
  map: Microsoft.Maps.Map | null = null;

  mounted() {
    $Scriptjs(
      'http://www.bing.com/api/maps/mapcontrol?callback=initMap&key=AnfGtNHs8hQ5nogVT8wtSPFwdgY_unSzIoZpHNc0DTpm1tBhRfekwa7Ld53H6hSe',
      () => {
        const location = new Microsoft.Maps.Location(51.50632, -0.12714);
        console.log(document.getElementById(this.mapid));
        console.log(this.mapid);
        this.map = new Microsoft.Maps.Map(this.mapid, {
          credentials:
            'AnfGtNHs8hQ5nogVT8wtSPFwdgY_unSzIoZpHNc0DTpm1tBhRfekwa7Ld53H6hSe',
          center: location,
          mapTypeId: Microsoft.Maps.MapTypeId.aerial,
          zoom: 10
        });
        console.log('ended');
      }
    );
  }

  @Watch('mapState.initMap')
  onMapLoaded() {
    console.log(this.mapid);
  }
}
</script>
