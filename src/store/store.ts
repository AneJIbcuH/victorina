import { Question } from '@/models/models.ts'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('victorina', () => {
  const currentNumQuestion = ref<number>(1)
  const questions = ref<Question[]>([])
  const score = ref<number>(0)
  const url = window.API

  function getData() {
    axios.get(`${url}/api/questions`).then((resp) => {
      questions.value = resp.data
      console.log(resp.data)
    })
  }

  return {
    currentNumQuestion,
    questions,
    score,
    getData,
  }
})
