import { uid } from 'quasar'
import { Block } from './Block'

export class Folder {
  readonly id: string = uid()
  label = ''
  blocks: Block[]

  constructor(data: Partial<Folder> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Folder> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
