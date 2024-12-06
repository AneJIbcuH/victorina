import { Question } from '@/models/models'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('victorina', () => {
  const currentNumQuestion = ref<number>(1)
  const questions = ref<Question[]>([])
  const score = ref<number>(0)

  function getData() {
    axios.get('https://viktorins-api.itlabs.top/api/questions').then((resp) => {
      questions.value = resp.data
      console.log(resp.data)
    })
  }

  return {
    currentNumQuestion,
    questions,
    score,
    getData
  }
})
