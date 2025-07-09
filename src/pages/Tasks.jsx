import React from 'react'
import TaskList from '../components/TaskList'
import { useReducer } from "react";
import AddTaskForm from '../components/AddTaskForm';
import SearchBar from '../components/SearchBar';

const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  CLEAR_SEARCH: 'CLEAR_SEARCH'
}

const initialState = {
  tasks:[],
  searchQuery: '',
  isSearching:false
}

function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      { 
        const newTasks = [action.payload, ...state.tasks]
        localStorage.setItem('tasks',JSON.stringify(newTasks))
        return{
          ...state,
          tasks:newTasks
        } }
    case ACTIONS.DELETE_TASK:
    {  
      const newTasks = state.tasks.filter(task => task.id !== action.payload)
      localStorage.setItem('tasks',JSON.stringify(newTasks))
      return{
          ...state,
          tasks:newTasks
        }}
    case ACTIONS.EDIT_TASK:
      return{
        ...state,
        tasks:state.tasks.map(task => 
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updatedTask, updatedAt: Date.now() }
            : task
       )
      }
    case ACTIONS.TOGGLE_TASK:
      return{
        ...state,
        tasks:state.tasks.map(task => 
          task.id === action.payload
            ? { ...task, completed: !task.completed, updatedAt: Date.now() }
            : task)
      }
    case ACTIONS.SET_SEARCH_QUERY:
      if (action.payload) {
        return { 
          ...state,
          searchQuery: action.payload,
          isSearching: true
        }
      }
      else{
        return {
          ...state, 
          searchQuery: '',
          isSearching: false
        }
      }
  
    default:
      return state;
  }
}

function initState(initialState) {
  const savedTasks = localStorage.getItem('tasks')
  return {
    ...initialState,
    tasks: savedTasks ? JSON.parse(savedTasks) : []
  }
}

export default function Tasks() {



  const [state, dispatch] = useReducer(tasksReducer, initialState, initState)
  const filteredTasks = state.isSearching 
  ? state.tasks.filter(task => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
  : state.tasks
  
  console.log(state);

  const handleAddTask = (newTask) => {
    dispatch({type:ACTIONS.ADD_TASK, payload:newTask})
  }

  const handleDelete = (taskId, taskTitle) => {
    if (window.confirm(`确定删除任务${taskTitle}吗？`)) {
      dispatch({type:ACTIONS.DELETE_TASK, payload:taskId})
    }
  }

  const handleToggle = (taskId) => {
    dispatch({type:ACTIONS.TOGGLE_TASK, payload:taskId})
  }

  const handleEdit = (taskId, updatedTask) => {
    dispatch({type:ACTIONS.EDIT_TASK, payload:{taskId:taskId, updatedTask:updatedTask}})
  }

  const handleSearch = (searchQuery) => {
    dispatch({type:ACTIONS.SET_SEARCH_QUERY, payload:searchQuery})
  }


  return (
    <>
      <div><SearchBar onSearch={handleSearch}/></div>
      <div><AddTaskForm onAddTasks={handleAddTask}/></div>
      <div><TaskList tasks={state.isSearching?filteredTasks:state.tasks} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit}/></div> 
    </>
  )
}
