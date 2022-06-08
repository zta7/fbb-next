/* eslint-disable array-callback-return */
import { Group } from 'konva/lib/Group'
import { Text } from 'konva/lib/shapes/Text'
import { Anchor } from './Anchor.js'

export class FunctionBlock extends Group {
  constructor(config) {
    super(config)
    // const { width, height } = this.attrs

    const text = new Text({
      x: 0,
      y: 0,
      text: 'Hello',
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
    })

    const anchor1 = new Anchor({ id: '5' })

    this.add(anchor1).add(text)

    // this.on('xChange', () => {
    //   if (!this.isDragging()) this.find('Anchor').map((e) => e.fire('xChange'))
    // })
    // this.on('yChange', () => {
    //   if (!this.isDragging()) this.find('Anchor').map((e) => e.fire('yChange'))
    // })
    this.on('dragmove', () => {
      this.find('Anchor').map((e) => e.fire('dragmove'))
    })
  }
}
FunctionBlock.prototype.className = 'FunctionBlock'
