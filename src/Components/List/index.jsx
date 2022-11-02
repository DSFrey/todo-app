import { Pagination } from '@mantine/core'
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

  const filteredList = showComplete ? list : list.filter(item => !item.complete)
  const listToRender = filteredList.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const pageCount = Math.ceil(filteredList.length / itemsPerPage)

  return (
    <>
      {listToRender.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <p><small>{item.id}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}
      {pageCount > 1 ? <Pagination page={page} onChange={setPage} total={pageCount} /> : null}
    </>
  )
}