import React, { useContext } from 'react'
import { Outlet, NavLink} from 'react-router-dom'
import { SettingsContext } from "../contexts/SettingsContext";

export default function Layout() {
  const {settings, updateSettings} = useContext(SettingsContext)

  const onToggle = () => {
    if (settings.theme === 'light') {
      updateSettings({theme:'dark'})
    }
    else{
      updateSettings({theme:'light'})
    }
  }
  return (
    <>
    <nav aria-label='Primary'>
    <NavLink to={"/"}>HomePage</NavLink>
    <NavLink to={"/settings"}>Settings</NavLink>
    <NavLink to={"/tasks"}>Tasks</NavLink>
    <NavLink to={"/timer"}>Timer</NavLink>
    <button onClick={onToggle}>
      →{settings.theme === 'light'?'dark':'light'}
      </button>
    </nav>
    <main role='main'>
    <Outlet />
    </main>
  </>
  )
}
