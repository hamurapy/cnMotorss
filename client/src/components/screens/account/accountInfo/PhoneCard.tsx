import React from "react";
import PhoneType from "../../phoneNumber/types/phone.type";
import { useAppDispatch } from "@/store";
import { updatePhone } from "../../phoneNumber/phone.slice";

const PhoneCard = ({ phone }: { phone: PhoneType }) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhone = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updatePhone({ id: phone.id, phoneNumber: phone.phoneNumber }));
  };

  return (
    <>
      <div>{phone.phoneNumber}</div>
      {/* <button type="button">Редактировать</button> */}
      <form onSubmit={handlePhone}>
        <input
          type="tel"
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
