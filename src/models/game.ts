import { ref, type Ref } from 'vue'
import type { Snake } from './snake'
import { Renderer } from './renderer'
import { getCanvasOptions } from '@/utils/getCanvas'
import { Food } from './food'

type ConstructorParams = {
  canvas: Ref<HTMLCanvasElement | null>
  snake: Snake
  cellSize: number
}

export class Game {
  constructor({ canvas, snake, cellSize }: ConstructorParams) {
    this.canvasRef = canvas
    this.snake = snake
    this.$cellSize = cellSize
    this.#renderer = new Renderer(canvas, cellSize)
    this.#food = new Food(canvas, cellSize)
  }

  isGameOver = ref(false)

  #score = ref(0)
  getScore = () => {
    return this.#score.value
  }

  canvasRef: Ref<HTMLCanvasElement | null> = ref(null)
  snake: Snake
  #renderer: Renderer
  #interval = 0
  $cellSize: number
  #food: Food

  initializeCanvas = () => {
    const { canvas, ctx } = getCanvasOptions(this.canvasRef.value)

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const dpr = window.devicePixelRatio || 1

    const gameWidth = Math.floor(screenWidth / this.$cellSize) * this.$cellSize
    const gameHeight = Math.floor(screenHeight / this.$cellSize) * this.$cellSize

    canvas.width = gameWidth * dpr
    canvas.height = gameHeight * dpr

    canvas.style.width = `${gameWidth}px`
    canvas.style.height = `${gameHeight}px`

    ctx.scale(dpr, dpr)

    this.start()
  }

  start() {
    this.#interval = setInterval(() => {
      requestAnimationFrame(() => this.loop())
    }, 70)
  }

  loop() {
    this.#renderer.drawGrid()
    const isOk = this.snake.move()
    if (!isOk) {
      this.stop()
      clearInterval(this.#interval)
    }
    const isEating = this.snake.eatingFood(this.snake.getBody()[0], this.#food.getFoodPosition())
    if (isEating) {
      this.#food.setFoodPosition()
      this.#score.value++
    }
    this.#renderer.drawSnake(this.snake.getBody())
    this.#renderer.drawFood(this.#food.getFoodPosition())
  }

  reset() {
    this.snake.resetBody()
    this.isGameOver.value = false
    this.#score.value = 0
    this.start()
  }

  getInfo() {
    return {
      isGameOver: this.isGameOver.value,
      score: this.#score.value,
    }
  }

  stop() {
    this.isGameOver.value = true
  }
}
