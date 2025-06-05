export const getCanvasOptions = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) throw new Error('Canvas not found')

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Context not found')

  return { canvas, ctx }
}
