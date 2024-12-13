<script setup lang="ts">
import { provide, ref } from 'vue'
import AllyBtn from './AllyBtn.vue';


const screenshot = ref<string | null>(null)
const magnifierRef = ref<HTMLDivElement | null>(null)

const zoom = 2
const magnifierSize = 300
const screenWidth = (window as Window).innerWidth
const screenHeight = (window as Window).innerHeight

const toggleMagnifier = async () => {
	if (screenshot.value) {
		screenshot.value = null
		return
	}

	try {
		const response = await fetch('http://localhost:3000/screenshot')
		const json = await response.json()
		screenshot.value = json.image
	} catch (error) {
		console.error(error)
	}
}

const moveMagnifier = (e: MouseEvent | TouchEvent) => {
	if (!magnifierRef.value) return

	const magnifier = magnifierRef.value
	const halfSize = magnifierSize / 2
	const adjustedZoom = zoom

	let x, y

	if (e instanceof MouseEvent) {
		// Для мыши используем clientX и clientY
		x = e.pageX
		y = e.pageY
	} else if (e instanceof TouchEvent) {
		// Для тач-устройства используем changedTouches
		x = e.changedTouches[0].pageX
		y = e.changedTouches[0].pageY
	}

	x = Math.max(
		halfSize / adjustedZoom,
		Math.min(x!, screenWidth - halfSize / adjustedZoom),
	)
	y = Math.max(
		halfSize / adjustedZoom,
		Math.min(y!, screenHeight - halfSize / adjustedZoom),
	)

	magnifier.style.left = `${x - halfSize}px`
	magnifier.style.top = `${y - halfSize}px`
	magnifier.style.backgroundPosition = `-${x * adjustedZoom - halfSize}px -${y * adjustedZoom - halfSize}px`
}

provide('toggleMagnifier', toggleMagnifier)
</script>

<template>
	<div class="containers" @mousemove="moveMagnifier">
		<AllyBtn @toggleScreenshot="toggleMagnifier" />
		<slot />
		<div
			v-if="screenshot"
			@touchmove="moveMagnifier"
			ref="magnifierRef"
			class="magnifier"
			:style="{
				width: `${magnifierSize}px`,
				height: `${magnifierSize}px`,
				backgroundImage: `url(${screenshot})`,
				backgroundSize: `${screenWidth * zoom}px ${screenHeight * zoom}px`,
			}"
		/>
	</div>
</template>

<style scoped>
.containers {
	position: relative;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
}

.magnifier {
	position: absolute;
	border: 3px solid #000;
	border-radius: 50%;
	top: 0;
	left: 0;
	background-repeat: no-repeat;
	z-index: 4;
}
</style>
