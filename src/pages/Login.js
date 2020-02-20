import React, {useEffect} from 'react'
import {usePost} from '../utils/rest'

const authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP8v8hfjtHO3QewKn-qkEaXlwPhD9pNGg'

const Login = () => {
  const [postData, signin] = usePost(authURL)
  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem('token', postData.data.idToken)
    }
  }, [postData])

  const login = async() => {
    await signin({
      email: "gustavo.gpprado@gmail.com",
	    password: "abc1231",
	    returnSecureToken: true
    })
    //imperative - store data from here (like Token)
    //console.log('TOKEN>>>', token -> const token = await sigin...)
  }
  return (
    <div>
      <h1>Login</h1>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login