'use strict'

const Model = use('Model')
const Hash = use('Hash')

class Company extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (companyInstance) => {
      if (companyInstance.dirty.password) {
        companyInstance.password = await Hash.make(companyInstance.password)
      }
    })
  }

  static get hidden() {
    return ['password']
  }
  
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = Company
