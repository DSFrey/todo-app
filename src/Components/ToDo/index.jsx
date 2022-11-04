/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mantine/core'
import React, { useContext, useEffect } from 'react';

import { ToDoHeader } from '../ToDoHeader';
import { Form } from '../Form/index.jsx';
import { List } from '../List/index.jsx';
import { SettingsContext } from '../../Context/settings.jsx';

import './ToDo.scss';
import { Auth } from '../Auth';

const ToDo = () => {

  const {
    list,
    incomplete, setIncomplete,
  } = useContext(SettingsContext)

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <Auth capability="read">
      <ToDoHeader incomplete={incomplete} />
      <Grid className='todo-body'>
        <Grid.Col xs={12} sm={4}>
          <Auth capability="create">
            <Form />
          </Auth>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <List />
        </Grid.Col>
      </Grid>
    </Auth>
  );
};

export default ToDo;
