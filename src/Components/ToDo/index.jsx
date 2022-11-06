/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Text } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import { ToDoHeader } from '../ToDoHeader';
import { Form } from '../Form/index.jsx';
import { List } from '../List/index.jsx';

import { Auth } from '../Auth';
import { AuthContext } from '../../Context/auth';
import { SettingsContext } from '../../Context/settings.jsx';
import './ToDo.scss';

const ToDo = () => {
  const [loading, setLoading] = useState(true)
  const { cookies } = useContext(AuthContext)
  const {
    sort,
    list, setList,
    incomplete, setIncomplete,
  } = useContext(SettingsContext)

  useEffect(() => {
    try {
      (async () => {
        let response = await axios({
          baseURL: 'https://api-js401.herokuapp.com/',
          url: `/api/v1/todo/`,
          method: 'get',
          headers: {
            Authorization: `Bearer: ${cookies.auth}`
          }
        })
        let newList = response.data.results.sort((a, b) => a[sort] < b[sort] ? -1 : 1)
        setList(newList);
        setLoading(false);
      })();
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
          {loading
            ? <Text> Loading...</Text>
            : <List />}
        </Grid.Col>
      </Grid>
    </Auth>
  );
};

export default ToDo;
