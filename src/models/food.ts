import type { Ref } from 'vue'

export class Food {
  constructor(canvasRef: Ref<HTMLCanvasElement | null>, cellSize: number) {
    this.#canvasRef = canvasRef
    this.#CELL_SIZE = cellSize
  }

  #canvasRef: Ref<HTMLCanvasElement | null>
  #CELL_SIZE = 20
}
