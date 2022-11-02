import { Grid } from '@mantine/core'
import React, { useContext, useEffect } from 'react';

import { ToDoHeader } from '../ToDoHeader';
import { Form } from '../Form/index.jsx';
import { List } from '../List/index.jsx';
import { SettingsContext } from '../../Context/settings.jsx';

import './ToDo.scss';

const ToDo = () => {

  const {
    list, setList,
    incomplete, setIncomplete,
    sort
  } = useContext(SettingsContext)

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
      <ToDoHeader incomplete={incomplete} />
      <Grid className='todo-body'>
        <Grid.Col xs={12} sm={4}>
          <Form />
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <List />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ToDo;
