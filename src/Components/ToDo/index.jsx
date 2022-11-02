import { Grid, Footer } from '@mantine/core'
import React, { useContext, useEffect } from 'react';

import { AppNavbar } from '../Navbar';
import { AppHeader } from '../Header';
import { Form } from '../Form/index.jsx';
import { List } from '../List/index.jsx';
import { SettingsContext } from '../../Context/settings.jsx';

import './ToDo.scss';

const ToDo = () => {

  const { list, incomplete, setIncomplete } = useContext(SettingsContext)

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  return (
    <>
      <AppNavbar />
      <AppHeader incomplete={incomplete} />
      <Grid className='todo-body'>
        <Grid.Col xs={12} sm={4}>
          <Form />
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <List />
        </Grid.Col>
      </Grid>
      <Footer>&copy; 2022 Code Fellows / Daniel Frey</Footer>
    </>
  );
};

export default ToDo;
