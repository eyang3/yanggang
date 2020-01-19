<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

      <v-card-text>Hello World</v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close">I accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  @Prop()
  dialog: boolean = false;
  data = 'string';
  close() {
    this.$emit('dialog', false);
  }
  activated() {
    console.log(this.data);
  }
  mounted() {
    console.log(this.data);
    console.log(this.$route.query);
  }
}
</script>
