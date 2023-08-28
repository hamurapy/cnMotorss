const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const usersData = [
      {
        name: 'admin',
        email: 'vova@mail.ru',
        password: await bcrypt.hash('123', 8),
        admin: true,
      },
    ];

    const rawPassword = process.env.DEMO_PASSWORD || 'testt';
    const saltRounds = Number(process.env.SALT_ROUNDS) || 8;
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
