import { uid } from 'quasar'

export const schema = {
  label: 'required',
}

export class InputEvent {
  readonly id: string = uid()
  label = ''
  inputs: string[] = []
  comment = ''

  constructor(data: Partial<InputEvent> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<InputEvent> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
