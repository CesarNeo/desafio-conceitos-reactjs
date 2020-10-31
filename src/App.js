import React, {useEffect, useState} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[]);
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()}`
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    )) 
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
