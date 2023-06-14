import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<[boolean, string]>([false, ""]);
  const [emailError, setEmailError] = useState<[boolean, string]>([false, ""]);
  const navigate = useNavigate();

  async function loginRequest(nameValue: string, emailValue: string) {
    try {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            name: nameValue,
            email: emailValue,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid Email");
      }

      setEmailError([false, ""]);
      navigate("/home", { replace: true });
    } catch (err) {
      setEmailError([true, "Invalid Email"]);
    }
  }
  function loginFormHandler(e: FormEvent) {
    e.preventDefault();

    const nameValue = nameRef.current?.value;
    const emailValue = emailRef.current?.value;

    if (nameValue && emailValue) {
      setNameError([false, ""]);
      loginRequest(nameValue, emailValue);
    } else {
      if (!nameValue) setNameError([true, "Enter Name"]);
      else setNameError([false, ""]);
      if (!emailValue) setEmailError([true, "Enter Email"]);
      else setEmailError([false, ""]);
    }
  }

  return (
    <div className="login-cont">
      <form className="form">
        <div className="form__inputs-cont">
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            required
            placeholder="Username..."
            className={`${nameError[0] ? "form__inputs-cont--error" : ""}`}
          />
          {nameError[0] && (
            <p className="form__inputs-cont__error-message">{nameError[1]}</p>
          )}
        </div>
        <div className="form__inputs-cont">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email..."
            className={`${emailError[0] ? "form__inputs-cont--error" : ""}`}
          />
          {emailError[0] && (
            <p className="form__inputs-cont__error-message">{emailError[1]}</p>
          )}
        </div>
        <button className="form__btn" onClick={loginFormHandler}>
          <p>Login</p>
        </button>
      </form>
    </div>
  );
}

export default Login;
