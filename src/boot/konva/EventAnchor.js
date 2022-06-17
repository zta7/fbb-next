import { Anchor } from './Anchor'

const DefaultConfig = {
  fill: 'green',
  strokeWidth: 0,
}

export class EventAnchor extends Anchor {
  constructor(config, stage) {
    super({
      ...DefaultConfig,
      ...config,
    }, stage)
  }
}

EventAnchor.prototype.className = 'EventAnchor'
