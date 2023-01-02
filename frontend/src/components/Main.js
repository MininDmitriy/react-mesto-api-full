import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const cardItems = props.cards.map((item) => <Card key={item._id}
                                                    card={item}
                                                    onCardClick={props.onClick}
                                                    onCardLike={props.onCardLike}
                                                    onOpenConfirmationPopup={props.onOpenConfirmationPopup}
                                                    setCardId={props.setCardId} />);
  return (
    <main className="main root__main">

      <section className="profile main__profile">
        <div className="profile__area">
          <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} ></div>
          <div className="profile__info">
            <h1 className="profile__fullname">{currentUser.name}</h1>
            <button aria-label="Edit Info" className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button aria-label="Add place" className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements main__elements">
        <ul className="elements__cards">
          {cardItems}
        </ul>
      </section>

    </main>
  )
}

export default Main;