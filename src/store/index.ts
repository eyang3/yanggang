import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface Location {
  longitude: number,
  latitude: number
}

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
    setLocation(state, payload: Location) {
      console.log(payload);
      state.longitude = payload.longitude;
      state.latitude = payload.latitude;
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
