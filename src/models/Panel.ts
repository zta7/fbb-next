import { uid } from 'quasar'

export class Panel {
  readonly id: string = uid()
  data: object[]

  constructor(data: Partial<Panel> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Panel> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
