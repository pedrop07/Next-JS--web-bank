import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Edit() {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { id } = router.query

  const onSubmit = (ev) => {
    const actualPassword = document.getElementById('ac-password').value;
    if(user.password !== actualPassword) return alert('Senha incorreta');

    const payload = {};
    ev.preventDefault();
    payload.email = document.getElementById('email').value;
    payload.name = document.getElementById('name').value;
    payload.password = document.getElementById('password').value;

    fetch(`/api/user/${id}`, {
      method: "PUT",
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

        document.getElementById('ac-password').value = '';
      });
  }

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    
    if(!localUser) window.location.href = "/login";


    const objUser = JSON.parse(localUser);
    document.getElementById('email').value = objUser.email;
    document.getElementById('name').value = objUser.name;
    document.getElementById('password').value = objUser.password;

    setUser(objUser);
  }, []);

  return (
    <div className="body">
      <div className="left">
        <img src="https://nlw6-discover.herokuapp.com/images/home-bg-img.svg" alt="Imagem de banco" />
      </div> 

      <div className="right">
        <h1>Edite seus dados</h1>
        <p>Verifique todos os dados antes de alterar!</p>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="Edite seu e-mail" id="email" required />
          <input type="text" placeholder="Edite seu nome" id="name" required />
          <input type="password" placeholder="Edite sua senha" id="password" required />

          {
            !user?.is_admin 
            && <input type="password" placeholder="Senha atual para confirmar alterações" id="ac-password" required />
          }

          <button className="btn" type="submit">
            Editar
          </button>
        </form>
      </div>

      <a href="/" className="go-home btn">
        Voltar
      </a>
    </div>
  )
}

export default Edit;