import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import Rest from '../../utils/rest'

const baseURL = 'https://mymoney-gusprado.firebaseio.com/'
const {useGet} = Rest(baseURL)

const Months = () => {
  const data = useGet('meses')
  if (data.loading) {
    return <span>Carregando...</span>
  }
  if (data.error && data.error === 'Permission denied') {
    return <Redirect to='/login' />
  }
  if (Object.keys(data.data).length > 0){
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Previsão de entradas</th>
            <th>Entradas</th>
            <th>Previsão de saidas</th>
            <th>Saidas</th>
          </tr>
        </thead>
        <tbody>
          {
            Object
              .keys(data.data)
              .map(mes => {
                return (
                  <tr key={mes}>
                  <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                  <td>{data.data[mes].previsao_entrada}</td>
                  <td>{data.data[mes].entradas}</td>
                  <td>{data.data[mes].previsao_saida}</td>
                  <td>{data.data[mes].saidas}</td>
                </tr>
                )
              })
          }
        </tbody>
      </table>
  // <pre>{JSON.stringify(data)}</pre>
    )
  }
  return null
}

export default Months
