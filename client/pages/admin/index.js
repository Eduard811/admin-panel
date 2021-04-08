import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { createTeammate } from '../../http/teammateAPI'
import MainContainer from '../../components/MainContainer'
import Loader from '../../components/Loader'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 120
  },
  input: {
    display: 'none',
  },
  root: {
    marginTop: 15,
  },
}))

const Main = () => {
  const [worker, setWorker] = useState(false)
  // const [project, setProject] = useState(false)

  const handleClickWorker = () => setWorker(true)
  const handleCloseWorker = () => setWorker(false)
  // const handleClickProject = () => setProject(true)
  // const handleCloseProject = () => setProject(false)

  const { isAuth } = useSelector((state) => state.user)

  const router = useRouter()
  const classes = useStyles()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])

  const [name, setName] = useState('')
  const [profession, setProfession] = useState('')
  const [file, setFile] = useState('')
  
  const selectFile = (event) => setFile(event.target.files[0])

  const addTeammate = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('profession', profession)
    formData.append('picture', file)

    const data = await createTeammate(formData)
    setWorker(false)
    alert('Сотрудник добавлен')
  }
  
  return isAuth ? (
    <MainContainer title={'Главная'}>
      <div className={classes.container}>
        <Button variant="outlined" color="primary" onClick={handleClickWorker}>
          Добавить сотрудника
        </Button>
        <Dialog open={worker} onClose={handleCloseWorker} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Добавить сотрудника</DialogTitle>
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
              value={profession} margin="dense" 
              id="post" label="Должность" 
              type="email" 
              fullWidth 
            />
            <div className={classes.root}>
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
            <Button onClick={handleCloseWorker} color="primary">
              Отмена
            </Button>
            <Button onClick={addTeammate} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Button variant="outlined" color="primary" onClick={handleClickProject}>
          Добавить проект
        </Button>
        <Dialog open={project} onClose={handleCloseProject} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Добавить проект</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="title" label="Название" type="email" fullWidth />
            <TextField margin="dense" id="description" label="Описание" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseProject} color="primary">
              Отмена
            </Button>
            <Button onClick={handleCloseProject} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </MainContainer>
  ) : (
    <Loader />
  )
}

export default Main
