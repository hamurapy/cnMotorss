import type PhoneType from './types/phone.type';

export async function loadPhone(): Promise<PhoneType[]> {
  const res = await fetch('http://localhost:4000/api/phone');
  return res.json();
}

export async function updatePhone(phone: PhoneType): Promise<PhoneType> {
  // const formData = new FormData();
  // formData.append('phoneNumber', phone.phoneNumber);
  const res = await fetch(`http://localhost:4000/api/phone/${phone.id}`, {
    method: 'PUT',
    body: JSON.stringify({ phone }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status >= 400) {
    const { message } = await res.json();
    throw message;
  }

  return res.json();
}
