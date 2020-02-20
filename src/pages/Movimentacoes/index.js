import React from 'react'
import { Redirect } from 'react-router-dom'

import { useMoveApi } from '../../api'
import InfoMonth from './InfoMonth'
import AddMove from './AddMove'

const Movi = ({ match }) => {

  const { move, saveNewMove, removeMove } = useMoveApi(match.params.data)

  const handleSave = async(dados) => {  
      await saveNewMove(dados)
        move.refetch()
        setTimeout(() => {
          //infoMonth.refetch()
        }, 3000)
  }


  const handleRemove = async(id) => {
    await removeMove(`movimentacoes/${match.params.data}/${id}`)
    move.refetch()
    setTimeout(() => {
      //infoMonth.refetch()
    }, 3000)
  }


  if (move.error === 'Permission denied') {
    return <Redirect to='/login' />
  }

  return (
    <div className="container">
      <h1>Movimentações</h1>
      <InfoMonth data={match.params.data} />
     
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th className= "text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          { move.data && 
            Object
              .keys(move.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{move.data[movimentacao].descricao}</td> 
                    <td className= "text-right">
                      {move.data[movimentacao].valor} {' '}
                      <button className="btn btn-danger" onClick={() => handleRemove(movimentacao)}>-</button>
                    </td>
                  </tr>
                )
              })
          }
        <AddMove  saveNewMove={handleSave}/>  
        </tbody>
      </table>
    </div>
  )
}

export default Movi