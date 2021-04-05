import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BusinessIcon from '@material-ui/icons/Business'
import GroupIcon from '@material-ui/icons/Group'
import ListAltIcon from '@material-ui/icons/ListAlt'
import GradeIcon from '@material-ui/icons/Grade'

import {useDispatch, useSelector} from 'react-redux'
import {handleDrawerToggle} from '../redux/reducers/mainReducer'



const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))


const MainContainer = ({children, title}) => {

    const dispatch = useDispatch()

    const {isOpen} = useSelector(state => state.main)

    const classes = useStyles()
    
    const theme = useTheme()
    
    const onOpen = () => {
      dispatch(handleDrawerToggle(true))
    }

    const onClose = () => {
      dispatch(handleDrawerToggle(false))
    }

    const togglePage = () => {
      setTimeout(() => {
        dispatch(handleDrawerToggle(false))
      })
    }


    return (
      <>

      <Head>
      <title>{title}</title>
      </Head>

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: isOpen,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onOpen}
              edge="start"
              className={clsx(classes.menuButton, isOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link href={'/admin'}>
            <a onClick={togglePage} style={{color: '#fff'}}>
            <Typography variant="h6" noWrap>
              Quins
            </Typography>
            </a>
            </Link>
            
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={onClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[  
                {text: 'Главная', url: '/admin', icon: <GradeIcon />},
                {text: 'Проекты', url: '/admin/project', icon: <BusinessIcon />},
                {text: 'Сотрудники', url: '/admin/worker', icon: <GroupIcon />},
                {text: 'Список задач', url: '/admin/todo', icon: <ListAltIcon />},
              ].map(el => (
                <li key={el.text}>
                    <Link href={el.url}>
                    <a onClick={togglePage}>
                    <ListItem button>
                        <ListItemIcon>{el.icon}</ListItemIcon>
                        <ListItemText>{el.text}</ListItemText>
                    </ListItem>
                    </a>
                    </Link>
                </li>
            ))}
          </List>
          <Divider />
        </Drawer>
        <div
          className={clsx(classes.content, {
            [classes.contentShift]: isOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </div>
      </div>
      </>
    )
}

export default MainContainer
