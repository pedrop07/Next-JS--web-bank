function AdminRegister() {
  let user;

  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user'));
    user.is_admin ? '' : window.location.href = "/";
  }

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
        alert("Usuário cadastrado !")
        window.location.href = "/admin";
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
        <h1>Cadastre um usuário</h1>

        <p>
          Preencha os campos abaixo
        </p>

        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Digite seu nome completo" id="name" required />
          <input type="number" placeholder="Digite seu CPF" id="cpf" required />
          <input type="email" placeholder="Digite seu e-mail" id="email" required />
          <input type="password" placeholder="Digite sua senha" id="password" required />

          <button className="btn" type="submit">
            Finalizar
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister;
