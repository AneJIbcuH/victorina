<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Button from '@/components/UI/Button/Button.vue'
import { Answer } from '@/models/models'
import { useRouter } from 'vue-router'

const { currentNumQuestion, questions, score } = storeToRefs(useStore())
const router = useRouter()
const currentQuestion = computed(
  () => questions.value[currentNumQuestion.value - 1]
)

function check(
  e: { target: { classList: { add: (arg0: string) => void } } },
  answer: Answer
) {
  if (answer.correct) {
    e.target.classList.add('btn-grass')
    setTimeout(() => {
      score.value++
      currentNumQuestion.value == questions.value.length
        ? router.push('/end')
        : currentNumQuestion.value++
    }, 1500)
  } else {
    e.target.classList.add('btn-red')
    const buttons = document.querySelectorAll('.thisbtn')
    const element = currentQuestion.value.answers.find(
      (el) => el.correct === true
    )

    setTimeout(() => {
      for (let i = 0; i < buttons.length; i++) {
        const item = buttons[i]
        if (+item.id == element?.id) {
          item.classList.add('btn-grass')
          setTimeout(() => {
            currentNumQuestion.value == questions.value.length
              ? router.push('/end')
              : currentNumQuestion.value++
          }, 1500)
        }
      }
    }, 1500)
  }
}
</script>

<template>
  <div
    class="question"
    :class="currentNumQuestion > 10 ? 'question-right' : 'question-left'"
  >
    <TransitionGroup name="btns">
      <div class="question-title" key="title">
        <img src="/question.png" alt="" />
        Вопрос {{ currentNumQuestion }} / 20
      </div>
      <div class="question-text" key="description">
        {{ currentQuestion.description }}
      </div>
      <div class="question-btns" v-if="!currentQuestion.answers[0].image">
        <Button
          v-for="answer in currentQuestion.answers"
          @click="(e) => check(e, answer)"
          :key="answer.id"
          :id="answer.id"
          color="teal"
          class="thisbtn"
          >{{ answer.title }}</Button
        >
      </div>
      <div class="question-imgs" v-else>
        <div
          v-for="answer in currentQuestion.answers"
          :key="answer.id"
          class="question-imgs-picture"
        >
          <Button
            @click="(e) => check(e, answer)"
            :id="answer.id"
            class="thisbtn"
            color="teal"
          >
            {{ answer.title }}
          </Button>
          <img
            :src="`http://viktorins-api.itlabs.top/${answer.image}`"
            alt="Картинка"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
@import './question.module.scss';
</style>
