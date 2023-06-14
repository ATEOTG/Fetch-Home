function Login() {
  return (
    <div className="login-cont">
      <form className="form">
        <div className="form__inputs-cont">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Username..." />
        </div>
        <div className="form__inputs-cont">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email..." />
        </div>
        <button className="form__btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
