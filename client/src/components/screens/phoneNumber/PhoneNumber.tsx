import React from 'react'

function PhoneNumber() {
    const { phoneNumber } = useAppSelector((store) => store.phoneNumber);
  return (
    <p>{phone}</p>
  )
}

export default PhoneNumber