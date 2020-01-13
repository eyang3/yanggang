<template>
  <v-app>
    <v-container>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Yang Gang Assemble</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-app-bar>
    </v-container>
    <v-content style="padding-top:42px">
      <v-navigation-drawer style="padding-top:0px" :height="400" absolute></v-navigation-drawer>
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="true"
        :src="bg"
        :height="400"
        absolute
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <Primary />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Primary from './components/Primary.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Primary
  },

  data: () => ({
    //
  })
});
</script>
