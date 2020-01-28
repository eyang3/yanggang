import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessCode: '',
    name: '',
    zip: '',
    messaging: '',
    longitude: 0,
    latitude: 0,
    imageurl: '',
  },
  mutations: {
    setImageUrl(state, imageurl) {
      state.imageurl = imageurl;
    },
    setAccessCode(state, accessCode) {
      state.accessCode = accessCode;
    },
    setName(state, name) {
      state.name = name;
    },
    setZip(state, zip) {
      state.zip = zip;
    },
    setMessaging(state, msg) {
      state.messaging = msg;
    }
  },
  actions: {
  },
  modules: {
  },
});
