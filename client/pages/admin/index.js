import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { createTeammate, deleteTeammate } from '../../http/teammateAPI'
import MainContainer from '../../components/MainContainer'
import Loader from '../../components/Loader'
import { getTeammates } from '../../redux/reducers/teammateReducer'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 120,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: 280,
  },
  button: {
    '&:first-child': {
      marginTop: 'unset',
    },
    marginTop: 10,
  },
  input: {
    display: 'none',
  },
  inputWrap: {
    marginTop: 15,
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  grid: {
    maxWidth: '100%',
    width: 320,
  },
  dialogContent: {
    width: 320,
    padding: 'unset',
    '&:first-child': {
      paddingTop: 'unset'
    }
  }
}))

const Main = () => {
  const [worker, setWorker] = useState(false)
  const [deleteWorker, setDeleteWorker] = useState(false)
  const [updateWorker, setUpdateWorker] = useState(false)

  const onClickWorker = () => setWorker(!worker)
  const onClickDeleteWorker = () => setDeleteWorker(!deleteWorker)
  const onClickUpdateWorker = () => setUpdateWorker(!updateWorker)

  const { isAuth } = useSelector((state) => state.user)
  const { teammates } = useSelector((state) => state.teammate)

  const dispatch = useDispatch()

  const router = useRouter()
  const classes = useStyles()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])

  useEffect(() => {
    dispatch(getTeammates())
  }, [])

  const [name, setName] = useState('')
  const [profession, setProfession] = useState('')
  const [file, setFile] = useState('')

  const selectFile = (event) => setFile(event.target.files[0])

  const addTeammate = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('profession', profession)
    formData.append('picture', file)

    createTeammate(formData).then(() => {
      setName('')
      setProfession('')
      setFile('')
      dispatch(getTeammates())
      setWorker(false)
      alert('Сотрудник добавлен')
    })
  }

  const onDeleteTeammate = (id) => {
    deleteTeammate(id).then(() => {
      dispatch(getTeammates())
    })
    setDeleteWorker(false)
    alert('Сотрудник удален')
  }

  return isAuth ? (
    <MainContainer title={'Главная'}>
      <div className={classes.container}>
        <div className={classes.buttonWrap}>
          <Button className={classes.button} variant="outlined" color="primary" onClick={onClickWorker}>
            Добавить сотрудника
          </Button>
          <Button className={classes.button} variant="outlined" onClick={onClickUpdateWorker}>
            Редактировать сотрудника
          </Button>
          <Button className={classes.button} variant="outlined" color="secondary" onClick={onClickDeleteWorker}>
            Удалить сотрудника
          </Button>
        </div>
        <Dialog open={worker} onClose={onClickWorker} aria-labelledby="form-dialog-title">
          <DialogContent>
            <TextField
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
              margin="dense"
              id="name"
              label="Имя и Фамилия"
              type="email"
              fullWidth
            />
            <TextField
              onChange={(e) => setProfession(e.target.value)}
              value={profession}
              margin="dense"
              id="post"
              label="Должность"
              type="email"
              fullWidth
            />
            <div className={classes.inputWrap}>
              <input
                onChange={selectFile}
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Фотография
                </Button>
              </label>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClickWorker} color="primary">
              Отмена
            </Button>
            <Button onClick={addTeammate} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteWorker} onClose={onClickDeleteWorker} aria-labelledby="form-dialog-title">
          <DialogContent className={classes.dialogContent}>
            <Grid item xs={12} md={6} className={classes.grid}>
                <List>
                  {teammates.map((el) => (
                    <ListItem key={el._id}>
                      <ListItemAvatar>
                        <Avatar alt="" src={'http://localhost:5000/' + el.picture} />
                      </ListItemAvatar>
                      <ListItemText primary={el.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTeammate(el._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog open={updateWorker} onClose={onClickUpdateWorker} aria-labelledby="form-dialog-title">
          <DialogContent className={classes.dialogContent}>
            <List>
              {teammates.map((el) => {
                return (
                  <ListItem key={el.id} button>
                    <ListItemAvatar>
                      <Avatar alt="" src={'http://localhost:5000/' + el.picture} />
                    </ListItemAvatar>
                    <ListItemText primary={el.name} />
                  </ListItem>
                )
              })}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    </MainContainer>
  ) : (
    <Loader />
  )
}

export default Main
