import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  useEffect(() => {
    setValues({newCardName: '', newCardLink: ''});
  },[]);

  function handleSubmit(e) {
    e.preventDefault();
    resetForm();

    props.onAddPlace({
      name: values.newCardName,
      link: values.newCardLink
    })
  }

  function closePopupAndResetForm() {
    props.onClose();
    resetForm();
  }

  return(
    <PopupWithForm onClose={closePopupAndResetForm} isOpen={props.isOpen ? 'popup_opened' : ''} title="Новое место" buttonText={props.buttonText ?  'Сохранение...' : 'Создать'} name="form_place" onSubmit={handleSubmit}>
      <input type="text" name="newCardName" className="popup__input popup__input_form_name-place popup__input_border-bottom_black" placeholder="Название" minLength="2" maxLength="30" value={values.newCardName || ''}  onChange={handleChange} required />
      <span className={`popup__input-text ${!isValid ? "popup__input-text_error-visible" : ""}`}>{errors.newCardName}</span>
      <input type="url" name="newCardLink" className="popup__input popup__input_form_source-on-place popup__input_border-bottom_black" placeholder="Ссылка на картинку" value={values.newCardLink || ''}  onChange={handleChange} required />
      <span className={`popup__input-text ${!isValid ? "popup__input-text_error-visible" : ""}`}>{errors.newCardLink}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;