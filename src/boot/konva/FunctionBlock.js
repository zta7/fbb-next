/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import { Factory } from 'konva/lib/Factory.js'
import { getStringValidator } from 'konva/lib/Validators'
import { get } from 'lodash'
import { Group } from 'konva/lib/Group'
import { Text } from 'konva/lib/shapes/Text'
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'
import { Anchor } from './Anchor.js'
import { EventAnchor } from './EventAnchor.js'
import { IoAnchor } from './IoAnchor.js'

export class FunctionBlock extends Group {
  constructor(config) {
    super(config)
    this.inputEvents = Array.from({ length: 10 }, (e, i) => ({ id: `${this.name()}.inputEvents.${i}`, text: `inputEvent-${i}` }))
    this.outputEvents = Array.from({ length: 15 }, (e, i) => ({ id: `${this.name()}.outputEvents.${i}`, text: `outputEvent-${i}` }))
    this.inputs = Array.from({ length: 10 }, (e, i) => ({ id: `${this.name()}.inputs.${i}`, text: `input-${i}` }))
    this.outputs = Array.from({ length: 15 }, (e, i) => ({ id: `${this.name()}.outputs.${i}`, text: `output-${i}` }))

    this.init()

    this.on('mousedown', (e) => {
      console.log(e)
    })

    this.on('dragmove', () => {
      this.find('Anchor').map((e) => e.fire('dragmove'))
    })
  }
  init() {
    let width = 200
    let y = 0
    // let nodes = []
    let borderPoints = []
    const border = new Line({
      points: [],
      stroke: 'red',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
      closed: true,
      fill: '#00D2FF',
    })
    this.add(border)
    const name = new Text({
      text: this.name(),
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      y: 0,
    })
    name.x(
      (width - name.width()) / 2,
    )
    y = name.height()
    this.add(name)
    borderPoints = [0, name.height(), width, name.height()]
    const rowMargin = 5
    // const columnMargin = 5
    const len1 = Math.max(this.inputEvents.length, this.outputEvents.length) || 0
    const rowHeight = 20
    for (let i = 0; i < len1; i += 1) {
      const inputEvent = get(this.inputEvents, i)
      const outputEvent = get(this.outputEvents, i)
      if (inputEvent) {
        const _anchor = new EventAnchor({ id: inputEvent.id, x: 0, y }, 'left-middle')
        const _text = new Text({
          text: inputEvent.text, x: _anchor.width() + rowMargin, y,
        })
        this.add(_anchor).add(_text)
      }
      if (outputEvent) {
        const _anchor = new EventAnchor({ id: outputEvent.id, y }, 'right-middle')
        _anchor.x(width - _anchor.width())
        const _text = new Text({
          text: outputEvent.text, y,
        })
        _text.x(_anchor.x() - _text.width() - rowMargin)
        this.add(_anchor).add(_text)
      }
      y += rowHeight
    }

    borderPoints.splice(0, 0, 0, y)
    borderPoints.splice(borderPoints.length, 0, width, y)

    const rect = new Rect({
      width: width * 0.9,
      height: 24,
      fill: 'green',
      y,
    })
    const label = new Text({
      text: this.label(),
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: 'white',
      y,
    })
    rect.x((width - rect.width()) / 2)
    label.x((width - label.width()) / 2)
    this.add(rect).add(label)

    borderPoints.splice(0, 0, 0, y + rect.height(), rect.x(), y + rect.height(), rect.x(), y)
    borderPoints.splice(borderPoints.length, 0, rect.x() + rect.width(), y, rect.x() + rect.width(), y + rect.height(), width, y + rect.height())

    y += rect.height()
    for (let i = 0; i < len1; i += 1) {
      const input = get(this.inputs, i)
      const output = get(this.outputs, i)
      if (input) {
        const _anchor = new IoAnchor({ id: input.id, x: 0, y }, 'left-middle')
        const _text = new Text({
          text: input.text, x: _anchor.width() + rowMargin, y,
        })
        this.add(_anchor).add(_text)
      }
      if (output) {
        const _anchor = new IoAnchor({ id: output.id, y }, 'right-middle')
        _anchor.x(width - _anchor.width())
        const _text = new Text({
          text: output.text, y,
        })
        _text.x(_anchor.x() - _text.width() - rowMargin)
        this.add(_anchor).add(_text)
      }
      y += rowHeight
    }

    borderPoints.splice(0, 0, 0, y)
    borderPoints.splice(borderPoints.length, 0, width, y)

    border.points(borderPoints)
    console.log(borderPoints)
  }
}

Factory.addGetterSetter(FunctionBlock, 'name', '', getStringValidator())
Factory.addGetterSetter(FunctionBlock, 'label', '', getStringValidator())

FunctionBlock.prototype.className = 'FunctionBlock'
