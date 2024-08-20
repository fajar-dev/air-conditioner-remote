import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UserSeedeer extends BaseSeeder {
  public async run() {
    const superadminRole = await Role.query().where('name', 'Superdmin').firstOrFail()
    const adminRole = await Role.query().where('name', 'Admin').firstOrFail()
    const users = [
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: 'password',
        role_id: superadminRole.id,
      },
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'password',
        role_id: adminRole.id,
      },
    ]

    await User.createMany(users)
  }
}
