import { useEffect, useState } from "react";
import { AiOutlineFileText } from 'react-icons/ai';

export default function Admin() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState('');

  const filterUsers = () => {
    if(!users) return null;

    return users.filter((user) => (
      user.id.includes(filterText) 
      || user.name.toLowerCase().includes(filterText.toLowerCase())
      || user.email.toLowerCase().includes(filterText.toLowerCase())
    ));
  }

  const handleStatementClick = (cpf) => {
    window.location.href = "/statement/" + cpf;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user) window.location.href = "/login";

    setIsLoading(true);

    fetch(`/api/user`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    console.log(users);
    setIsLoading(false);
  }, [users]);

  return (
    <div className="body">
      <div className="left">
        <img src="https://nlw6-discover.herokuapp.com/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Admin</h1>
        <p>Administre aqui todos os usuários</p>
        <table>
          <input 
            placeholder="Busque por CPF, e-mail ou nome de usuário..."
            type="text"
            style={{
              marginBottom: '1rem', 
            }}
            value={filterText}
            onChange={(ev) => setFilterText(ev.target.value)}
          />
          {
            isLoading 
              ? <h2>Carregando...</h2>
              : (
                <tbody>
                <tr>
                  <td>CPF</td>
                  <td>Nome</td>
                  <td>E-mail</td>
                  <td>Ações</td>
                </tr>
                {
                  filterUsers()?.map(({ id, name, email }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>
                        <button 
                          onClick={() => handleStatementClick(id)}
                          className="icon"
                        >
                          <AiOutlineFileText />
                        </button>
                        <button 
                          onClick={() => handleStatementClick(id)}
                          className="icon"
                        >
                          <AiOutlineFileText />
                        </button>
                        <button 
                          onClick={() => handleStatementClick(id)}
                          className="icon"
                        >
                          <AiOutlineFileText />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              )
          }
        </table>
      </div>

      <a href="/" className="go-home btn">
        Voltar
      </a>
    </div>
  )
}
