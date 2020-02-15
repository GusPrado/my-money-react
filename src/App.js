import React from 'react';
// import axios from 'axios'

import useGet from './useGet'
import usePost from './usePost'


const url = 'https://mymoney-gusprado.firebaseio.com/movimentacoes.json'

function App() {
  const data = useGet(url)
  // const data2 = useGet('http://httpbin.org/ip')
  const [postData, post] = usePost(url)


  const saveNew = () => {
    post({ valor: 15, descricao: 'ceva'})
  }

  return (
    <div className="App">
      <h1>My Money</h1>
      { data.loading ? 'Loading...' : JSON.stringify(data.data) }
      {/* <pre>{JSON.stringify(data2)}</pre> */}
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={saveNew}>Salvar</button>
    </div>
  );
}

export default App;
