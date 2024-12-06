<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <Transition name="my">
      <RouterView></RouterView>
    </Transition>
  </div>
</template>
