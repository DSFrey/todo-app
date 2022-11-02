import { useContext } from "react";
import { v4 as uuid } from 'uuid';
import { SettingsContext } from "../../Context/settings";
import useForm from "../../hooks/form";

export const Form = () => {
  const { list, setList, defaultValues } = useContext(SettingsContext)
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log('item',item);
    if (item.id !== list[list.length - 1]?.id) setList([...list, item]);
    console.log('list',list[0])
  }

  return (
    <form onSubmit={handleSubmit}>

      <h2>Add To Do Item</h2>

      <label>
        <span>To Do Item</span>
        <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
      </label>

      <label>
        <span>Assigned To</span>
        <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
      </label>

      <label>
        <span>Difficulty</span>
        <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
      </label>

      <label>
        <button type="submit">Add Item</button>
      </label>
    </form>
  )
}