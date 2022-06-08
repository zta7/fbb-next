import { uid } from 'quasar'

export const schema = {
  label: 'required',
  type: 'required',
  arrayLength: 'required|numeric|integer|min_value:1',
}

export class Input {
  readonly id: string = uid()
  label = ''
  type = 'BOOL'
  arrayLength = 1
  initVals = ''
  comment = ''

  constructor(data: Partial<Input> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Input> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
