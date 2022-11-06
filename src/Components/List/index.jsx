/* eslint-disable react-hooks/rules-of-hooks */
import { Badge, Card, CloseButton, Pagination, Text } from '@mantine/core'
import './list.scss'
import { useContext, useState } from "react"
import { SettingsContext } from "../../Context/settings"
import { AuthContext } from '../../Context/auth'
import { Auth } from '../Auth'
import { useAxios } from '../../hooks/api'

export const List = () => {
  const {
    list, setList,
    itemsPerPage,
    showComplete,
  } = useContext(SettingsContext)
  const { can, cookies } = useContext(AuthContext)
  const [page, setPage] = useState(1);

  function deleteItem(id) {
    console.log(id)
    try {
      useAxios({
        baseURL: 'https://api-js401.herokuapp.com/',
        url: `/api/v1/todo/${id}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer: ${cookies.auth}`
        }
      })
      const items = list.filter(item => item.id !== id);
      setList(items);
    } catch (error) {
      
    }
  }

  function toggleComplete(id) {
    if (!can('update')) return;
    let updatedItem;
    const items = list.map(item => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          complete: !item.complete
        };
        return updatedItem;
      }
      return item;
    });
    try {
      useAxios({
        baseURL: 'https://api-js401.herokuapp.com/',
        url: `/api/v1/todo/${id}`,
        method: 'put',
        data: updatedItem,
        headers: {
          Authorization: `Bearer: ${cookies.auth}`
        }
      })
      setList(items);
    } catch (error) {
      console.error();
    }
  }

  const filteredList = showComplete ? list : list.filter(item => !item.complete)
  const listToRender = filteredList.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const pageCount = Math.ceil(filteredList.length / itemsPerPage)

  return (
    <>
      {listToRender.map(item => (
        <Card key={item.id} withBorder shadow="sm" >
          <Card.Section withBorder className='task-title'>
            {
              item.complete
                ? <Badge color='green' onClick={() => toggleComplete(item.id)}>Complete</Badge>
                : <Badge color='red' onClick={() => toggleComplete(item.id)}>Pending</Badge>
            }
            <Text>{item.assignee}</Text>
            <Auth capability="delete"><CloseButton onClick={() => deleteItem(item.id)} /></Auth>
          </Card.Section>
          <Card.Section className='task-body'><Text>{item.text}</Text></Card.Section>
          <Card.Section className='task-difficulty'><Text><small>Difficulty: {item.difficulty}</small></Text></Card.Section>
        </Card>
      ))}
      {pageCount > 1 ? <Pagination page={page} onChange={setPage} total={pageCount} /> : null}
    </>
  )
}