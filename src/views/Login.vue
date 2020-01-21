<template>
  <v-dialog v-model="mdialog" width="500">
    <v-card class="mx-auto">
      <v-card-title class="gray lighten" primary>User Settings</v-card-title>
      <v-card-text class="text--primary">
        <v-form ref="form" v-model="valid" :lazy-validation="true">
          <v-text-field v-model="name" label="Name" />
          <v-text-field v-model="zipcode" label="ZipCode" />
          <v-checkbox v-model="messaging" label="Allow Messaging" />
        </v-form>
        <div style="width:100%; dispaly: table;">
          <div style="display: table-row; width:350px">
            <div
              style="width: 250px; float: left"
              class="v-label theme--light"
            >Click Icon to Link With Reddit</div>
            <div style="width: 100px; float: right">
              <v-img
                style="cursor: pointer"
                v-on:click="authWithReddit"
                width="25"
                height="25"
                src="reddit.png"
              ></v-img>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="save">Confirm</v-btn>
        <v-btn color="primary" text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import Axios from 'axios';

@Component
export default class Login extends Vue {
  @Prop()
  dialog: boolean = false;
  mdialog: boolean = false;
  valid: boolean = true;
  name: String = '';
  zipcode: String = '';
  messaging: boolean = false;
  data = 'string';

  @Watch('dialog')
  matchDialog() {
    this.mdialog = this.dialog;
  }
  @Watch('mdialog')
  defaultClose() {
    if (!this.mdialog) {
      this.close();
    }
  }
  close() {
    this.$emit('dialog', false);
  }
  save() {
    this.mdialog = false;
    this.close();
  }
  activated() {
    console.log(this.data);
  }
  authWithReddit() {
    const clientid = process.env.VUE_APP_REDDIT;
    const redirectUrl = 'http://localhost:3000/getUser';
    const url = `https://www.reddit.com/api/v1/authorize?client_id=${clientid}`
                + `&response_type=code&redirect_uri=${redirectUrl}`
                + '&duration=temporary&scope=identity,account,mysubreddits&state=wee';
    window.open(url, '_self');
    console.log(this.data);
  }
}
</script>
