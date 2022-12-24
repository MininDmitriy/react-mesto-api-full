import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, buttonText}) {
  const avatarRef = useRef('');
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  useEffect(() => {
    setValues({userAvatar: avatarRef.current.value});
  }, [avatarRef]);

  function handleSubmit(e) {
    e.preventDefault();
    resetForm();

    onUpdateAvatar({
      avatar: values.userAvatar
    });
  }

  function closePopupAndResetForm() {
    onClose();
    resetForm();
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm onClose={closePopupAndResetForm} isOpen={isOpen ? 'popup_opened' : ''} title="Обновить аватар" buttonText={buttonText ?  'Сохранение...' : 'Сохранить'} name="form_avatar" onSubmit={handleSubmit}>
      <input type="url" name="userAvatar" className="popup__input popup__input_form_source-on-avatar popup__input_border-bottom_black" placeholder="Ссылка на картинку" ref={avatarRef} onChange={handleChange} required />
      <span className={`popup__input-text ${!isValid ? "popup__input-text_error-visible" : ""}`}>{errors.userAvatar}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;