<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { Game } from './models/game'
import { Snake } from './models/snake'

const CELL_SIZE = 20

const canvasRef = useTemplateRef('canvas')

const snake = new Snake(canvasRef, CELL_SIZE)

const game = new Game({
  canvas: canvasRef,
  snake,
  cellSize: CELL_SIZE,
})

onMounted(() => {
  game.initializeCanvas()
})
</script>

<template>
  <div class="canvas-wrapper">
    <canvas id="game" ref="canvas"></canvas>
  </div>
  <div v-if="game.isGameOver.value" class="game-over-wrapper">
    <div style="text-align: center">
      <h1>Game Over</h1>
      <p>Score: {{ game.getScore() }}</p>
      <button @click="game.reset">Restart</button>
    </div>
  </div>
</template>

<style scoped>
.canvas-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  height: 100vh;
  width: 100vw;
}

#game {
  display: block;
}

.game-over-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
