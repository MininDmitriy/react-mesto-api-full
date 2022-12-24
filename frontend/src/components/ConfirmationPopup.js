import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({isOpen, onClose, onCardDelete, cardId, buttonText}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(cardId);
  }

  return(
    <PopupWithForm onClose={onClose} isOpen={isOpen ? 'popup_opened' : ''} title="Вы уверены?" buttonText={buttonText ? 'Удаление...' : 'Да' } name="form_delete-place" onSubmit={handleSubmit}/>
  )
}

export default ConfirmationPopup;