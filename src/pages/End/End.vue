<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import Button from '@/components/UI/Button/Button.vue'

const { score, currentNumQuestion } = storeToRefs(useStore())
const router = useRouter()

const picture = computed(() => {
  if (score.value < 11) {
    return 'normal'
  } else if (score.value < 16) {
    return 'good'
  } else return 'great'
})
</script>

<template>
  <div class="end">
    <!-- <input type="text" v-model="score" /> -->
    <div class="end-bg">
      <img :src="`/end/${picture}.png`" alt="Загрузка..." />
    </div>
    <Button
      color="teal"
      class="end-btn-again"
      @click="router.push('/Victorina'), (score = 0), (currentNumQuestion = 1)"
      >Пройти заново</Button
    >
    <div
      class="end-text"
      :style="
        score > 15 ? { marginBottom: '293px' } : { marginBottom: '338px' }
      "
    >
      <span> {{ score }} / 20</span>
      <div class="end-text-congrat">
        Неплохо! Охрана природы — общее дело! <br />
        Продолжай изучать природу нашего края!
      </div>
    </div>
    <Button
      class="end-btn-complete"
      @click="router.push('/'), (score = 0), (currentNumQuestion = 1)"
      >Завершить викторину</Button
    >
  </div>
</template>

<style scoped>
@import './End.module.scss';
</style>
