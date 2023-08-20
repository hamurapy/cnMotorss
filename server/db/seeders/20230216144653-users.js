const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const usersData = [
      {
        id: 1,
        name: 'Vova',
        email: 'vova@mail.ru',
        password: await bcrypt.hash('test', 8),
        admin: true,
      },
      {
        id: 2,
        name: 'Jul',
        email: 'jul@mail.ru',
        password: await bcrypt.hash('test', 8),
        admin: false,
      },
    ];

    const rawPassword = process.env.DEMO_PASSWORD || 'test_password';
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    const users = usersData.map((user) => ({
      ...user,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};
