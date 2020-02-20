import React from 'react'

import { useMonthApi } from '../../api'

const InfoMonth = ({data}) => {
  const { infoMonth, changeMonth } = useMonthApi(data)
  const changeIncomeForecast = (evt) => {
    changeMonth({ previsao_entrada: evt.target.value })
  }

  const changeOutcomeForecast = (evt) => {
    changeMonth({ previsao_saida: evt.target.value })
  }

  if (infoMonth.loading){
    return <p>Carregando dados do mês...</p>
  }
  if (infoMonth.data) {
    return (
      <div>
        Previsão entrada: {infoMonth.data.previsao_entrada} <input type="text" onBlur={changeIncomeForecast}/> / Previsão saída: {infoMonth.data.previsao_saida} <input type="text" onBlur={changeOutcomeForecast} /><br/>
        Entradas: {infoMonth.data.entradas} / Saídas: {infoMonth.data.saidas}
        </div>
    )
  }
  return null
}

export default InfoMonth