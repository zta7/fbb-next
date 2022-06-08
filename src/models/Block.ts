import { uid } from 'quasar'

export const schema = {
  name: 'required',
  namespace: 'required',
  type: 'required',
}

export class Block {
  readonly id: string = uid()
  name = ''
  namespace = ''
  type = ''
  pin = 0

  constructor(data: Partial<Block> = {}) {
    Object.assign(this, data)
  }

  // togglePin() {
  //   this.pin = 1 - this.pin
  // }

  updateFields(fieldsToUpdate: Partial<Block> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
