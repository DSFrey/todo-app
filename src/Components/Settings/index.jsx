import { useContext } from "react"
import { SettingsContext } from "../../Context/settings"

export const Settings = () => {
  const {
    showComplete, setShowComplete,
    itemsPerPage, setItemsPerPage,
    sort, setSort,
    defaultValues, setDefaultValues,
    list,setList,
    incomplete, setIncomplete
  } = useContext(SettingsContext)

}