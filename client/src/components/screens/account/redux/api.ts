import { Car, CarId } from './features/cars/types/Car';
import { PhotoCar } from './features/photo/types/PhotoCar';

export const addCarFetch = async (obj: FormData): Promise<Car> => {
  const res = await fetch('http://localhost:4000/api/cars', {
    method: 'POST',
    body: obj,
  });
  return res.json();
};

// export const loadPhotoCarFetch = async (): Promise<PhotoCar[]> => {
//   const res = await fetch('/api/photo');
//   return res.json();
// };
