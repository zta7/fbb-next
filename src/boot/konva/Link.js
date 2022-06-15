import { getStringValidator } from 'konva/lib/Validators'
import { Line } from 'konva/lib/shapes/Line'
import { Factory } from 'konva/lib/Factory.js'

const DefaultConfig = {
  points: [],
  stroke: 'steelblue',
  strokeWidth: 2,
  hitStrokeWidth: 4,
  lineCap: 'round',
  lineJoin: 'round',
  draggable: false,
  bezier: true,
}

export class Link extends Line {
  constructor(config, stage) {
    super({
      ...config,
      ...DefaultConfig,
    })
    this.stage = stage
    this.init()
  }
  _setEventListener() {
    // this.on('xChange yChange', (e) => {
    //   this.x(0)
    //   this.y(0)
    //   // this._updatePoints()
    // })
    // this.on('mouseover', () => {
    //   console.log([...this.points()])
    // })
    // this.on('mo')
    // this.fromItem.on('xChange yChange', () => {
    //   if (!this.isDragging()) this._updatePoints()
    // })
    this.fromItem.on('dragmove transform', () => {
      this._updatePoints()
    })
    // this.toItem.on('xChange yChange', () => {
    //   if (!this.isDragging()) this._updatePoints()
    // })
    this.toItem.on('dragmove transform', () => {
      this._updatePoints()
    })
  }
  // offEventListener() {
  //   this.fromItem.off('xChange yChange')
  //   this.toItem.off('xChange yChange')
  // }
  _updatePoints() {
    if (!this.fromItem && !this.toItem) return
    const fp = this.fromItem.cornerPosition()
    const tp = this.toItem.cornerPosition()
    // const k = (tp.y - fp.y) / (tp.x - fp.x)
    // const distance = Math.sqrt(
    //   (fp.x - tp.x) ** 2 + (fp.y - tp.y) ** 2,
    // )
    const curvature = 0.4
    const hx1 = fp.x + Math.abs(tp.x - fp.x) * curvature
    const hx2 = tp.x - Math.abs(tp.x - fp.x) * curvature

    this.points([
      fp.x,
      fp.y,
      hx1,
      fp.y,
      hx2,
      tp.y,
      tp.x,
      tp.y,
    ])
  }
  init() {
    const { from, to } = this.attrs
    const fromItem = this.stage.findOne(`#${from}`)
    const toItem = this.stage.findOne(`#${to}`)
    // console.log(fromItem)
    if (fromItem && toItem) {
      this.fromItem = fromItem
      this.toItem = toItem
      this._setEventListener()
      this._updatePoints()
    }
  }
}

Link.prototype.className = 'Link'

Factory.addGetterSetter(Link, 'from', '', getStringValidator())
Factory.addGetterSetter(Link, 'to', '', getStringValidator())
