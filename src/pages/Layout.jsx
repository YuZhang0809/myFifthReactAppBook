import React from 'react'
import { Outlet, NavLink} from 'react-router-dom'

export default function layout() {
  return (
    <>
    <nav aria-label='Primary'>
    <NavLink to={"/"}>HomePage</NavLink>
    <NavLink to={"/settings"}>Settings</NavLink>
    <NavLink to={"/tasks"}>Tasks</NavLink>
    <NavLink to={"/timer"}>Timer</NavLink>
    </nav>
    <main role='main'>
    <Outlet />
    </main>
  </>
  )
}
