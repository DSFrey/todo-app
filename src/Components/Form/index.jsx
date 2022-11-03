import { useContext } from "react";
import { v4 as uuid } from 'uuid';
import { SettingsContext } from "../../Context/settings";
import useForm from "../../hooks/form";
import { Button, Card, Slider, Text, TextInput } from '@mantine/core'

export const Form = () => {
  const { list, setList, sort, defaultValues } = useContext(SettingsContext)
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log('item', item);
    let newList = [...list, item]
    newList.sort((a,b) => a[sort] < b[sort] ? -1 : 1)
    setList(newList);
  }

  return (
    <Card withBorder shadow='sm'>
      <form onSubmit={handleSubmit}>

        <Text>Add To Do Item</Text>

        <TextInput
          name="text"
          label="To Do Item"
          placeholder="Item Details"
          onChange={handleChange}
        />
        <TextInput
          name="assignee"
          label="Assigned To"
          placeholder="Assignee Name"
          onChange={handleChange}
        />

        <Text>Difficulty</Text>
        <Slider
          name="difficulty"
          type="range"
          onChange={handleChange}
          defaultValue={defaultValues.difficulty}
          min={0}
          max={5}
          mb="lg"
        />
        <Button type="submit">Add Item</Button>
      </form>
    </Card>
  )
}