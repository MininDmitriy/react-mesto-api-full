function PopupWithForm(props)  {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button aria-label="Close" className="popup__button-close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form ${props.children ? 'popup__form_margins' : ''} popup__${props.name}`} name={props.name} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <input aria-label="Save" className="popup__button-save popup__button-save_hover" type="submit" value={props.buttonText} />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;