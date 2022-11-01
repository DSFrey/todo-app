import { Grid } from '@mantine/core'
import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';

import { v4 as uuid } from 'uuid';
import { AppNavbar } from '../Navbar';
import { AppHeader } from '../Header';
import { Form } from '../Form/index.jsx';
import { List } from '../List/index.jsx';

const ToDo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

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
      <Grid>
        <Grid.Col xs={12} sm={4}>
          <Form handleChange={handleChange} handleSubmit={handleSubmit} defaultValues={defaultValues} />
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <List list={list} toggleComplete={toggleComplete} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ToDo;
