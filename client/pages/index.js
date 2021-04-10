import React, { useEffect } from 'react'
import Head from 'next/head'
import { fetchTeammates } from '../http/teammateAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setTeammates } from '../redux/reducers/teammateReducer'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px 0 20px 0',
  },
  card: {
    maxWidth: 345,
    marginTop: 20,
    '&:first-child': {
      marginTop: 'unset',
    },
  },
})

export default function Home({ response }) {
  const classes = useStyles()

  const dispach = useDispatch()

  const { teammates } = useSelector((state) => state.teammate)

  useEffect(() => {
    dispach(setTeammates(response))
  }, [])

  return (
    <div className={classes.container}>
      <Head>
        <title>Home</title>
      </Head>
      {teammates.map((el) => (
        <Card key={el._id} className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="500"
              image={'http://localhost:5000/' + el.picture}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {el.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {el.profession}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetchTeammates()
  return {
    props: { response },
  }
}
