import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20
  },
  alert: {
    width: 500
  }
}))

export default function AlertError({message}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert className={classes.alert} variant="filled" severity="error">
        {message}
      </Alert>
    </div>
  )
}