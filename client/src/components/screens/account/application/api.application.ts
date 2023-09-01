import { ApplicationId, ApplicationType } from "./types/application.type";

export async function loadApplication(): Promise<ApplicationType[]> {
  const res = await fetch('http://localhost:4000/api/application');
  return res.json();
}

export const addApplications = async (
  newApplications: ApplicationType,
): Promise<ApplicationType> => {
  const res = await fetch('http://localhost:4000/api/application', {
    method: 'POST',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({
      name: newApplications.name,
      email: newApplications.email,
      phone: newApplications.phone,
      message: newApplications.message,
      carID: newApplications.carID,
      car: newApplications.car,
      carPhoto: newApplications.carPhoto,
      year: newApplications.year,
      color: newApplications.color,
      mileage: newApplications.mileage,
      wheel: newApplications.wheel,
      engine: newApplications.engine,
      driveUnit: newApplications.driveUnit,
      transmission: newApplications.transmission,
      price: newApplications.price,
    }),
    credentials: 'include',
  });
  return res.json();
};

export const updateApplication = async (updateApplication: ApplicationType): Promise<ApplicationType> => {
  const res = await fetch(`http://localhost:4000/api/application/${updateApplication.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({
      status: updateApplication.status,
    }),
  });
  const data = await res.json();
  return data;
};

export const deleteApplications = async (
  id: ApplicationId,
): Promise<number> => {
  const res = await fetch(`http://localhost:4000/api/application/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
};