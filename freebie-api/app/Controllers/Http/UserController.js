'use strict'


const { validateAll } = use('Validator')

const User = use('App/Models/User')
const Hash = use('Hash')
const randomString = require('random-string')


class UserController {
  async login({ request, auth, response })
  {
    const { email, password } = request.all()
    const user = await User.query()
      .where('email', email)
      .first()
    if (user)
    {
      const passwordVerified = await Hash.verify(password, user.password)

      if (passwordVerified)
      {
        const token = await auth.attempt(email, password)
        return token;
      }
    }

    return { message: 'Login failed!'}
  }

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

  async show({ response, params: { id } })
  {
    console.log("Hit")
    const user = await User.find(id)
    if (user)
    {
      response.json({
        data: user//{ username, email, donated, createdAt }
      })
    } else {

    }
  }

  async allUsers({ response })
  {
    console.log("Hit")
    const users = await User.all()
    console.log("oof", users)
    if(users)
    {
      response.json({
        data: users
      })
    }
  }
}

module.exports = UserController
