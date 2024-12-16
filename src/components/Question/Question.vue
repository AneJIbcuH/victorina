<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/UI/Button/Button.vue'
import { Answer } from '@/models/models'

const url = window.API
const { currentNumQuestion, questions, score } = storeToRefs(useStore())
const router = useRouter()
const answers = ref<Answer[]>(
  questions.value[currentNumQuestion.value - 1].answers
)

watchEffect(
  () => (answers.value = questions.value[currentNumQuestion.value - 1].answers)
)

function computedColor(answer: Answer) {
  if (answer.check && answer.correct) {
    return 'grass'
  } else if (answer.check && !answer.correct) {
    return 'red'
  } else return 'teal'
}

function check(answer: Answer, idx: number) {
  answers.value[idx].check = true

  if (answer.correct) {
    setTimeout(() => {
      score.value++
      currentNumQuestion.value == questions.value.length
        ? router.push('/end')
        : currentNumQuestion.value++
    }, 500)
  } else {
    setTimeout(() => {
      answers.value.map((el) => {
        if (el.correct) {
          return (el.check = true)
        }
      })
      setTimeout(() => {
        currentNumQuestion.value == questions.value.length
          ? router.push('/end')
          : currentNumQuestion.value++
      }, 500)
    }, 500)
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
        <img src="/question.webp" alt="" />
        Вопрос {{ currentNumQuestion }} / {{ questions.length }}
      </div>
      <div class="question-text" key="description">
        {{ questions[currentNumQuestion - 1].description }}
      </div>
      <div class="question-btns" v-if="!answers[0].image">
        <Button
          v-for="(answer, idx) in answers"
          @click="() => check(answer, idx)"
          :key="answer.id"
          :color="computedColor(answer)"
          :style="
            answers.find((el) => el.check == true)?.check
              ? { pointerEvents: 'none' }
              : ''
          "
          >{{ answer.title }}</Button
        >
      </div>
      <div class="question-imgs" v-else>
        <div
          v-for="(answer, idx) in answers"
          :key="answer.id"
          class="question-imgs-picture"
        >
          <Button
            @click="() => check(answer, idx)"
            :color="computedColor(answer)"
            :style="
              answers.find((el) => el.check == true)?.check
                ? { pointerEvents: 'none' }
                : ''
            "
          >
            {{ answer.title }}
          </Button>

          <img :src="`${url + answer.image}`" alt="Картинка" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
@import './Question.module.scss';
</style>
