import React from "react";
import { useAppDispatch } from "@/store";
import { updatePhone } from "../../phoneNumber/phone.slice";
import { PhoneType } from "../../phoneNumber/types/phone.type";

const PhoneCard = ({ phone }: { phone: PhoneType }) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handlePhone = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updatePhone({ id: phone.id, phoneNumber: phoneNumber }));
  };
  
  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <>
      <div>{phone.phoneNumber}</div>
      <form onSubmit={handlePhone}>
        <input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Введите номер"
        />
        <button type="submit">Изменить</button>
      </form>
    </>
  );
};

export default PhoneCard;
