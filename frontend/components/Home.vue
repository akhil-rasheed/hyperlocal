<template>
  <div
    class="bg-black w-full flex flex-row h-screen justify-center overflow-auto"
  >
    <div class="w-1/2 flex flex-col items-center">
      <div class="container noselect mt-12">
        <div class="canvas">
          <div class="tracker tr-1"></div>
          <div class="tracker tr-2"></div>
          <div class="tracker tr-3"></div>
          <div class="tracker tr-4"></div>
          <div class="tracker tr-5"></div>
          <div class="tracker tr-6"></div>
          <div class="tracker tr-7"></div>
          <div class="tracker tr-8"></div>
          <div class="tracker tr-9"></div>
          <div class="tracker tr-10"></div>
          <div class="tracker tr-11"></div>
          <div class="tracker tr-12"></div>
          <div class="tracker tr-13"></div>
          <div class="tracker tr-14"></div>
          <div class="tracker tr-15"></div>
          <div class="tracker tr-16"></div>
          <div class="tracker tr-17"></div>
          <div class="tracker tr-18"></div>
          <div class="tracker tr-19"></div>
          <div class="tracker tr-20"></div>
          <div class="tracker tr-21"></div>
          <div class="tracker tr-22"></div>
          <div class="tracker tr-23"></div>
          <div class="tracker tr-24"></div>
          <div class="tracker tr-25"></div>
          <div id="card">
            <img src="~/assets/img/logo.png" />
          </div>
        </div>
      </div>
      <div class="w-full">
        <GMapMap
          :center="{
            lat: this.location.latitude,
            lng: this.location.longitude,
          }"
          :zoom="15"
          :options="options"
          style="width: 800px; height: 300px; margin: auto"
          :disableDefaultUI="true"
        >
          <GMapMarker
            :position="{
              lat: this.location.latitude,
              lng: this.location.longitude,
            }"
            :clickable="true"
            :draggable="true"
          >
          </GMapMarker>
        </GMapMap>

        <div class="px-12 flex flex-col">
          <v-text-field
            variant="outlined"
            color="teal"
            v-model="this.postData"
          ></v-text-field>
          <v-btn color="teal" @click="postButtonClicked">Announce nearby</v-btn>
        </div>
      </div>
    </div>

    <div class="w-2/4 flex flex-col py-12 h-full bg-black">
      <v-card>
        <v-tabs
          v-model="tab"
          bg-color="black"
          color="teal"
          stacked
          align-tabs="center"
          centered
        >
          <v-tab value="tab-1"> Nearby </v-tab>

          <v-tab value="tab-2"> Community </v-tab>
        </v-tabs>
      </v-card>
      <div
        v-if="tab == 'tab-1'"
        class="rounded-xl flex flex-col items-center py-10"
      >
        <div
          v-for="post in posts"
          class="panel-right flex flex-col rounded-sm p-4 w-full m-4"
        >
          <div class="mb-4">
            <span class="font-bold text-2xl">{{ post.title }}</span
            ><span class="px-8 float-right font-extralight text-teal-400">{{
              post.creator
            }}</span>
            <v-divider></v-divider>
          </div>
          <p>{{ post.desc }}</p>
        </div>
      </div>
      <div
        v-else
        class="rounded-xl flex flex-col py-10 justify-center items-center px-4"
      >
        <svg-icon type="mdi" :path="path" size="300" color="white"></svg-icon>
        <p class="font-bold text-xl">You are not part of a community yet</p>
        <div class="m-8 flex flex-row">
          <div class="mx-6">
            <v-btn variant="outlined" large color="teal"
              >Join a community</v-btn
            >
          </div>
          <div class="mx-6">
            <v-btn variant="outlined" large color="teal"
              >Create community</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccountGroupOutline } from "@mdi/js";
const API_URL = `https://hyperlocal-backend.fly.dev/api`;
export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiAccountGroupOutline,
      tab: "tab-1",
      location: {
        latitude: "",
        longitude: "",
      },
      postData: "",
      posts: [],
      openedMarkerID: null,
      center: { lat: 48.8773406, lng: 2.327774 },
      options: {
        mapId: "611b6a559ee275bd", //here comes your map id
        zoomControl: false,

        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      },
    };
  },
  created() {
    // fetch on init
    this.fetchData();
  },
  mounted() {
    this.fetchLocation();
  },
  methods: {
    async fetchData() {
      const url = `${API_URL}/getAll`;
      const fetchedPosts = await (await fetch(url)).json();
      this.posts = fetchedPosts.data.slice(-5).reverse();
      console.log("fetching done");
    },

    fetchLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },

    async postButtonClicked() {
      const postSubmitData = {
        title: "testTitle",
        desc: this.postData,
        longitude: this.location.longitude,
        latitude: this.location.latitude,
      };

      axios
        .post(`${API_URL}/post-news`, postSubmitData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      await this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
/*for right panel, glassmorphism*/
.panel-right {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
}

/*for hyperlocal card :<*/
.container {
  position: relative;
  width: 500px;
  height: 254px;
  transition: 200ms;
}

.container:active {
  width: 180px;
  height: 245px;
}

#card {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: 700ms;
}

.subtitle {
  transform: translateY(160px);
  color: rgb(134, 110, 221);
  text-align: center;
  width: 100%;
}

.title {
  opacity: 0;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out-out;
  transition-delay: 100ms;
  position: absolute;
  font-size: x-large;
  font-weight: bold;
}

.tracker:hover ~ #card .title {
  opacity: 1;
}

#prompt {
  bottom: 8px;
  left: 12px;
  z-index: 20;
  font-size: 20px;
  font-weight: bold;
  transition: 300ms ease-in-out-out;
  position: absolute;
  max-width: 110px;
  color: rgb(255, 255, 255);
}

.tracker {
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
}

.tracker:hover {
  cursor: pointer;
}

.tracker:hover ~ #card #prompt {
  opacity: 0;
}

.tracker:hover ~ #card {
  transition: 300ms;
  filter: brightness(1.1);
}

.container:hover #card::before {
  transition: 200ms;
  content: "";
  opacity: 80%;
}

.canvas {
  perspective: 800px;
  inset: 0;
  z-index: 200;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "tr-1 tr-2 tr-3 tr-4 tr-5"
    "tr-6 tr-7 tr-8 tr-9 tr-10"
    "tr-11 tr-12 tr-13 tr-14 tr-15"
    "tr-16 tr-17 tr-18 tr-19 tr-20"
    "tr-21 tr-22 tr-23 tr-24 tr-25";
}

#card::before {
  content: "";
  background: linear-gradient(
    43deg,
    rgb(0, 0, 0) 0%,
    rgb(75, 182, 159) 76%,
    rgb(0, 0, 0) 100%
  );
  filter: blur(2rem);
  opacity: 30%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  transition: 100ms;
}

.tr-1 {
  grid-area: tr-1;
}

.tr-2 {
  grid-area: tr-2;
}

.tr-3 {
  grid-area: tr-3;
}

.tr-4 {
  grid-area: tr-4;
}

.tr-5 {
  grid-area: tr-5;
}

.tr-6 {
  grid-area: tr-6;
}

.tr-7 {
  grid-area: tr-7;
}

.tr-8 {
  grid-area: tr-8;
}

.tr-9 {
  grid-area: tr-9;
}

.tr-10 {
  grid-area: tr-10;
}

.tr-11 {
  grid-area: tr-11;
}

.tr-12 {
  grid-area: tr-12;
}

.tr-13 {
  grid-area: tr-13;
}

.tr-14 {
  grid-area: tr-14;
}

.tr-15 {
  grid-area: tr-15;
}

.tr-16 {
  grid-area: tr-16;
}

.tr-17 {
  grid-area: tr-17;
}

.tr-18 {
  grid-area: tr-18;
}

.tr-19 {
  grid-area: tr-19;
}

.tr-20 {
  grid-area: tr-20;
}

.tr-21 {
  grid-area: tr-21;
}

.tr-22 {
  grid-area: tr-22;
}

.tr-23 {
  grid-area: tr-23;
}

.tr-24 {
  grid-area: tr-24;
}

.tr-25 {
  grid-area: tr-25;
}

.tr-1:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-2:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-3:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-4:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-5:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg);
}

.tr-6:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-7:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-8:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-9:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-10:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-11:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-12:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-13:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}

.tr-14:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg);
}

.tr-15:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg);
}

.tr-16:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-17:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-18:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-19:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-20:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-21:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-22:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-23:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-24:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-25:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg);
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
									supported by Chrome, Edge, Opera and Firefox */
}
.gmnoprint a,
.gmnoprint span {
  display: none;
}
.gmnoprint div {
  background: none !important;
}
#GMapsID div div a div img {
  display: none;
}

.gm-style-cc {
  display: none;
}

a[href^="http://maps.google.com/maps"],
a[href^="https://maps.google.com/maps"],
a[href^="https://www.google.com/maps"]
{
  display: none !important;
}
.gm-bundled-control .gmnoprint {
  display: block;
}
.gmnoprint:not(.gm-bundled-control) {
  display: none;
}
</style>
