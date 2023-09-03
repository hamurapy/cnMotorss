export type ApplicationType = {
  id?: number,
  name?: string,
  email?: string,
  phone?: string,
  message?: string,
  carID?: number,
  carPhoto?: string,
  car?: string,
  year?: number, 
  color?: string,
  mileage?: number,
  wheel?: string,
  engine?: string,
  driveUnit?: string,
  transmission?: string,
  price?: number,
  status?: string,
  createdAt?: string,
}

export type ApplicationId = ApplicationType['id'];

export type ApplicationState = {
  applicationList: ApplicationType[];
  error: string | undefined;
};