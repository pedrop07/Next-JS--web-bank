import { useEffect } from "react";

function Deposit() {
  useEffect(() => {
    if(!localStorage.getItem('user')) window.location.href = "/login";
  }, []);
  
  const onSubmit = (ev) => {
    const payload = {};
    ev.preventDefault();
    payload.amount = parseInt(document.getElementById('amount').value);

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    fetch(`/api/deposit/${user.id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        user.bankBalance += payload.amount;
        window.location.href = "/";
      })
      .catch(err => {
        alert('Algo deu errado com a operação, tente novamente!');

        document.getElementById('amount').value = '';
      });
  }

  return (
    <div className="body">
      <div className="left">
        <img src="https://nlw6-discover.herokuapp.com/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Faça seu depósito</h1>
        <p>Deposite qualquer valor a qualquer hora !</p>
        <form onSubmit={onSubmit}>
          <input type="number" placeholder="Digite o valor de depósito" id="amount" required />

          <button className="btn" type="submit">
            Realizar depósito
          </button>
        </form>
      </div>

      <a href="/" className="go-home btn">
        Voltar
      </a>
    </div>
  )
}

export default Deposit;
