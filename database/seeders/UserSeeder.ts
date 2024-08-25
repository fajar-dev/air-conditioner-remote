import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeedeer extends BaseSeeder {
  public async run() {
    const users = [
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: 'password',
        role: 'superadmin',
      },
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin',
      },
    ]

    await User.createMany(users)
  }
}
