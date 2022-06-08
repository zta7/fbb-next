import { uid } from 'quasar'

export class ECC {
  readonly id: string = uid()

  constructor(data: Partial<ECC> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<ECC> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
