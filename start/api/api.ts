import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.post('/login', 'Api/AuthController.login')
    Route.post('/forgot-password', 'Api/AuthController.forgot')
  })
    .prefix('/auth')
    .middleware('guest')
  Route.get('/auth/logout', 'Api/AuthController.logout').middleware('auth')

  Route.group(() => {
    Route.post('/change-password', 'Web/ProfilesController.changePassword')
  })
    .prefix('/profile')
    .middleware('auth')
}
