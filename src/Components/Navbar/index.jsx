import { createStyles, Navbar, Text } from '@mantine/core';

const useStyles = createStyles((theme) => {
  return({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    color: theme.colors.gray[0],
    fontSize: theme.colors.md,
    padding: theme.spacing.md,
  }
})})

export const AppNavbar = () => {
  const { classes } = useStyles();

  return (
    <Navbar className={classes.navbar}>
      <Text>Home</Text>
    </Navbar>
  )
}