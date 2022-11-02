import { createStyles, Navbar, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => {
  return ({
    navbar: {
      backgroundColor: theme.colors.blue[7],
      color: theme.colors.gray[0],
      fontSize: theme.colors.md,
      padding: theme.spacing.md,
      flexDirection: 'row'
    },
    anchor: {
      color: theme.colors.gray[0],
      padding: '0 1em'
    }
  })
})

export const AppNavbar = () => {
  const { classes } = useStyles();

  return (
    <Navbar className={classes.navbar}>
      <Anchor component={Link} to='/' className={classes.anchor}>Home</Anchor>
      <Anchor component={Link} to='/settings' className={classes.anchor}>Settings</Anchor>
    </Navbar>
  )
}