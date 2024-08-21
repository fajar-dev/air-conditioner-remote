/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/register', 'AuthController.register').as('register')
  Route.post('/register', 'AuthController.registerSubmit').as('register.submit')

  Route.get('/verify/:token', 'AuthController.verify').as('verify')

  Route.get('/login', 'AuthController.login').as('login')
  Route.post('/login', 'AuthController.loginSubmit').as('login.submit')

  Route.get('/forget', 'AuthController.forget').as('forget')
  Route.post('/forget', 'AuthController.forgetSubmit').as('forget.submit')

  Route.get('/reset/:token/:email', 'AuthController.reset').as('reset')
  Route.post('/reset/:token/:email', 'AuthController.resetSubmit').as('reset.submit')
})
  .prefix('/auth')
  .middleware('guest')

Route.get('/auth/logout', 'AuthController.logout').as('logout').middleware('auth')

Route.get('/dashboard', 'Web/DashboardController.index').as('dashboard').middleware('auth')

Route.group(() => {
  Route.get('/profile', 'ProfilesController.index').as('profile')
  Route.post('/profile', 'ProfilesController.update').as('profile.update')

  Route.post('/change-password', 'ProfilesController.changePassword').as('profile.changePassword')
})
  .prefix('/user')
  .middleware('auth')

Route.post('/mqtt/publish', 'MqttsController.publish')
