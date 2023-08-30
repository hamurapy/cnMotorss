/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const applicationData = [
      {
        name: 'Вовка',
      },
      {
        email: 'vovochka@mail.ru',
      },
      {
        phone: '89147200646',
      },
      {
        message: 'Джулия умница!!!',
      },
      {
        car: 'Honda Accord',
      },
    ];

    const applications = applicationData.map((application) => ({
      ...application,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Applications', applications);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Applications');
  },
};
