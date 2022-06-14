import { getStringValidator } from 'konva/lib/Validators'
import { Line } from 'konva/lib/shapes/Line'
import { Factory } from 'konva/lib/Factory.js'

const DefaultConfig = {
  points: [],
  stroke: 'rgba(29, 210, 175,0.75)',
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
    const fp = this.fromItem.cornerPosition()
    const tp = this.toItem.cornerPosition()
    const k = (tp.y - fp.y) / (tp.x - fp.x)
    const distance = Math.sqrt(
      (fp.x - tp.x) ** 2 + (fp.y - tp.y) ** 2,
    )
    console.log(k, distance)

    this.points([
      fp.x,
      fp.y,
      fp.x,
      fp.y + (distance / 2),
      tp.x,
      tp.y - (distance / 2),
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
