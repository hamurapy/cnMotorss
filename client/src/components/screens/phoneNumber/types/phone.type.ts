export type PhoneType = {
  id?: number;
  phoneNumber?: string;
  adres?: string;
  whatsapp?: string;
  telegram?: string;
  yandex?: string;
  google?: string;
};

export type PhoneState = {
  phoneList: PhoneType[];
};