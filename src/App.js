import React from 'react';

import Rest from './rest'
import Header from './components/Header'
import Months from './Months'
import AddMonth from './AddMonth'

const baseURL = 'https://mymoney-gusprado.firebaseio.com/'

const {useGet, usePost, useDelete} = Rest(baseURL)

function App() {
  const data = useGet('meses')
  // const data = useGet('movimentacoes/2020-02')
  // const [postData, post] = usePost('movimentacoes/2020-02')
  // const [deleteData, remove] = useDelete()


  // const saveNew = () => {
  //   post({ valor: 15, descricao: 'ceva'})
  // }

  // const doRemove = () => {
  //   remove('movimentacoes/2020-02/-M0FEcMMPdIopQifeH1-')
  // }  

  return (
    <div className="App">
      <Header />
      <div className="container">
        <AddMonth />
        <Months />

        {/* { data.loading ? 'Loading...' : JSON.stringify(data.data) } */}
        {/* <pre>{JSON.stringify(postData)}</pre>
        <button onClick={saveNew}>Salvar</button>
        <button onClick={doRemove}>Remover</button>
        <pre>{JSON.stringify(deleteData)}</pre> */}
      </div>
    </div>
  );
}

export default App;
