import {useReducer, useEffect, useCallback} from 'react'
import axios from 'axios'

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: ''
}

const reducer = (state, action) => {
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
  if (action.type === 'FAILURE') {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }
  //if no action returns state w/o modification
  return state
}

const init = baseURL => {

  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const load = useCallback(async() => {
      try{
        dispatch({ type: 'REQUEST'})
        const res = await axios.get(`${baseURL}${resource}.json`)
        dispatch({ type: 'SUCCESS', data: res.data })
      }catch(err){
        dispatch({ type: 'FAILURE', error: 'error loading data' })
      }

    }, [resource])
  
    useEffect(() => {
      load()
    }, [load, resource])
  
    return {
      ...data,
      refetch: load
    }
  }

  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  
    const post = async (data) => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.post(`${baseURL}${resource}.json`, data)
      dispatch({
        type: 'SUCCESS',
        data: res.data
      })
    }
    return [data, post]
  }

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  
    const remove = async (resource) => {
      dispatch({ type: 'REQUEST' })
      await axios.delete(`${baseURL}${resource}.json`)
      dispatch({ type: 'SUCCESS' }) 
    }
    return [data, remove]
  }

  const usePatch= () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  
    const patch = async (resource, data) => {
      dispatch({ type: 'REQUEST' })
      await axios.patch(`${baseURL}${resource}.json`, data)
      dispatch({ type: 'SUCCESS' }) 
    }
    return [data, patch]
  }

  return {
    useGet, 
    usePost,
    useDelete,
    usePatch
  }
}

export const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

  const post = async (data) => {
    dispatch({ type: 'REQUEST' })
    try {
      const res = await axios.post(resource, data)
      dispatch({
        type: 'SUCCESS',
        data: res.data
      })
      return res.data
    } catch(err){
      console.log(err.message)
      dispatch({
        type: 'FAILURE',
        data: 'sign-in error'
      })
    }
    
  }
  return [data, post]
}



export default init