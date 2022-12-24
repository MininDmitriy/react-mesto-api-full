import {useFormAndValidation} from "../hooks/useFormAndValidation";

function Login({onLogin}) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  function onSubmit(e) {
    e.preventDefault();
    onLogin(values.password, values.email);
    resetForm();
  }

  return(
    <div className="authenticate__container">
      <h2 className="authenticate__title">Вход</h2>
      <form className="authenticate__form authenticate__form-autorization" name="form-autorization" onSubmit={onSubmit} noValidate>
        <input type="email" name="email" className="authenticate__input authenticate__input_form_email authenticate__input_border-bottom_light" minLength="2" maxLength="40" placeholder="E-mail" required value={values.email || ''} onChange={handleChange}/>
        <span className="authenticate__input-text"></span>
        <input type="password" name="password" className="authenticate__input authenticate__input_form_password authenticate__input_border-bottom_light" minLength="2" maxLength="40" placeholder="Пароль" required value={values.password || ''} onChange={handleChange}/>
        <span className="authenticate__input-text"></span>
        <input aria-label="Save" className="authenticate__button-save" type="submit" value="Войти" />
      </form>
    </div>
  )
}

export default Login;