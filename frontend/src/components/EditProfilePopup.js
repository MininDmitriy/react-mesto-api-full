import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({isOpen, buttonText, onUpdateUser, onClose}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  useEffect(() => {
    setValues({userFullName: currentUser.name, userProfession: currentUser.about});
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.userFullName,
      about: values.userProfession
    });
  }

  function closePopupAndResetForm() {
    onClose();
    resetForm();
  }

  return (
    <PopupWithForm onClose={closePopupAndResetForm} isOpen={isOpen ? 'popup_opened' : ''} title="Редактировать профиль" buttonText={buttonText ?  'Сохранение...' : 'Сохранить'} name="form_name" onSubmit={handleSubmit}>
      <input type="text" name="userFullName" className="popup__input popup__input_form_name popup__input_border-bottom_black" minLength="2" maxLength="40" placeholder="Имя" required value={values.userFullName || ''} onChange={handleChange} />
      <span className={`popup__input-text ${!isValid ? "popup__input-text_error-visible" : ""}`}>{errors.userFullName}</span>
      <input type="text" name="userProfession" className="popup__input popup__input_form_profession popup__input_border-bottom_black" minLength="2" maxLength="200" placeholder="Профессия" required value={values.userProfession || ''} onChange={handleChange} />
      <span className={`popup__input-text ${!isValid ? "popup__input-text_error-visible" : ""}`}>{errors.userProfession}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;