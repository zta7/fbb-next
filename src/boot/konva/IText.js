import { Text } from 'konva/lib/shapes/Text'
import { konvaInputRef } from 'src/App'
import { emitter } from 'boot/mitt'

export class IText extends Text {
  constructor(config) {
    super(config)
    this.on('dblclick dbltap', () => {
      this.hide()
      const textPosition = this.absolutePosition()
      const stage = this.getStage()
      const areaPosition = {
        x: stage.container().offsetLeft + textPosition.x,
        y: stage.container().offsetTop + textPosition.y,
      }
      emitter.emit('show:konvaInput', {
        style: {
          left: areaPosition.x,
          top: areaPosition.y,
          position: 'absolute',
          display: 'block',
        },
      })
    })
    console.log(konvaInputRef)
  }
}

IText.prototype.className = 'IText'
