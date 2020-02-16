import React from 'react';

import Rest from './rest'

const baseURL = 'https://mymoney-gusprado.firebaseio.com/'

const {useGet, usePost, useDelete} = Rest(baseURL)

function App() {
  const data = useGet('movimentacoes/2020-02')
  const [postData, post] = usePost('movimentacoes/2020-02')
  const [deleteData, remove] = useDelete()


  const saveNew = () => {
    post({ valor: 15, descricao: 'ceva'})
  }

  const doRemove = () => {
    remove('movimentacoes/2020-02/-M0FEcMMPdIopQifeH1-')
  }  

  return (
    <div className="App">
      <h1>My Money</h1>
      { data.loading ? 'Loading...' : JSON.stringify(data.data) }
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={saveNew}>Salvar</button>
      <button onClick={doRemove}>Remover</button>
      <pre>{JSON.stringify(deleteData)}</pre>
    </div>
  );
}

export default App;
