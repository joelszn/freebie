'use strict'

const User = use('App/Model')
const Hash = use('Hash')

class LoginController
{
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
}

module.exports = LoginController
