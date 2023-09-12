export type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  liters: number;
  wheel: string;
  engine: string;
  power: number;
  price: number;
  driveUnit: string;
  transmission: string;
  description: string;
  photos: { img: string }[];
};

export type CarPhotos = Pick<Car, 'photos'>['photos'];

export type CarWithOutId = Omit<Car, 'id'> & {img: string;};

export type CarsState = {
  cars: Car[];
  error: string | undefined;
  status: string
};

export type CarId = Car['id'];