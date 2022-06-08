import { uid } from 'quasar'

export const schema = {
  label: 'required',
}

export class Algorithm {
  readonly id: string = uid()
  label = ''
  content = ''
  type = '' // lang

  constructor(data: Partial<Algorithm> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Algorithm> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
