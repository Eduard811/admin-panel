import React, {useEffect} from 'react'
import Head from 'next/head'
import { fetchTeammates } from '../http/teammateAPI'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  root: {
    maxWidth: 345,
    marginTop: 20
  },
})

export default function Home({response}) {

  const classes = useStyles()
  
  return (
    <div className={classes.container}>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Quins</h1>
      {
        response.map(el => 
        <Card  key={el._id} className={classes.root}>
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
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
        )
      }
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetchTeammates()
  return {
    props: {response}, 
  }
}

