<script setup lang="ts">

interface Props {
  color?: 'white' | 'teal' | 'red' | 'grass'
}

withDefaults(defineProps<Props>(), {
  color: 'white',
})
const emits = defineEmits(['click'])
</script>

<template>
  <button :class="['btn', `btn-${color}`]" @click="(e) => emits('click', e)">
    <slot></slot>
  </button>
</template>

<style scoped>
@import './Button.module.scss';
</style>
