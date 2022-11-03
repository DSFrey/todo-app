import React, { useState } from "react";

const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  let settings = JSON.parse(localStorage.getItem('settings')) || {
    showComplete: true,
    itemsPerPage: 3,
    sort: 'difficulty'
  }

  const [showComplete, setShowComplete] = useState(settings.showComplete)
  const [itemsPerPage, setItemsPerPage] = useState(settings.itemsPerPage)
  const [sort, setSort] = useState(settings.sort)
  const [defaultValues, setDefaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const values = {
    showComplete, setShowComplete,
    itemsPerPage, setItemsPerPage,
    sort, setSort,
    defaultValues, setDefaultValues,
    list, setList,
    incomplete, setIncomplete
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }
