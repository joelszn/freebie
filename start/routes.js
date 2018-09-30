'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('/user/register', 'UserController.register')
  Route.post('/user/login', 'UserController.login')
  Route.post('/company/login', 'CompanyController.login')
  Route.post('/company/register', 'CompanyController.register')
  Route.get('/user/register', ({ request }) => {
    return {
      message: 'hit'
    }
  })
}).prefix('auth')

Route.get('/user/:id', 'UserController.show')
Route.get('/paypal/ctkn', 'BraintreeController.getClientToken')
