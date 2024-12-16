<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import Button from '@/components/UI/Button/Button.vue'

const { score, currentNumQuestion, questions } = storeToRefs(useStore())
const { getData } = useStore()
const router = useRouter()

const picture = computed(() => {
  if (score.value < 11) {
    return {
      congratulation: 'normal',
      text: ` Неплохо! Охрана природы — общее дело! <br />
      родолжай изучать природу нашего края!`,
    }
  } else if (score.value < 16) {
    return {
      congratulation: 'good',
      text: ` Отлично! Ты уже многое знаешь о природе Ставрополья.<br /> Используй свои знания, чтобы сделать мир лучше!`,
    }
  } else
    return {
      congratulation: 'great',
      text: ` Поздравляю! Отличный результат! <br />
      Ты настоящий знаток и друг природы!`,
    }
})

function playAgain(str: string) {
  router.push(`${str}`)
  score.value = 0
  currentNumQuestion.value = 1
}

onMounted(() => getData())
</script>

<template>
  <div class="end">
    <!-- <input type="text" v-model="score" /> -->
    <div class="end-bg">
      <img :src="`/end/${picture.congratulation}.webp`" alt="Загрузка..." />
    </div>
    <Button color="teal" class="end-btn-again" @click="playAgain('/Victorina')"
      >Пройти заново</Button
    >
    <div
      class="end-text"
      :style="
        score > 15 ? { marginBottom: '293px' } : { marginBottom: '338px' }
      "
    >
      <span> {{ score }} / {{ questions.length }}</span>
      <div class="end-text-congrat">
        <div v-html="picture.text"></div>
      </div>
    </div>
    <Button class="end-btn-complete" @click="playAgain('/')"
      >Завершить викторину
    </Button>
  </div>
</template>

<style scoped>
@import './End.module.scss';
</style>
