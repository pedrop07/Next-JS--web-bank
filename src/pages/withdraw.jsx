import { useEffect } from "react";
import { BackHome } from "../components/BackHome";

function Withdraw() {
  const onSubmit = (ev) => {
    const payload = {};
    ev.preventDefault();
    payload.amount = parseInt(document.getElementById('amount').value);

    const user = JSON.parse(localStorage.getItem('user'));

    fetch(`/api/withdraw/${user.id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        window.location.href = "/";
      })
      .catch(err => {
        alert('Algo deu errado com a operação, tente novamente!');

        document.getElementById('amount').value = '';
      });
  }
  
  useEffect(() => {
    if(!localStorage.getItem('user')) window.location.href = "/login";
  }, []);
  
  return (
    <div className="body">
      <div className="left">
        <img src="/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Faça seu saque</h1>
        <p>O nosso saque fica disponível 24 horas por dia!</p>
        <form onSubmit={onSubmit}>
          <input type="number" placeholder="Digite o valor de saque" id="amount" required />

          <button className="btn" type="submit">
            Realizar saque
          </button>
        </form>
      </div>

      <BackHome />
    </div>
  )
}

export default Withdraw;
