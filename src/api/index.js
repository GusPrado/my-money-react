import Rest from '../utils/rest'

const baseURL = 'https://mymoney-gusprado.firebaseio.com/'
const {useGet, usePost, useDelete, usePatch} = Rest(baseURL)

export const useMonthApi = (data) => {
  const infoMonth = useGet(`meses/${data}`)
  const [dataPatch, changeMonth] = usePatch(`meses/${data}`)
  return { infoMonth, changeMonth }
}

export const useMoveApi = (data) => {
  const move = useGet(`movimentacoes/${data}`)
  const [postData, saveNewMove] = usePost(`movimentacoes/${data}`)
  const [removeData, removeMove] = useDelete('')
  return { move, saveNewMove, removeMove}
}
