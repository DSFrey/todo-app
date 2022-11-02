import { createStyles, Header } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    fontSize: theme.colors.lg,
  }
}))

export const AppHeader = (props) => {
  const { classes } = useStyles();
  return (
    <Header data-testid="todo-header">
      <h1 data-testid="todo-h1" className={classes.h1}>To Do List: {props.incomplete} items pending</h1>
    </Header>
  )
}
