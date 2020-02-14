import React from 'react';

import useGet from './useGet'

const url = 'https://mymoney-gusprado.firebaseio.com/movimentacoes.json'

function App() {
  const data = useGet(url)
  const data2 = useGet('http://httpbin.org/ip')

  return (
    <div className="App">
      <h1>My Money</h1>
      { data.loading ? 'Loading...' : JSON.stringify(data.data) }
      <pre>{JSON.stringify(data2)}</pre>
    </div>
  );
}

export default App;
