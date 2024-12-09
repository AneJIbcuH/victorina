<script setup lang="ts">
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/UI/Button/Button.vue'
import { Answer } from '@/models/models'

const { currentNumQuestion, questions, score } = storeToRefs(useStore())
const router = useRouter()
const currentQuestion = computed(
  () => questions.value[currentNumQuestion.value - 1]
)
const answers = ref<Answer[]>(currentQuestion.value.answers)

watchEffect(() => (answers.value = currentQuestion.value.answers))

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
    }, 1500)
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
      }, 1500)
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
      <div class="question-btns" v-if="!answers[0].image">
        <Button
          v-for="(answer, idx) in answers"
          @click="() => check(answer, idx)"
          :key="answer.id"
          :color="computedColor(answer)"
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
@import './Question.module.scss';
</style>
