import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    transform: 'translateY(-50%)',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

export default function Loader() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}