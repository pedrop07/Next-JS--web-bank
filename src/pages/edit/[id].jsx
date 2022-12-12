import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth";

function Edit() {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { id } = router.query

  const onSubmit = (ev) => {    
    if(!user.is_admin) {
      const actualPassword = document.getElementById('ac-password').value;
      if(user.password !== actualPassword) return alert('Senha incorreta');
    }

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
        window.location.href = user.is_admin ?  "/admin" : "/";
      })
      .catch(err => {
        alert('Algo deu errado com a operação, tente novamente!');

        document.getElementById('ac-password').value = '';
      });
  }

  useEffect(() => {
    if(user && !user.is_admin) {
      document.getElementById('email').value = user.email;
      document.getElementById('name').value = user.name;
      document.getElementById('password').value = user.password;
    } else if(user && user.is_admin && id) {
      fetch(`/api/user/${id}`)
        .then(res => res.json())
        .then(({ email, name, password }) => {
          document.getElementById('email').value = email;
          document.getElementById('name').value = name;
          document.getElementById('password').value = password;
        });
    }
  }, [user, id]);

  return (
    <div className="body">
      <div className="left">
        <img src="/images/home-bg-img.svg" alt="Imagem de banco" />
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