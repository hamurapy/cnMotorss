export type PhoneType = {
  id?: number;
  phoneNumber?: string;
  yandex?: string;
  google?: string;
};

export type PhoneState = {
  phoneList: PhoneType[];
};