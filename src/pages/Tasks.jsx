import React from 'react'
import TaskList from '../components/TaskList'
import { useState } from "react";
import AddTaskForm from '../components/AddTaskForm';

const Tasks_Test = [{
  id:'1',
  title:'Task1',
  completed:false,
  createdAt:111,
  updatedAt:111
  },{
  id:'2',
  title:'Task2',
  completed:false,
  createdAt:111,
  updatedAt:111
  
  }]

export default function Tasks() {

  const [tasks, setTasks]  = useState(Tasks_Test)


  return (
    <>
      <div><AddTaskForm setTasks = {setTasks}/></div>
      <div><TaskList tasks={tasks}/></div> 
    </>
  )
}
