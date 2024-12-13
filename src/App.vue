<script setup lang="ts">
import { useRoute } from 'vue-router'
import ScreenshotProvider from './components/Loupe/ScreenshotProvider.vue';

const route = useRoute()
</script>

<template>
  <div class="container">
    <ScreenshotProvider>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <transition name="my" mode="out-in">
          <suspense>
            <component :is="Component" :key="route.fullPath"></component>
          </suspense>
        </transition>
      </template>
    </RouterView>
  </ScreenshotProvider>
  </div>
</template>
