export type Car = {
  id: number
  brand: string
  model: string
  year: string
  mileage: string
  engine: string
  power: string
  price: string
  driveUnit: string
  transmission: string
  description: string
  photos: { img: string }[];
}

export type CarWithOutId = Omit<Car, 'id'>;

export type CarsState = {
  cars: Car[];
  error: string | undefined;
};

export type CarId = Car['id'];