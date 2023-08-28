import React from 'react'
import { useSelector } from 'react-redux';

function PhoneNumber() {
    const { phoneNumber } = useSelector((store: RootState) => store.phoneNumber)
    console.log(phoneNumber,2131231312321312);
    
  return (
    <p>{phoneNumber}</p>
  )
}

export default PhoneNumber