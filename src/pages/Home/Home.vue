<script setup lang="ts">
import { useStore } from '@/store/store.ts'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import Button from '@/components/UI/Button/Button.vue'

const { getData } = useStore()
const router = useRouter()

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="home">
    <div class="home-logo">
      <img src="/title/logos.webp" alt="Загрузка..." />
    </div>
    <div class="home-title">Заповедный калейдоскоп</div>
    <Button class="home-btn" color="teal" @click="router.push('/victorina')">
      Начать викторину
    </Button>
    <div class="home-menu"></div>
  </div>
</template>

<style scoped>
@import './Home.module.scss';
</style>
