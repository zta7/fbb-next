import { Rect } from 'konva/lib/shapes/Rect'

const DefaultConfig = {
  width: 10,
  height: 10,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 1,
}

export class Anchor extends Rect {
  constructor(config) {
    // 'left-top' 'middletop' 'right-top'
    super({
      ...DefaultConfig,
      ...config,
    })
  }
  cornerPosition() {
    const absolutePosition = this.absolutePosition()
    // const { width } = this.getClientRect()
    console.log(absolutePosition)
    return {
      x: absolutePosition.x,
      y: absolutePosition.y,
    }
  }
}

Anchor.prototype.className = 'Anchor'
