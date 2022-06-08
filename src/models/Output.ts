import { uid } from 'quasar'

export const schema = {
  label: 'required',
  type: 'required',
  arrayLength: 'required|numeric|integer|min_value:1',
}

export class Output {
  readonly id: string = uid()
  label = ''
  type = 'BOOL'
  arrayLength = 1
  initVals = ''
  comment = ''

  constructor(data: Partial<Output> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Output> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
