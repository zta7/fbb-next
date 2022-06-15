import { Rect } from 'konva/lib/shapes/Rect'

const DefaultConfig = {
  width: 10,
  height: 10,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 1,
  shadowEnabled: false,
  shadowForStrokeEnabled: false,
}

export class Anchor extends Rect {
  constructor(config, position) {
    super({
      ...DefaultConfig,
      ...config,
    })
    // top left right bottom middle
    this.position = position || 'middle'
  }
  cornerPosition() {
    const {
      x, y, width, height,
    } = this.getClientRect({ relativeTo: this.getStage() })

    if (this.position === 'left-top') {
      return {
        x,
        y,
      }
    }
    if (this.position === 'left-middle') {
      return {
        x,
        y: y + height / 2,
      }
    }
    if (this.position === 'left-bottom') {
      return {
        x,
        y: y + height,
      }
    }

    if (this.position === 'middle-top') {
      return {
        x: x + width / 2,
        y: y + height / 2,
      }
    }

    if (this.position === 'middle-bottom') {
      return {
        x: x + width / 2,
        y: y + height,
      }
    }

    if (this.position === 'right-top') {
      return {
        x: x + width,
        y,
      }
    }

    if (this.position === 'right-middle') {
      return {
        x: x + width,
        y: y + height / 2,
      }
    }

    if (this.position === 'right-bottom') {
      return {
        x: x + width,
        y: y + height,
      }
    }

    // default return middle
    return {
      x: x + width / 2,
      y: y + height / 2,
    }
  }
}

Anchor.prototype.className = 'Anchor'
