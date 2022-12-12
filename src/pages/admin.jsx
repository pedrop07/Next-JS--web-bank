import { useContext, useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { AuthContext } from '../shared/context/auth';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState('');

  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user.is_admin) window.location.href = "/";
  }

  const ctx = useContext(AuthContext);

  const filterUsers = () => {
    if(!users) return null;

    return users.filter((user) => (
      user.id.includes(filterText) 
      || user.name.toLowerCase().includes(filterText.toLowerCase())
      || user.email.toLowerCase().includes(filterText.toLowerCase())
    ));
  }

  const handleCreateUser = () => {
    // TODO: implement
    window.location.href = "/adminregister";
  }

  const deleteUser = (id) => {
    fetch(`/api/user/${id}`, {
      method: 'DELETE'
    })
      .finally(fetchData)
  }

  const fetchData = () => {
    setIsLoading(true);

    fetch(`/api/user`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [users]);

  return (
    <div className="body">
      <div className="left">
        <img src="/images/home-bg-img.svg" alt="Imagem de banco" />
      </div>

      <div className="right">
        <h1>Painel do Administrador</h1>
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
                          onClick={() => deleteUser(id)}
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
    </div>
  )
}
