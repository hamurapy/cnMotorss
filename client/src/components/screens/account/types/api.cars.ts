import { Car, CarId } from '@/components/screens/catalog/catalog.types';

export const loadCarsFetch = async ():Promise<Car[]> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/upd`);
  const data = await res.json();
  
  return data
}

export const addCarFetch = async (obj: FormData): Promise<Car> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/cars`, {
    method: 'POST',
    body: obj,
  });
  const data = await res.json();
  return data
};

export const updateCarFetch = async (obj: FormData): Promise<Car> => {
    const res = await fetch(`${process.env.PORT_BACKEND}/api/cars/${obj.get('id')}`, {
      method: 'PUT',
        body: obj,
    });
    return res.json();
  };

  export const deleteCarFetch = async (id: CarId): Promise<number> => {
    const res = await fetch(`${process.env.PORT_BACKEND}/api/cars/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  };