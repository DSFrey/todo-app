import React, {useState} from "react";

const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [showComplete, setShowComplete] = useState(true)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [sort, setSort] = useState('difficulty')
  const [defaultValues, setDefaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const values = {
    showComplete, setShowComplete,
    itemsPerPage, setItemsPerPage,
    sort, setSort,
    defaultValues, setDefaultValues,
    list,setList,
    incomplete, setIncomplete
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }
