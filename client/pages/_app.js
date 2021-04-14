import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import { wrapper } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuth } from '../redux/reducers/userReducer'
import { check } from '../http/userAPI'
import Loader from '../components/Loader'


function MyApp({ Component, pageProps }) {
  
  const {isAuth} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isFetching, setIsFetching] = useState(true)
  
  useEffect(() => {
    check().then(data => {
      dispatch(setIsAuth(data, !isAuth))
    }).catch(error => {
      console.log(error.response.data.message)
    }).finally(() => {
      setIsFetching(false)
    })
  }, [])

  if (isFetching) {
    return <Loader />
  }
 

  return (<Component {...pageProps} />)
}

export default wrapper.withRedux(MyApp)
