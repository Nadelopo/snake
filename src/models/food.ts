import { getCanvasOptions } from '@/utils/getCanvas'
import type { Ref } from 'vue'

export class Food {
  constructor(canvasRef: Ref<HTMLCanvasElement | null>, cellSize: number) {
    this.#canvasRef = canvasRef
    this.#cellSize = cellSize
  }

  #cellSize: number
  #canvasRef: Ref<HTMLCanvasElement | null>

  #foodPosition = { x: 740, y: 700 }

  getFoodPosition = () => {
    return this.#foodPosition
  }

  setFoodPosition = () => {
    const { canvas } = getCanvasOptions(this.#canvasRef.value)
    const width = parseInt(canvas.style.width)
    const height = parseInt(canvas.style.height)

    const normalRandom = () => {
      let u = 0,
        v = 0
      while (u === 0) u = Math.random()
      while (v === 0) v = Math.random()
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    }

    const x = Math.round(width / 2 + normalRandom() * (width / 4))
    const y = Math.round(height / 2 + normalRandom() * (height / 4))

    this.#foodPosition = {
      x: Math.max(
        0,
        Math.min(width - this.#cellSize, Math.floor(x / this.#cellSize) * this.#cellSize),
      ),
      y: Math.max(
        0,
        Math.min(height - this.#cellSize, Math.floor(y / this.#cellSize) * this.#cellSize),
      ),
    }
  }
}
