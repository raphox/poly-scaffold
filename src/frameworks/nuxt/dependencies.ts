const piniaNuxtVersion = "^0.10.1";
const vueRouterVersion = "^4.5.0";
const zodVersion = "3.24.2";

export const getDependenciesVersionsToInstall = () => ({
  "@pinia/nuxt": piniaNuxtVersion,
  "vue-router": vueRouterVersion,
  zod: zodVersion,
});
