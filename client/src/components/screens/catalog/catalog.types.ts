export type Car = {
  id: number
  img: string
  brand: string
  model: string
  year: number
  mileage: number
  engine: string
  power: number
  price: number
  driveUnit: string
  transmission: string
  description: string
}

export type CarWithOutId = Omit<Car, 'id'>;

export type CarsState = {
  cars: Car[];
  error: string | undefined;
};

export type CarId = Car['id'];