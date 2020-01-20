<template>
  <v-app>
    <v-container>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Yang Gang Assemble</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
    </v-container>
    <v-content style="padding-top:42px">
      <v-navigation-drawer
        v-model="drawer"
        :right="true"
        :height="400"
        absolute
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <a style="color: black">Messaging</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <a v-on:click="login = !login" style="color: black">Login</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view></router-view>
      <Login :dialog="login" v-on:dialog="login = false"></Login>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import Primary from './components/Primary.vue';
import Login from './views/Login.vue';

@Component({ components: { Login } })
export default class App extends Vue {
  drawer: boolean = false;
  login: boolean = false;
  mounted() {
    console.log(this.drawer);
    console.log('i am mounted');
  }
}
</script>
