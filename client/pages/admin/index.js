import React from 'react'
import MainContainer from '../../components/MainContainer'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const Main = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MainContainer title={'Главная'}>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Добавить сотрудника
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Добавить сотрудника</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Имя и Фамилия" type="email" fullWidth />
            <TextField margin="dense" id="post" label="Должность" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleClose} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MainContainer>
  )
}

export default Main
