<script setup lang="ts">
import { useStore } from '@/store/store.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Question from '@/components/Question/Question.vue'
import Button from '@/components/UI/Button/Button.vue'
import Modal from '@/components/UI/Modal/Modal.vue'

const { currentNumQuestion, questions } = storeToRefs(useStore())
const router = useRouter()
const show = ref(false)
</script>

<template>
  <div class="victorina">
    <!-- <div class="usestore">
      <Button color="teal" @click="currentNumQuestion--">&lArr;</Button>
      <Button color="teal" @click="currentNumQuestion++">&rArr;</Button>
    </div> -->
    <Transition name="fade">
      <Modal v-if="show" :is-open="show" @close="show = false"></Modal>
    </Transition>
    <div class="victorina-bg">
      <img :src="`/questionsBG/${currentNumQuestion}.webp`" alt="Задний фон" />
    </div>
    <Button class="victorina-btn-end" @click="show = !show">Завершить</Button>
    <Question />
    <Button
      @click="
        currentNumQuestion == questions.length
          ? router.push('/end')
          : currentNumQuestion++
      "
      class="victorina-btn-skip"
      >Пропустить</Button
    >
  </div>
</template>

<style scoped>
@import './Victorina.module.scss';
</style>
