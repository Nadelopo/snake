import type { Ref } from 'vue'

export const getCanvasOptions = (canvasRef: Ref<HTMLCanvasElement | null>) => {
  const canvas = canvasRef.value
  if (!canvas) throw new Error('Canvas not found')

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Context not found')

  return { canvas, ctx }
}
