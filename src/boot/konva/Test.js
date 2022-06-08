/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-new */
import { Rect } from 'konva/lib/shapes/Rect'
import Chart from 'chart.js/auto'

const DefaultConfig = {
  width: 400,
  height: 400,
  draggable: true,
}

const events = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']

export class Test extends Rect {
  constructor(config) {
    super({
      ...config,
      ...DefaultConfig,
    })
    this._makeChart()

    this.on('widthChange heightChange', () => {
      if (this.chart && this.chart.canvas) { this._setCanvasSize() }
    })
    events.forEach((event) => {
      this.on(event, () => {
        if (this.chart && this.chart.canvas) {
          const { x: pointerX, y: pointerY } = this.getRelativePointerPosition()
          this.chart.canvas.dispatchEvent(
            new MouseEvent(event, {
              clientX: pointerX,
              clientY: pointerY,
            }),
          )
          this.clearCache()
        }
      })
    })
  }
  _setCanvasSize() {
    const width = this.width()
    const height = this.height()
    this.chart.resize(width, height)
  }
  _makeChart() {
    const ctx = document.createElement('canvas')

    const onProgress = () => {
      this.clearCache()
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', ' g'],
        datasets: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: [10, 20, 30, 40, 50, 60, 70],
        }],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
          onProgress,
        },
      },
    })

    this._setCanvasSize(ctx)
  }
  _sceneFunc(context) {
    const width = this.width()
    const height = this.height()
    context.rect(0, 0, width, height)
    if (this.chart) {
      context.drawImage(this.chart.canvas, 0, 0, width, height)
    }
    context.fillStrokeShape(this)
  }
}

Test.prototype.className = 'Test'
