import { Anchor } from './Anchor'

const DefaultConfig = {
  fill: 'orange',
  strokeWidth: 0,
}

export class IoAnchor extends Anchor {
  constructor(config, stage) {
    super({
      ...DefaultConfig,
      ...config,
    }, stage)
  }
}

IoAnchor.prototype.className = 'IoAnchor'
