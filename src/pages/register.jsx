function Register() {
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {};
    payload.name = document.getElementById('name').value;
    payload.cpf = document.getElementById('cpf').value;
    payload.email = document.getElementById('email').value;
    payload.password = document.getElementById('password').value;

    fetch('/api/user', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = "/";
      })
      .catch(err => {
        alert('Algo deu errado com a operação, tente novamente!');

        document.getElementById('name').value = '';
        document.getElementById('cpf').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
      });
  }

  return (
    <div className="body">
      <div className="left">
        <img src="/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Fazer o seu cadastro agora!</h1>
        <p>É simples, fácil e rápido e você já sai com sua conta do banco criada!</p>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Digite seu nome completo" id="name" required />
          <input type="number" placeholder="Digite seu CPF" id="cpf" required />
          <input type="email" placeholder="Digite seu e-mail" id="email" required />
          <input type="password" placeholder="Digite sua senha" id="password" required />

          <button className="btn" type="submit">
            Finalizar
          </button>

          <p>Já tem uma conta? <a className="register" href="/login">Faça login!</a></p>
        </form>
      </div>
    </div>
  )
}

export default Register;
