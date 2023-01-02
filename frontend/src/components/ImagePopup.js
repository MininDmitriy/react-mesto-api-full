function ImagePopup(props) {
  const className = `popup popup_background-color popup_type_open-picture ${props.card.visibilityCard ? 'popup_opened' : ''}`;

  return(
    <div className={className}>
      <figure className="popup__figure">
        <button aria-label="Close" className="popup__button-close" type="button" onClick={props.onClose}></button>
        <img className="popup__picture" src={props.card.src} alt={props.card.alt} />
        <figcaption className="popup__figcaption">{props.card.alt}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;