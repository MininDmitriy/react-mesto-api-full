import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import { handleRegistration, checkUserJWT, handleAuthenticate } from "../utils/authenticate";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect, useCallback } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopup, setIsConfirmationPopup] = useState(false);
  const [isInfoAuthentication, setIsInfoAuthentication] = useState(false);
  const [changeInfoAuthentication, setChangeInfoAuthentication] = useState(false);
  const [cardId, setCardId] = useState('');
  const [selectedCard, setSelectedCard] = useState({visibilityCard: false, alt: '', src: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getInfoAboutProfile(), api.getInfoAboutCards()])
        .then(([userData, arrCards]) => {
          setCurrentUser(userData);
          setCards(arrCards);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    setRenderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId))
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateUser({name, about}) {
    setRenderLoading(true);
    api.changeProfile({newName: name, newInfo: about})
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateAvatar({avatar}) {
    setRenderLoading(true);
    api.changeAvatar({avatarNew: avatar})
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    setRenderLoading(true);
    api.addNewCard({name: name, link: link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmationPopup() {
    setIsConfirmationPopup(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopup(false);
    setIsInfoAuthentication(false);
    setSelectedCard({visibilityCard: false, alt: '', src: ''});
  }

  function handleCardClick(card) {
    setSelectedCard({visibilityCard: true, alt: card.name, src: card.link});
  }

  function onRegister(password, email) {
    handleRegistration(password, email)
      .then(() => {
        console.log('Успешная регистрация');
      })
      .then(() => {
        setChangeInfoAuthentication(true);
        setIsInfoAuthentication(true);
      })
      .catch(err => {
        setChangeInfoAuthentication(false);
        setIsInfoAuthentication(true);
        console.log(err);
      });
  }

  function onLogin(password, email) {
    setEmail(email);
    handleAuthenticate(password, email)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch(err => {
        setChangeInfoAuthentication(false);
        setIsInfoAuthentication(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      checkUserJWT(jwt)
        .then((data) => {
          if(data) {
            setLoggedIn(true);
            setEmail(data.email);
            history.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, []);

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  if (isLoading) {
    return '...Loading';
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} setEmail={setEmail} onSignOut={onSignOut}/>
      <Switch>
        <ProtectedRoute exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onOpenConfirmationPopup={handleConfirmationPopup}
                        setCardId={setCardId}
        />
        <Route path="/signin">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/signup">
          <Register onRegister={onRegister}/>
        </Route>
        <Route path="*">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        buttonText={renderLoading}
      />
      <AddPlacePopup onClose={closeAllPopups}
                     isOpen={isAddPlacePopupOpen}
                     onAddPlace={handleAddPlaceSubmit}
                     buttonText={renderLoading}
      />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}
                       onUpdateAvatar={handleUpdateAvatar}
                       buttonText={renderLoading}
      />
      <ConfirmationPopup isOpen={isConfirmationPopup}
                         onClose={closeAllPopups}
                         onCardDelete={handleCardDelete}
                         cardId={cardId}
                         buttonText={renderLoading}
      />
      <ImagePopup card={selectedCard}
                  onClose={closeAllPopups}
      />
      <InfoTooltip onClose={closeAllPopups}
                   isOpen={isInfoAuthentication}
                   changeInfo={changeInfoAuthentication}
      />
    </CurrentUserContext.Provider>
  )
}

export default App;