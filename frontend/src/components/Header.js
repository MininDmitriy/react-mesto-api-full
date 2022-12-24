import { Link, Route } from "react-router-dom";

function Header({email, setEmail, onSignOut}) {
  function handleLogout() {
    onSignOut();
    setEmail('');
  }

  return (
    <header className="header root__header">
      <div className="header__container">
        <Link to="/" className="header__logo"></Link>
        <Route exact path="/">
          <div className="header__container-information-user">
            <p className="header__email-user">{email}</p>
            <input aria-label="Exit" className="header__button-action" type="submit" onClick={handleLogout} value="Выйти" />
          </div>
        </Route>
        <Route path="/signin">
          <Link className="header__link-action" to="/signup">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link className="header__link-action" to="/signin">Войти</Link>
        </Route>
      </div>
    </header>
  )
}

export default Header;