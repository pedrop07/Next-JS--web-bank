import { useEffect } from "react";

function Transfer() {
  const onSubmit = (ev) => {
    const payload = {};
    ev.preventDefault();
    payload.amount = parseInt(document.getElementById('amount').value);
    payload.toCpf = document.getElementById('toCpf').value;
    payload.description = document.getElementById('description').value;

    const user = JSON.parse(localStorage.getItem('user'));

    fetch(`/api/transfer/${user.id}`, {
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
        <img src="https://nlw6-discover.herokuapp.com/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Faça sua transferência</h1>
        <p>Transferimos dinheiro para qualquer lugar do Brasil!</p>
        <form onSubmit={onSubmit}>
          <input type="number" placeholder="Digite o valor" id="amount" required />
          <input type="number" placeholder="Digite o CPF do destinatário" id="toCpf" required />
          <input type="text" placeholder="Digite uma descrição" id="description" required />

          <button className="btn" type="submit">
            Realizar transferência
          </button>
        </form>
      </div>

      <a href="/" className="go-home btn">
        Voltar
      </a>
    </div>
  )
}

export default Transfer;
