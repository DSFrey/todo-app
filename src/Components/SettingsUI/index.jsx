/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { SettingsContext } from "../../Context/settings"
import { Card, Header, NumberInput, Select, Switch, Text } from '@mantine/core'
import { IconSettings } from '@tabler/icons'
import './SettingsUI.scss'

export const SettingsUI = () => {
  const {
    showComplete, setShowComplete,
    itemsPerPage, setItemsPerPage,
    sort, setSort,
    list, setList
  } = useContext(SettingsContext)

  useEffect(() => {
    let sortedList = list.sort((a,b) => a[sort] < b[sort] ? -1 : 1);
    setList(sortedList)
  }, [sort])

  return (
    <>
      <Header data-testid="settings-header">
        <h1 data-testid="settings-h1" className="SettingsUI">
          <IconSettings size={48} />
          <Text>Manage Settings</Text>
        </h1>
      </Header>
      <Card className="settings-card" withBorder shadow='sm'>
        <Text size="lg" weight={500}>Update Settings</Text>

        <Switch
          label="Show Completed"
          checked={showComplete}
          onChange={(event) => setShowComplete(event.target.checked)}
        />
        <NumberInput
          label="Items per Page"
          defaultValue={itemsPerPage}
          placeholder={itemsPerPage}
          onChange={(value) => setItemsPerPage(value)}
        />

        <Select
          label="Sort Keyword"
          defaultValue={sort}
          data={[
            { value: 'difficulty', label: 'Difficulty' },
            { value: 'assignee', label: 'Assignee' },
            { value: 'text', label: 'Assignment' },
            { value: 'complete', label: 'Complete' },
          ]}
          onChange={(value) => setSort(value)}
        />
      </Card>

    </>
  )
}