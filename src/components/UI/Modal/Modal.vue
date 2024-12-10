<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import PageOverlay from '../PageOverlay/PageOverlay.vue'
import Button from '../Button/Button.vue'

const { score, currentNumQuestion } = storeToRefs(useStore())

interface ModalEmits {
  (eventName: 'close'): void
}

// interface Props {
//   isOpen?: boolean
// }

const router = useRouter()
const emits = defineEmits<ModalEmits>()
// const props = defineProps<Props>()

function toHome() {
  router.push('/')
  score.value = 0
  currentNumQuestion.value = 1
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-enot">
        <img src="/enot.png" alt="" />
      </div>
      <Button @click="toHome" class="modal-btn">Завершить викторину</Button>
      <Button color="teal" class="modal-btn" @click="emits('close')"
        >Продолжить</Button
      >
    </div>
    <PageOverlay @on-click="emits('close')" />
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;

  &-content {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
    align-items: center;
  }

  &-enot {
    width: 1554px;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-content {
    position: relative;
    z-index: 6;
    border-radius: 80px;
    padding: 80px;
    width: 1886px;
    height: 692px;
    background: #f3f3f3;
  }

  &-btn {
    width: 843px;
    height: 152px;
    font-weight: 600;
    font-size: 59px;
  }
}
</style>
