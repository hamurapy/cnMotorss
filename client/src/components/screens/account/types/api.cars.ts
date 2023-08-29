import { Car, CarId } from '@/components/screens/catalog/catalog.types';

export async function loadCars(): Promise<Car[]> {
  const res = await fetch('http://localhost:4000/api/cars');
  return res.json();
}

export const addCarFetch = async (obj: FormData): Promise<Car> => {
  const res = await fetch('http://localhost:4000/api/cars', {
    method: 'POST',
    body: obj,
  });
  return res.json();
};

export const updateCarFetch = async (obj: FormData): Promise<Car> => {
    const res = await fetch(`http://localhost:4000/api/cars/${obj.get('id')}`, {
      method: 'PUT',
        body: obj,
    });
    return res.json();
  };

  export const deleteCarFetch = async (id: CarId): Promise<number> => {
    const res = await fetch(`http://localhost:4000/api/cars/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  };