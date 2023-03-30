<template>
  <div
    class="text-white text-lg font-bold font-sans flex flex-col w-full h-screen bg-black items-center justify-center"
  >
    <img src="~/assets/img/logo.png" />
    <n-button>Start experiencing nearby</n-button>
  </div>
</template>

<script>
import { NButton } from "naive-ui";
export default {
  components: {
    NButton,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
