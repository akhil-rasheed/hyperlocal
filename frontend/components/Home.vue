<template>
  <div
    class="bg-black w-full h-screen flex flex-row items-center justify-center"
  >
    <img src="~/assets/img/logo.png" />
    <div
      class="bg-teal-900 w-3/4 h-full rounded-xl flex flex-col items-center p-8"
    >
      <q-btn
        rounded
        outlined
        color="black"
        size="large"
        label="Announce something"
        @click="locatorButtonPressed"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: "",
    };
  },
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
