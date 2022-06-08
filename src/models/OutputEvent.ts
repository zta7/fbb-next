import { uid } from 'quasar'

export const schema = {
  label: 'required',
}

export class OutputEvent {
  readonly id: string = uid()
  label = ''
  inputs: string[] = []
  comment = ''

  constructor(data: Partial<OutputEvent> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<OutputEvent> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
