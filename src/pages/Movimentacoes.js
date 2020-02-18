import React, { useState } from 'react'

import Rest from '../utils/rest'

const baseURL = 'https://mymoney-gusprado.firebaseio.com/'
const {useGet, usePost, useDelete, usePatch} = Rest(baseURL)

const Movi = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)
  const [dataPatch, patch] = usePatch()
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
        setTimeout(() => {
          dataMeses.refetch()
        }, 3000)
    // }
  }


  const handleRemove = async(id) => {
    await remove(`movimentacoes/${match.params.data}/${id}`)
    data.refetch()
    setTimeout(() => {
      dataMeses.refetch()
    }, 3000)
  }

  const changeIncomeForecast = (evt) => {
    patch(`meses/${match.params.data}`, { previsao_entrada: evt.target.value })
  }

  const changeOutcomeForecast = (evt) => {
    patch(`meses/${match.params.data}`, { previsao_saida: evt.target.value })
  }

  return (
    <div className="container">
      <h1>Movimentações</h1>
      {
        !dataMeses.loading && <div>
          Previsão entrada: {dataMeses.data.previsao_entrada} <input type="text" onBlur={changeIncomeForecast}/> / Previsão saída: {dataMeses.data.previsao_saida} <input type="text" onBlur={changeOutcomeForecast} /><br/>
          Entradas: {dataMeses.data.entradas} / Saídas: {dataMeses.data.saidas}
          </div>
      }
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