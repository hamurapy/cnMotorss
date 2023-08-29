import { PhoneType } from "./types/phone.type";


export async function loadPhone(): Promise<PhoneType[]> {
  const res = await fetch('http://localhost:4000/api/phone');
  return res.json();
}
export async function updatePhone(phone: PhoneType): Promise<PhoneType> {
  const res = await fetch(`http://localhost:4000/api/phone/${phone.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: phone.phoneNumber }),
  });
  return res.json();
}