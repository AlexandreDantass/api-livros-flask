
import { useState } from 'react'

function App() {
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  async function buscarLivros() {
    setCarregando(true)
    setErro('')
    setLivros([])

    try {
      const resposta = await fetch('/livros')

      if (!resposta.ok) {
        throw new Error('Erro ao buscar livros')
      }

      const dados = await resposta.json()

      setLivros(dados.livros)

    } catch (erro) {
      setErro('Não foi possível conectar à API Flask.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial',
      color: '#222',
      textAlign: 'center'
    }}>

      <h1>Catálogo de Livros</h1>

      <button
        onClick={buscarLivros}
        disabled={carregando}
        style={{
          padding: '12px 25px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {carregando ? 'Buscando...' : 'Buscar Livros'}
      </button>

      {carregando && <p>Carregando livros...</p>}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {livros.map(livro => (
        <div key={livro.id} style={{
          background: '#f0f0f0',
          color: '#222',
          padding: '15px',
          margin: '10px auto',
          borderRadius: '8px',
          maxWidth: '400px'
        }}>

          <h3>{livro.titulo}</h3>
          <p>ID: {livro.id}</p>
          <p>Autor: {livro.autor}</p>
          <p>Ano: {livro.ano}</p>

        </div>
      ))}

    </div>
  )
}

export default App
