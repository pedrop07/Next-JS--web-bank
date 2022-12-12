import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BackHome } from "../../components/BackHome";
import { AuthContext } from "../../shared/context/auth";

function Statement() {
  const router = useRouter();
  const { id } = router.query
  const { user } = useContext(AuthContext);

  const [statement, setStatement] = useState([]);

  useEffect(() => {
    if(!id) return;
    if(id && !user) window.location.href = "/login";

    fetch(`/api/statement/${id}`)
      .then(res => res.json())
      .then(data => setStatement(data));
  }, [id]);

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

  if(!id) return null;

  return (
    <div className="body">
      <div className="left">
        <img src="/images/home-bg-img.svg" alt="Imagem de banco" />
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

      <BackHome />
    </div>
  )
}

export default Statement;
