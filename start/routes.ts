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
  Route.get('/register', 'Web/AuthController.register').as('register')
  Route.post('/register', 'Web/AuthController.registerSubmit').as('register.submit')
  Route.get('/verify/:token', 'Web/AuthController.verify').as('verify')
  Route.get('/login', 'Web/AuthController.login').as('login')
  Route.post('/login', 'Web/AuthController.loginSubmit').as('login.submit')
  Route.get('/forget', 'Web/AuthController.forget').as('forget')
  Route.post('/forget', 'Web/AuthController.forgetSubmit').as('forget.submit')
  Route.get('/reset/:token/:email', 'Web/AuthController.reset').as('reset')
  Route.post('/reset/:token/:email', 'Web/AuthController.resetSubmit').as('reset.submit')
})
  .prefix('/auth')
  .middleware('guest')
Route.get('/auth/logout', 'Web/AuthController.logout').as('logout').middleware('auth')

Route.get('/dashboard', 'Web/DashboardController.index').as('dashboard').middleware('auth')

Route.group(() => {
  Route.get('/building', 'Web/MasterDataController.building').as('master-data.building')
  Route.post('/building', 'Web/MasterDataController.buildingStore').as('master-data.building.store')
  Route.post('/building/:id/update', 'Web/MasterDataController.buildingUpdate').as(
    'master-data.building.update'
  )
  Route.get('/building/:id/delete', 'Web/MasterDataController.buildingDestroy').as(
    'master-data.building.destroy'
  )
  Route.get('/room', 'Web/MasterDataController.room').as('master-data.room')
  Route.post('/room', 'Web/MasterDataController.roomStore').as('master-data.room.store')
  Route.post('/room/:id/update', 'Web/MasterDataController.roomUpdate').as(
    'master-data.room.update'
  )
  Route.get('/room/:id/delete', 'Web/MasterDataController.roomDestroy').as(
    'master-data.room.destroy'
  )
  Route.get('/item', 'Web/MasterDataController.item').as('master-data.item')
  Route.post('/item', 'Web/MasterDataController.itemStore').as('master-data.item.store')
  Route.post('/item/:id/update', 'Web/MasterDataController.itemUpdate').as(
    'master-data.item.update'
  )
  Route.get('/item/:id/delete', 'Web/MasterDataController.itemDestroy').as(
    'master-data.item.destroy'
  )
})
  .prefix('/master-data')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'Web/RemotesController.index').as('remote')
  Route.get('/:idBuilding', 'Web/RemotesController.building').as('remote.building')
  Route.get('/:idBuilding/:idRoom', 'Web/RemotesController.room').as('remote.room')
  Route.get('/:idBuilding/:idRoom/:idItem', 'Web/RemotesController.item').as('remote.item')
  Route.post('/:idBuilding/:idRoom/:idItem/swing', 'Web/RemotesController.itemSwing').as(
    'remote.item.swing'
  )
  Route.post('/:idBuilding/:idRoom/:idItem/up', 'Web/RemotesController.itemUp').as('remote.item.up')
  Route.post('/:idBuilding/:idRoom/:idItem/down', 'Web/RemotesController.itemDown').as(
    'remote.item.down'
  )
  Route.post('/:idBuilding/:idRoom/:idItem/time-reset', 'Web/RemotesController.itemTimeReset').as(
    'remote.item.time-reset'
  )
  Route.post('/:idBuilding/:idRoom/:idItem/time-set', 'Web/RemotesController.itemTimeSet').as(
    'remote.item.time-set'
  )
})
  .prefix('/remote')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'Web/UsersController.building').as('user')
  Route.post('/', 'Web/UsersController.Store').as('user.store')
  Route.post('/:id/update', 'Web/UsersController.Update').as('user.update')
  Route.get('/:id/delete', 'Web/UsersController.Destroy').as('user.destroy')
})
  .prefix('/user')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'Web/ProfilesController.index').as('profile')
  Route.post('/', 'Web/ProfilesController.update').as('profile.update')
  Route.post('/change-password', 'Web/ProfilesController.changePassword').as(
    'profile.changePassword'
  )
})
  .prefix('/profile')
  .middleware('auth')
