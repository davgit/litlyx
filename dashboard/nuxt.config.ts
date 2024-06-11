// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'node:url';

const gooleSignInConfig: any = {
  googleSignIn: {
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID
  }
}

export default defineNuxtConfig({
  colorMode: {
    preference: 'dark',
  },
  devtools: {
    enabled: false
  },
  pages: true,
  ssr: false,
  css: ['~/assets/scss/main.scss'],
  alias: {
    '@schema': fileURLToPath(new URL('../shared/schema', import.meta.url)),
    '@services': fileURLToPath(new URL('../shared/services', import.meta.url)),
    '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
    '@functions': fileURLToPath(new URL('../shared/functions', import.meta.url)),
  },
  runtimeConfig: {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    AI_ORG: process.env.AI_ORG,
    AI_PROJECT: process.env.AI_PROJECT,
    AI_KEY: process.env.AI_KEY,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET,
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_WH_SECRET: process.env.STRIPE_WH_SECRET,
    STRIPE_SECRET_TEST: process.env.STRIPE_SECRET_TEST,
    STRIPE_WH_SECRET_TEST: process.env.STRIPE_WH_SECRET_TEST,
    public: {
      PAYPAL_CLIENT_ID: ''
    }

  },
  nitro: {
    plugins: ['~/server/init.ts']
  },
  ...gooleSignInConfig,
  modules: ['@nuxt/ui', 'nuxt-vue3-google-signin'],
  devServer: {
    host: '0.0.0.0',
  },
})
