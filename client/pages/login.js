import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../http/userAPI'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { setIsAuth } from '../redux/reducers/userReducer'

import Head from 'next/head'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login() {


  const [username, setUsername] = useState('')
  const [password, setPasword] = useState('')

  const classes = useStyles()

  const router = useRouter()

  const dispatch = useDispatch()
  const {user, isAuth} = useSelector(state => state.user)

  const signIn = async () => {
    let data
    try {
      data = await login(username, password)
      dispatch(setIsAuth(user, !isAuth))
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    if (isAuth) {
      router.push('/admin')
    }
  }, [isAuth])

  return (
    isAuth ? <Loader /> :
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPasword(e.target.value)}
            />
            <Button onClick={signIn} type="button" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}
