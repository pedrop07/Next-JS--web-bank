import { useEffect, useState } from "react";

function Statement() {
  const [statement, setStatement] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user) window.location.href = "/login";

    fetch(`/api/statement/${user.id}`)
      .then(res => res.json())
      .then(data => setStatement(data));
  }, []);

  console.log(statement)

  const transformOrderTypeToLabel = (orderType) => {
    switch(orderType) {
      case 'transfer':
        return 'Tranferência enviada'
      case 'receipt':
        return 'Transferência recebida'
      case 'deposit':
        return 'Depósito'
      case 'withdraw':
        return 'Saque'
    }
  }

  return (
    <div className="body">
      <div className="left">
        <img src="https://nlw6-discover.herokuapp.com/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Extrato</h1>
        <p>Veja aqui todas as ordens que você executou ao longo do tempo!</p>
        <table>
          <tbody>
            <tr>
              <td>Tipo da ordem</td>
              <td>Data</td>
              <td>Valor</td>
              <td>Descrição</td>
            </tr>
            {
              statement.map((order) => (
                <tr key={order.createdAt}>
                  <td>{transformOrderTypeToLabel(order.type)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>R$ {String(order.amount.toFixed(2)).replace('.', ',')}</td>
                  <td>{order.description ? order.description.substr(0, 15) : '---'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <a href="/" className="go-home btn">
        Voltar
      </a>
    </div>
  )
}

export default Statement;
