export const schema = {

}

export class Properties {
  version = ''
  applicationArea = ''
  describe: ''
  comment: ''

  constructor(data: Partial<Properties> = {}) {
    Object.assign(this, data)
  }

  updateFields(fieldsToUpdate: Partial<Properties> = {}) {
    Object.assign(this, fieldsToUpdate)
  }
}
