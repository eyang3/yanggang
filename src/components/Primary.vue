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

  async mounted() {
    const promiseBing = new Promise((resolve, reject) => {
      window.addEventListener('bingloaded', () => {
        resolve(true);
      });
    });
    const promiseLocation = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve(pos);
        },
        err => {
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
    await Promise.all([promiseBing, promiseLocation]).then(values => {
      const result: any = values[1];
      const { longitude, latitude } = result.coords;
      this.$store.commit('setLocation', result.coords);
      this.map = new Microsoft.Maps.Map(`#${this.mapid}`, {
        credentials:
          'AnfGtNHs8hQ5nogVT8wtSPFwdgY_unSzIoZpHNc0DTpm1tBhRfekwa7Ld53H6hSe',
        center: new Microsoft.Maps.Location(latitude, longitude),
        mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
        zoom: 13
      });
      const pins = [
        new Microsoft.Maps.Pushpin(
          new Microsoft.Maps.Location(latitude, longitude),
          { color: '#f00' }
        )
      ];
      this.map.entities.push(pins);
    });
  }
}
</script>
