// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css", "vuetify/lib/styles/main.sass"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  env: {
    GOOGLEMAPSAPIKEY: process.env.GOOGLEMAPSAPIKEY,
  },
  build: {
    transpile: ["vuetify", "@fawmi/vue-google-maps"],
  },
  runtimeConfig: {
    public: { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY },
  },
  optimizeDeps: {
    include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
