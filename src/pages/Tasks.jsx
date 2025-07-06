import React from 'react'
import TaskList from '../components/TaskList'
import { useState } from "react";
import AddTaskForm from '../components/AddTaskForm';
import SearchBar from '../components/SearchBar';

export default function Tasks() {

  const [tasks, setTasks] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [filteredTasks, setFilteredTasks]= useState([])

  const handleDelete = (taskId, taskTitle) => {
    if (window.confirm(`确定删除任务"${taskTitle}"吗？`)) {
      const newTasks = tasks.filter(task => task.id !== taskId)
      setTasks(newTasks)
    }
  }

  const handleToggle = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: Date.now() }
        : task
    ))
  }

  const handleEdit = (taskId, updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updatedTask, updatedAt: Date.now() }
        : task
    ))
  }

  const handleSearch = (tasks) => {
    setIsSearching(true)
  }

  return (
    <>
      <div><SearchBar onSearch={handleSearch}/></div>
      <div><AddTaskForm setTasks={setTasks} /></div>
      <div><TaskList tasks={isSearching?filteredTasks:tasks} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit}/></div> 
    </>
  )
}
