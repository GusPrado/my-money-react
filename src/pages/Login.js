import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { usePost } from '../utils/rest'

const authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP8v8hfjtHO3QewKn-qkEaXlwPhD9pNGg'

const Login = () => {
  const [postData, signin] = usePost(authURL)
  const [logged, setLogged] = useState(false)
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem('token', postData.data.idToken)
      window.location.reload()
    }
  }, [postData])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogged(true)
    }
  }, [])

  const login = async() => {
    await signin({
      email,
	    password: passwd,
	    returnSecureToken: true
    })
    
    //imperative - store data from here (like Token)
    //console.log('TOKEN>>>', token -> const token = await sigin...)
  }

  const onChangeEmail = evt => {
    setEmail(evt.target.value)
  }

  const onChangePasswd = evt => {
    setPasswd(evt.target.value)
  }

  if (logged) {
    return < Redirect to='/' />
  }


  return (
    <div>
      <h1>Controle seu dinheiro</h1>
      {
        postData.error && postData.error.length > 0 &&
        <p>E-mail e/ou senha incorretos</p>
      }
      {/* <pre>{JSON.stringify(postData)}</pre> */}
      <input type="email" value={email} onChange={onChangeEmail} placeholder="Insira seu e-mail"/>
      <input type="password" value={passwd} onChange={onChangePasswd} placeholder="Digite sua senha"/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login