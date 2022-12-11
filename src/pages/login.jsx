function Login() {
  const onSubmit = (ev) => {
    const payload = {};
    ev.preventDefault();
    payload.cpf = document.getElementById('cpf').value;
    payload.password = document.getElementById('password').value;

    fetch(`/api/user/${payload.cpf}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = "/";
      })
      .catch(err => {
        alert('Algo deu errado com a operação, tente novamente!');
        document.getElementById('cpf').value = '';
        document.getElementById('password').value = '';
      });
  }

  return (
    <div className="body">

      <div className="left">
        <img src="https://nlw6-discover.herokuapp.com/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Fazer o seu login</h1>
        <p>É simples, fácil e rápido! Entre agora para acessar o seu cartão!</p>
        <form onSubmit={onSubmit}>
          <input type="number" placeholder="Digite seu CPF" id="cpf" required />
          <input type="password" placeholder="Digite sua senha" id="password" required />

          <button className="btn" type="submit">
            Login
          </button>

          <p>Ainda não tem conta? <a className="register" href="/register">Cadastre-se agora!</a></p>
        </form>
      </div>
    </div>
  )
}

export default Login;
