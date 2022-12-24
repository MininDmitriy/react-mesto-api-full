import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Register({onRegister}) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.password, values.email);
    resetForm();
  }

  return(
    <div className="authenticate__container">
      <h2 className="authenticate__title">Регистрация</h2>
      <form className="authenticate__form authenticate__form_registration" name="form_registration"  onSubmit={handleSubmit} noValidate>
        <input type="email" name="email" className="authenticate__input authenticate__input_form_email authenticate__input_border-bottom_light" minLength="2" maxLength="40" placeholder="E-mail" value={values.email || ''} onChange={handleChange} required/>
        <span className="authenticate__input-text"></span>
        <input type="password" name="password" className="authenticate__input authenticate__input_form_password authenticate__input_border-bottom_light" minLength="2" maxLength="40" placeholder="Пароль" value={values.password || ''} onChange={handleChange} required/>
        <span className="authenticate__input-text"></span>
        <input aria-label="Save" className="authenticate__button-save" type="submit" value="Зарегистрироваться" />
        <Link className="authenticate__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}

export default Register;