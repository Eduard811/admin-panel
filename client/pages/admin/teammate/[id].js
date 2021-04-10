import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import MainContainer from '../../../components/MainContainer'
import { fetchTeammate, updateTeammate } from '../../../http/teammateAPI'
import Loader from '../../../components/Loader'
import { useStyles } from '../index'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

export default function Teammate({ data }) {
  const { isAuth } = useSelector((state) => state.user)
  const router = useRouter()

  const classes = useStyles()

  const [name, setName] = useState(data.name)
  const [profession, setProfession] = useState(data.profession)
  const [file, setFile] = useState(null)

  const selectFile = (event) => setFile(event.target.files[0])

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])

  const update = () => {
    const formData = new FormData()
    formData.append('_id', data._id)
    formData.append('name', name)
    formData.append('profession', profession)
    formData.append('pictureName', data.picture)
    if (!!file) {
      formData.append('picture', file)
    }

    updateTeammate(formData).then(() => {
      alert('Сотрудник обновлен')
    })
  }

  return isAuth ? (
    <MainContainer title={data.name}>
      <Container className={classes.container} maxWidth="sm">
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
            <Button variant="contained" component="span">
              Изменить фотографию
            </Button>
          </label>
        </div>
        <Button onClick={update} variant="contained" component="span" color="primary">
              Обновить
        </Button>
      </Container>
    </MainContainer>
  ) : (
    <Loader />
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await fetchTeammate(params.id)

  return {
    props: { data },
  }
}
