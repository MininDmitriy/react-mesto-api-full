import { useHistory } from "react-router-dom";

function InfoTooltip({onClose, isOpen, changeInfo}) {
  const history = useHistory();

  function handleClosePopup() {
    onClose();
    history.push("/signin");
  }

  return(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button aria-label="Close" className="popup__button-close" type="button" onClick={handleClosePopup}></button>
        <form className="popup__form popup__form_margins popup__form_new-margin">
          <div className={`popup__symbol ${changeInfo ? 'popup__symbol_true' : 'popup__symbol_false'}`}></div>
          <h2 className="popup__title popup__title_text-align">{changeInfo ? 'Вы успешно зарегистрировались!': 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        </form>
      </div>
    </div>
  )
}

export default InfoTooltip;