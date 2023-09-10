import { PhoneType } from "./types/phone.type";


export async function loadPhone(): Promise<PhoneType[]> {
  const res = await fetch('http://localhost:4000/api/phone');
  return res.json();
}
export async function updatePhone(phone: PhoneType): Promise<PhoneType> {
  const res = await fetch(`http://localhost:4000/api/phone/${phone.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ phoneNumber: phone.phoneNumber }),
  });
  const data = await res.json();
  return data;
}

export async function updateYandex(yandex: PhoneType): Promise<PhoneType> {
  const res = await fetch(`http://localhost:4000/api/phone/${yandex.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ yandex: yandex.yandex }),
  });
  const data = await res.json();
  return data;
}

export async function updateGoogle(google: PhoneType): Promise<PhoneType> {
  const res = await fetch(`http://localhost:4000/api/phone/${google.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ google: google.google }),
  });
  const data = await res.json();
  return data;
}