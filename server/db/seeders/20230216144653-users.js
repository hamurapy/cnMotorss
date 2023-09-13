const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    const usersData = [
      {
        name: 'cnmotors',
        email: 'khan.iv1909@gmail.com',
        password: await bcrypt.hash('Khaniv19092001', 8),
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', usersData);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
