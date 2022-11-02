import { Badge, Card, CloseButton, Pagination, Text } from '@mantine/core'
import './list.scss'
import { useContext, useState } from "react"
import { SettingsContext } from "../../Context/settings"

export const List = () => {
  const {
    list, setList,
    itemsPerPage,
    showComplete
  } = useContext(SettingsContext)
  const [page, setPage] = useState(1);

  function deleteItem(id) {
    console.log(id)
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          complete: !item.complete
        };
      }
      return item;
    });
    setList(items);
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
            <CloseButton onClick={() => deleteItem(item.id)}/>
          </Card.Section>
          <Card.Section className='task-body'><Text>{item.text}</Text></Card.Section>
          <Card.Section className='task-difficulty'><Text><small>Difficulty: {item.difficulty}</small></Text></Card.Section>
        </Card>
      ))}
      {pageCount > 1 ? <Pagination page={page} onChange={setPage} total={pageCount} /> : null}
    </>
  )
}