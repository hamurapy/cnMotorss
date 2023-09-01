/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const applicationData = [
      {
        name: 'Вовка',
        email: 'vovochka@mail.ru',
        phone: '89147200646',
        message: 'Джулия умница!!!',
        carID: 1,
        car: 'Honda',
        carPhoto: '/img/car1.jpeg',
        year: 2023,
        color: 'red',
        mileage: 2,
        wheel: 'left',
        engine: 'dvigatel',
        driveUnit: 'front',
        transmission: 'avto',
        price: '15',
        status: 'Новая',
        createdAt: new Date(),
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
