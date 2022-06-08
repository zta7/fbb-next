import { Rect } from 'konva/lib/shapes/Rect'
import { Factory } from 'konva/lib/Factory.js'

const DefaultConfig = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  visible: false,
  fill: 'rgba(0,0,255,0.5)',
}

export class Selection extends Rect {
  constructor(config) {
    super({
      ...config,
      ...DefaultConfig,
    })
    this.selected = null // Transformer
    this.on('selectedChange')
  }
}

Factory.addGetterSetter(Selection, 'selected', '', null)

Selection.prototype.className = 'Selection'
