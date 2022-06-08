import { Input } from './Input'
import { Output } from './Output'
import { InputEvent } from './InputEvent'
import { OutputEvent } from './OutputEvent'
import { Internal } from './Internal'
import { Temp } from './Temp'

export class Interface {
  inputs: Input[] = []
  outputs: Output[] = []
  inputEvents: InputEvent[] = []
  outputEvents: OutputEvent[] = []
  internals: Internal[] = []
  temps: Temp[] = []

  constructor(data: Partial<Interface> = {}) {
    Object.assign(this, data)
  }
}
