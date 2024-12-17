<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
// import IconEye from './IconEye.vue';

const route = useRoute()
const isActive = ref(false)
const emits = defineEmits<{
  toggleScreenshot: [void]
}>()
const isShow = ref(true)

const onClick = () => {
  isActive.value = !isActive.value
  emits('toggleScreenshot')
}
</script>

<template>
  <transition>
    <button
      v-if="isShow"
      @click="onClick"
      :class="['ally', { active: isActive }, route.path !=  '/' ? 'small' : '' ]"
      :style="route.path !=  '/' ? {width: '200px'} : ''"
    >
      <img :src="isActive ? '/eye2.webp' : '/eye1.webp'" alt="" />
      <span v-if="route.path === '/'">Для слабовидящих</span>
    </button>
  </transition>
</template>

<style scoped>
button {
  width: 842px;
  height: 200px;
  border-radius: 100px;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 60px;
  font-family: 'Inter';
  line-height: 120%;
  letter-spacing: -0.02em;
  background: var(--white);
  color: var(--dark-green);
  position: absolute;
  top: 80px;
  right: 80px;
  transition: all 0.3s linear;
  z-index: 5;

  img {
    width: 120px;
    height: 120px;
  }
}

.active {
  color: var(--white);
  background: var(--d-green);
}

.small {
  width: 200px;
  justify-content: center;
}

/* .ally {
  position: absolute;
  top: 80px;
  right: 80px;
  transition: all 0.3s linear;
  z-index: 5;

  svg {
    color: var(--teal-green);
    color: var(--white);
  }
}

.ally.active {
  color: var(--white);
  background: var(--d-green);

  svg {
    color: var(--white);
  }
} */
</style>
