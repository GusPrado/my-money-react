import React from 'react';
// import axios from 'axios'

import useGet from './useGet'
import usePost from './usePost'
import useDelete from './useDelete'


const url = 'https://mymoney-gusprado.firebaseio.com/movimentacoes.json'

function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url)
  const [deleteData, remove] = useDelete()


  const saveNew = () => {
    post({ valor: 15, descricao: 'ceva'})
  }

  const doRemove = () => {
    remove('https://mymoney-gusprado.firebaseio.com/movimentacoes/-M09mmw_qP-M68ifafjt.json')
  }  

  return (
    <div className="App">
      <h1>My Money</h1>
      { data.loading ? 'Loading...' : JSON.stringify(data.data) }
      {/* <pre>{JSON.stringify(data2)}</pre> */}
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={saveNew}>Salvar</button>
      <button onClick={doRemove}>Remover</button>
      <pre>{JSON.stringify(deleteData)}</pre>
    </div>
  );
}

export default App;
