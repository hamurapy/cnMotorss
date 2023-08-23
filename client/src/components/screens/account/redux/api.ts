import { Car } from '@/components/screens/catalog/catalog.types';

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
