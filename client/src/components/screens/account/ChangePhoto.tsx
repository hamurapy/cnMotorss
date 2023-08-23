import React, { useState } from 'react';

export default function ChangePhoto({ car }: { car: Car }): JSX.Element {
  const [modal, setModal] = useState(true);

  const dispatch = useAppDispatch();

  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(data.img).forEach((key: any) => {
      formData.append('img', data.img[key]);
    });
    dispatch(addCar(formData));
    // reset();
  };

  return (
    <span>
        {modal ? (
        <button
          className="form__btn"
          type="button"
          onClick={() => setModal(!modal)}
        >
          Добавить фото
        </button>
      ) : (
        <div>
      <form className="form__container" onSubmit={onHandleSubmit}>
          <label className="form__label">
          Image
          <input
            type="file"
            {...register('img', { required: true })}
            multiple
          />
        </label>
        <button type="submit">Добавить Ta4чку</button>
      </form>
      
    </div>
  )}
  </span>
  )
}
