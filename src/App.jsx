import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Timer from './pages/Timer'
import Tasks from "./pages/Tasks";

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='index' element={<Dashboard/>}></Route>
        <Route path='settings' element={<Settings/>}></Route>
        <Route path='tasks' element={<Tasks/>}></Route>
        <Route path='timer' element={<Timer/>}></Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
