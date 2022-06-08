import { uid } from 'quasar'

export const schema = {
  label: 'required',
  type: 'required',
  arrayLength: 'required|numeric|integer|min_value:1',
}

export class Temp {
  readonly id: string = uid()
  label = ''
  type = 'BOOL'
  arrayLength = 1
  initVals = ''
  comment = ''

  constructor(data: Partial<Temp> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Temp> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
