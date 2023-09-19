import { PhoneType } from "./types/phone.type";


export async function loadPhone(): Promise<PhoneType[]> {
  const res = await fetch('${process.env.PORT_BACKEND}/api/phone');
  return res.json();
}
export async function updatePhone(phone: PhoneType): Promise<PhoneType> {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/phone/${phone.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ phoneNumber: phone.phoneNumber }),
  });
  const data = await res.json();
  return data;
}

export async function updateAdres(adres: PhoneType): Promise<PhoneType> {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/phone/${adres.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ adres: adres.adres }),
  });
  const data = await res.json();
  return data;
}

export async function updateWhatsapp(whatsapp: PhoneType): Promise<PhoneType> {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/phone/${whatsapp.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ whatsapp: whatsapp.whatsapp }),
  });
  const data = await res.json();
  return data;
}

export async function updateTelegram(telegram: PhoneType): Promise<PhoneType> {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/phone/${telegram.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ telegram: telegram.telegram }),
  });
  const data = await res.json();
  return data;
}

export async function updateYandex(yandex: PhoneType): Promise<PhoneType> {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/phone/${yandex.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ yandex: yandex.yandex }),
  });
  const data = await res.json();
  return data;
}

export async function updateGoogle(google: PhoneType): Promise<PhoneType> {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/phone/${google.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({ google: google.google }),
  });
  const data = await res.json();
  return data;
}