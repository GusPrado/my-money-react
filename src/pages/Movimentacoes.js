import React, { useState } from 'react'

import Rest from '../utils/rest'

const baseURL = 'https://mymoney-gusprado.firebaseio.com/'
const {useGet, usePost, useDelete} = Rest(baseURL)

const Movi = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
  const [postData, save] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remove] = useDelete('') 
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('') 

  const handleDesc = evt => {
    setDescricao(evt.target.value)
  }

  const handleValor= evt => {
    setValor(evt.target.value)
  }

  const handleSave = async() => {
    // if(!isNaN(valor) && valor.search(/ˆ[-]?\d+(\.)?\d+?$/) >= 0) {
      await save({
          descricao,
          valor: parseFloat(valor)
        })
        setDescricao('')
        setValor('')
        data.refetch()
    // }
  }


  const handleRemove = async(id) => {
    await remove(`movimentacoes/${match.params.data}/${id}`)
    data.refetch()
  }

  return (
    <div className="container">
      <h1>Movimentações</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th className= "text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          { data.data && 
            Object
              .keys(data.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{data.data[movimentacao].descricao}</td> 
                    <td className= "text-right">
                      {data.data[movimentacao].valor} {' '}
                      <button className="btn btn-danger" onClick={() => handleRemove(movimentacao)}>-</button>
                    </td>
                  </tr>
                )
              })
          }
          <tr className="text-center">
            <td>
              <input type="text" value={descricao} onChange={handleDesc} placeholder="descrição" />
            </td>
            <td>
              <input type="text" value={valor} onChange={handleValor} placeholder="valor"/>
              <button className="btn btn-success" onClick={handleSave}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movi