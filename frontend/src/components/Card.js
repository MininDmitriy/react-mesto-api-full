import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, setCardId, onOpenConfirmationPopup}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__button-delete ${isOwn ? 'card__button-delete_visible' : 'card__button-delete_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked ? 'card__button-like_active' : ''}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function confirmationPopup() {
    onOpenConfirmationPopup();
    setCardId(card._id);
  }

  return(
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <button aria-label="Delete" className={cardDeleteButtonClassName} onClick={confirmationPopup} type="button"></button>
      <div className="card__body">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__container-for-info-like">
          <button aria-label="Like" className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="card__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;