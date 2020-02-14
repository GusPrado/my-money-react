import {useEffect, useReducer} from 'react';
import axios from 'axios'

// axios
//   .get('https://mymoney-gusprado.firebaseio.com/value.json')
//   .then(res => {
//     console.log(res)
//   })

// pure function - better for test purposes
const reducer = (state, action) => {
  // console.log('state', state, 'action', action)
  //manipular o estado
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }
  
  return state
}

const useGet = url => {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  } )

  useEffect(() => {
    dispatch({ type: 'REQUEST'})
    axios
      .get(url)
      .then(res => {
        dispatch({ type: 'SUCCESS', data: res.data })
        })
  }, [url])

  return data
}

export default useGet