/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const carsPhotoData = [
      {
        img: '/img/car1.jpeg',
        carId: 1,
      },
      {
        img: '/img/car2.jpeg',
        carId: 2,
      },
      {
        img: '/img/car3.jpeg',
        carId: 3,
      },
      {
        img: '/img/car4.jpeg',
        carId: 4,
      },
      {
        img: '/img/car5.jpeg',
        carId: 5,
      },
      {
        img: '/img/car6.jpeg',
        carId: 6,
      },
      {
        img: '/img/car7.jpeg',
        carId: 7,
      },
      {
        img: '/img/car8.jpeg',
        carId: 8,
      },
      {
        img: '/img/car9.jpeg',
        carId: 9,
      },
      {
        img: '/img/car10.jpeg',
        carId: 10,
      },
      {
        img: '/img/car11.jpeg',
        carId: 11,
      },
      {
        img: '/img/car12.jpeg',
        carId: 12,
      },

    ];
    const cars = carsPhotoData.map((car) => ({
      ...car,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('PhotoCars', cars);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PhotoCars');
  },
};
