import React, { createContext } from 'react'
import { useSettings } from '../hooks/useSettings'

const SettingsContext = createContext(null)

const SettingsProvider = ({children}) => {
  const {settings, updateSettings} = useSettings()
  const value = {settings, updateSettings}

  return(
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider}