export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://kit.fontawesome.com/ce82227861.js",
        crossorigin: "anonymous",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/style/main"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/localStorage.js", mode: "client" }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/i18n", "@nuxtjs/axios", "cookie-universal-nuxt"],
  axios: {
    baseURL: "https://fakestoreapi.com/products",
  },

  i18n: {
    locales: [
      { code: "ua", iso: "uk-UA", file: "ua.json", name: "Українська" },
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
    ],
    defaultLocale: "ua",
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "lang/",
    vueI18n: {
      fallbackLocale: "ua",
    },
    detectBrowserLanguage: {
      useCookie: false,
      alwaysRedirect: false,
    },
  },

  target: "static",
  /*
   ** Build configuration
   */
  cookies: {
    parseJSON: true,
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
