import { useContext, useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { AuthContext } from '../shared/context/auth';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState('');

  const ctx = useContext(AuthContext);

  console.log(ctx);

  const filterUsers = () => {
    if(!users) return null;

    return users.filter((user) => (
      user.id.includes(filterText) 
      || user.name.toLowerCase().includes(filterText.toLowerCase())
      || user.email.toLowerCase().includes(filterText.toLowerCase())
    ));
  }

  const handleCreateUser = () => {

  }

  useEffect(() => {
    if(!user) window.location.href = "/login";

    setIsLoading(true);

    fetch(`/api/user`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
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
                        <a href={`/statement/${id}`}
                          className="icon"
                        >
                          <AiOutlineFileText color="green" />
                        </a>
                        <a
                          href={`/edit/${id}`}
                          className="icon"
                        >
                          <AiOutlineEdit color="blue" />
                        </a>
                        <button
                          className="icon"
                        >
                          <FiTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              )
          }
        </table>
        <button className="btn" onClick={handleCreateUser}>
          Cadastrar usuário
        </button>
      </div>

      <a href="/" className="go-home btn">
        Voltar
      </a>
    </div>
  )
}
