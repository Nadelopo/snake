import { getCanvasOptions } from '@/utils/getCanvas'
import type { Ref } from 'vue'

export class Renderer {
  cellSize: number
  canvas: Ref<HTMLCanvasElement | null>

  constructor(canvas: Ref<HTMLCanvasElement | null>, cellSize: number) {
    this.cellSize = cellSize
    this.canvas = canvas
  }

  drawGrid = () => {
    const { canvas, ctx } = getCanvasOptions(this.canvas)

    ctx.fillStyle = '#1c1c1c'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  drawSnake = (body: { x: number; y: number }[]) => {
    const ctx = this.canvas.value?.getContext('2d')
    if (!ctx) return

    body.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? 'lime' : 'green'
      ctx.fillRect(segment.x + 1, segment.y + 1, this.cellSize - 2, this.cellSize - 2)
    })
  }
}
