import { getCanvasOptions } from '@/utils/getCanvas'
import type { Ref } from 'vue'

type DirectionKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

export class Snake {
  constructor(canvasRef: Ref<HTMLCanvasElement | null>, cellSize: number) {
    this.#canvasRef = canvasRef
    this.#CELL_SIZE = cellSize
    window.addEventListener('keydown', this.#handleKeyDown)
  }

  #canvasRef: Ref<HTMLCanvasElement | null>
  #CELL_SIZE = 20
  #initialBody = [
    { x: 540, y: 500 },
    { x: 520, y: 500 },
    { x: 500, y: 500 },
    { x: 480, y: 500 },
  ]

  #body = [...this.#initialBody]
  getBody() {
    return this.#body
  }

  #directions = {
    ArrowUp: { x: 0, y: -this.#CELL_SIZE },
    ArrowDown: { x: 0, y: this.#CELL_SIZE },
    ArrowLeft: { x: -this.#CELL_SIZE, y: 0 },
    ArrowRight: { x: this.#CELL_SIZE, y: 0 },
  }

  #currentDirection = { ...this.#directions.ArrowRight }

  #setDirection = (newDirection: { x: number; y: number }) => {
    this.#currentDirection.x = newDirection.x
    this.#currentDirection.y = newDirection.y
  }

  resetBody = () => {
    this.#body = [...this.#initialBody]
    this.#setDirection(this.#directions.ArrowRight)
  }

  #isColliding = (head: { x: number; y: number }) => {
    const { canvas } = getCanvasOptions(this.#canvasRef.value)
    return (
      head.x < 0 ||
      head.x > parseInt(canvas.style.width) - this.#CELL_SIZE ||
      head.y < 0 ||
      head.y > parseInt(canvas.style.height) - this.#CELL_SIZE
    )
  }

  #isOpposite = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    a.x + b.x === 0 && a.y + b.y === 0

  move = (): boolean => {
    const head = { ...this.#body[0] }
    head.x += this.#currentDirection.x
    head.y += this.#currentDirection.y
    if (this.#isColliding(head)) {
      return false
    }
    this.#body.unshift(head)
    this.#body.pop()
    return true
  }

  #grow = () => {
    const tail = { ...this.#body[this.#body.length - 1] }
    this.#body.push(tail)
  }

  eatingFood = (head: { x: number; y: number }, food: { x: number; y: number }) => {
    const isEating = head.x === food.x && head.y === food.y
    if (isEating) {
      this.#grow()
      return true
    }
    return false
  }

  #handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key as DirectionKey
    if (!this.#directions[key]) return

    const newDirection = this.#directions[key]
    if (!this.#isOpposite(newDirection, this.#currentDirection)) {
      this.#setDirection(newDirection)
    }
  }

  destroy = () => {
    window.removeEventListener('keydown', this.#handleKeyDown)
  }
}
