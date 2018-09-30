'use strict'

const { validateAll } = use('Validator')

const User = use('App/Models/User')
const randomString = require('random-string')

class RegisterController {
  async register({ request, response })
  {
    const validation = await validateAll(request.all(), {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required'
    })

    if (validation.fails())
    {
      return { success: false, errors: validation.messages()}
    }

    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password'),
      confirmation_token: randomString({ length: 40})
    })

    return { success: true, message: 'Registration successful!' }
  }
}

module.exports = RegisterController
