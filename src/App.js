import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './elements/Header'
import Home from './pages/Home'
import Movi from './pages/Movimentacoes'


function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/movimentacoes/:data" exact component={Movi} />
      </div>
    </Router>
  );
}

export default App;
