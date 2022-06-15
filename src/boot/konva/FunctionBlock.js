/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import { Group } from 'konva/lib/Group'

import { Text } from 'konva/lib/shapes/Text'
import { Anchor } from './Anchor.js'

export class FunctionBlock extends Group {
  constructor(config) {
    super(config)
    this.label = 'FB1'
    this.inputEvents = Array.from({ length: 10 }, (e, i) => ({ id: `inputEvents${i}`, text: `inputEvent-${i}` }))
    this.outputEvents = Array.from({ length: 20 }, (e, i) => ({ id: `outputEvents${i}`, text: `outputEvent-${i}` }))

    this.init()

    // const _label = new Text({
    //   text: label,
    //   fontSize: 18,
    //   fontFamily: 'Calibri',
    //   fill: '#555',
    // })
    // y = _label.height()
    // this.add(_label)

    // // const anchorSize = { width: 10, height: 10 }
    // // const fontSize = 10

    // const box1 = [100, 200]
    // const textStyle = {
    //   fontSize: 12,
    //   offsetY: 1,
    // }
    // const anchorStyle = {
    //   width: 8,
    //   height: 8,
    // }
    // const rowMargin = 5
    // const columnMargin = 5
    // inputEvents.forEach((e, i) => {
    //   const _anchor = new Anchor({ ...anchorStyle, id: e.id, y: y + columnMargin * i }, 'left-middle')
    //   const _text = new Text({
    //     ...textStyle, text: e.text, x: _anchor.width() + rowMargin, y: y + columnMargin * i,
    //   })
    //   y += _anchor.height()
    //   const rowWidth = _text.x() + _text.width()
    //   if (rowWidth > box1[0]) box1[0] = rowWidth
    //   this.add(_anchor)
    //   this.add(_text)
    // })

    // this.add(group1)

    // y = _label.height()
    // outputEvents.forEach((e, i) => {
    //   const _text = new Text({ text: e.text, x: box1[0], y: y + columnMargin * i })
    //   const _anchor = new Anchor({ id: e.id, y: y + columnMargin * i, x: box1[0] + _text.width() + rowMargin }, 'left-middle')

    //   y += _anchor.height()
    //   this.add(_anchor)
    //   this.add(_text)
    // })

    // const anchor1 = new Anchor({ id: '5', y }, 'left-middle')

    // console.log(this.width(), this.height())

    this.on('dragmove', () => {
      this.find('Anchor').map((e) => e.fire('dragmove'))
    })
  }
  init() {
    let width
    let height
    const label = new Text({
      text: this.label,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
    })
    width = label.width()
    height = label.height()
    const rowMargin = 5
    const columnMargin = 5
    this.inputEvents.map((e, i) => {
      const anchor = new Anchor({ id: e.id }, 'left-middle')
      const text = new Text({ text: e.text })
      return []
    })
  }
}
FunctionBlock.prototype.className = 'FunctionBlock'
