'use strict'

const { validateAll } = use('Validator')

const Company = use('App/Models/Company')
const Hash = use('Hash')

class CompanyController {

  async login({ request, auth, response })
  {
    const { email, password } = request.all()
    const company = await Company.query()
      .where('email', email)
      .first()

    if (company)
    {
      const passwordVerified = await Hash.verify(password, company.password)
      console.log(passwordVerified)
      if (passwordVerified)
      {
        const token = await auth.authenticator('company').attempt(email, password)
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
      password: 'required',
      location: 'required'
    })

    if (validation.fails())
    {
      return { success: false, errors: validation.messages()}
    }

    const company = await Company.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password'),
      location: request.input('location')
    })

    return { success: true, message: 'Registration successful!' }
  }
}

module.exports = CompanyController
