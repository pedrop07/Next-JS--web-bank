import { useContext, useEffect } from "react";
import { AuthContext } from "../shared/context/auth";

function Home() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const userInfos = JSON.parse(localStorage.getItem('user'));
    if(!userInfos) window.location.href = "/login";

    fetch(`/api/user/${userInfos.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, []);

  function exit() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="body">
      <div className="left">
        <h1 className="fonte-color">
          Olá, {user?.name.split(' ')[0]}!
        </h1>
        <div className="card-container">
          <div className="card-info">
            <div className="card-info-value">
              <span>Cliente</span>
              <br />
              <h4 id="client-name">{user?.name}</h4>
            </div>
            <div className="card-info-value">
              <span>CPF</span>
              <br />
                <h4 id="client-cpf">{user?.id}</h4>
            </div>
          </div>
          <div className="card-info">
            <div className="card-info-value">
              <span>Email cadastrado</span>
              <br />
                <h4 id="client-email">{user?.email}</h4>
            </div>
            <div className="card-info-value">
              <span>Saldo</span>
              <br />
                <h4 id="client-balance">{user?.bankBalance}</h4>
            </div>
          </div>
          <a className="btn-white" href="/edit">
            Editar
          </a>
        </div>
      </div>
      <div className="right">
        <h2 className="fonte-color">Ações</h2>
        <div className="links-container">
          <a href="/deposit" className="btn">
            Depósito
          </a>
          <a href="/withdraw" className="btn">
            Saque
          </a>
          <a href="/transfer" className="btn">
            Transferência
          </a>
          <a href={`/statement/${user?.id}`} className="btn">
            Extrato
          </a>
          <div className="btn" onClick={exit}>
            Sair
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
