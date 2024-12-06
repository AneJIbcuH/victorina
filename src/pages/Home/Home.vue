<script setup lang="ts">
import { useStore } from '@/store/store'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
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
      <img src="/title/logos.png" alt="Загрузка..." />
    </div>
    <div class="home-title">Заповедный калейдоскоп</div>
    <Button class="home-btn" color="teal" @click="router.push('/victorina')"
      >Начать викторину</Button
    >
  </div>
</template>

<style scoped>
@import './Home.module.scss';
</style>
