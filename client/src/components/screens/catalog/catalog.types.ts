export type Car = {
  id: number
  brand: string
  model: string
  year: number
  mileage: number
  color: string
  liters: number
  wheel: string
  engine: string
  power: number
  price: number
  driveUnit: string
  transmission: string
  description: string
  photos: {
    img: string
  }[];
}

export type CarPhotos = Pick<Car, 'photos'>['photos'];

export type CarWithOutId = Omit<Car, 'id'> & {img: string;};

export type CarsState = {
  cars: Car[];
  error: string | undefined;
};

export type CarId = Car['id'];

export interface FiltersState {
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  brandFilter: string;
  modelFilter: string;
  engineFilter: string;
  transmission: string;
  driveUnit: string;
  minLiters: string;
  maxLiters: string;
  minMileage: string;
  maxMileage: string;
}