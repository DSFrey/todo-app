/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mantine/core'
import React, { useContext, useEffect } from 'react';

import { ToDoHeader } from '../ToDoHeader';
import { Form } from '../Form/index.jsx';
import { List } from '../List/index.jsx';

import { Auth } from '../Auth';
import { AuthContext } from '../../Context/auth';
import { SettingsContext } from '../../Context/settings.jsx';
import { useAxios } from '../../hooks/api';
import './ToDo.scss';

const ToDo = () => {

  const { cookies } = useContext(AuthContext)
  const {
    list, setList,
    incomplete, setIncomplete,
  } = useContext(SettingsContext)

  useEffect(() => {
    try {
      let retrievedList = useAxios({
        baseURL: 'https://api-js401.herokuapp.com/',
        url: `/api/v1/todo/`,
        method: 'get',
        headers: {
          Authorization: `Bearer: ${cookies.auth}`
        }
      })
      setList(retrievedList);
    } catch (error) {
      console.error();
    }
  }, [])

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
