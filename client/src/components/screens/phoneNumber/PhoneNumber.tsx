import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Phone } from './type';
import { RootState, useAppDispatch } from '@/store';
import { loadPhones } from '@/components/screens/account/types/api.cars';

export default function PhoneList() {
  const dispatch = useAppDispatch();
  const phones = useSelector((state: RootState) => state.phone.phones);
console.log(phones);

  return (
    <div>
      {phones.map((phone) => (
        <p key={phone.phoneNumber}>{phone.phoneNumber}</p>
      ))}
    </div>
  );
};