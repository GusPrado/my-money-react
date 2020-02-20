import React, {useState } from 'react'

const AddMove = ({ saveNewMove }) => {
  // Form management
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
    await saveNewMove({
      descricao,
        valor: parseFloat(valor)
    })  
      setDescricao('')
      setValor('')
    //}
  }

  return (
    <tr className="text-center">
        <td>
          <input type="text" value={descricao} onChange={handleDesc} placeholder="descrição" />
        </td>
        <td>
          <input type="text" value={valor} onChange={handleValor} placeholder="valor"/>
          <button className="btn btn-success" onClick={handleSave}>+</button>
        </td>
      </tr>
  )
}

export default AddMove