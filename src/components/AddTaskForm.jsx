import React from 'react'
import { useState } from "react";

export default function AddTaskForm({setTasks}) {

const [formData, setFormData] = useState({
id:'',
description:'',
dueAt:'',
priority:'',
tags:''
})

const handleFormChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setFormData((prev) => ({...prev,[name]:value}))
}

const handleSubmit = (e) =>{
    e.preventDefault()
    const newTask = {...formData,'id':crypto.randomUUID(),createdAt:Date.now(),updatedAt:Date.now()}
    setTasks(
        (prev) => ([newTask,...prev])
    )
}
  return (
    <>
        <form onSubmit={handleSubmit}>
            <h2>AddTaskForm</h2>
            <div>
                <label>title:</label>
                <input type='text' name='title' onChange={handleFormChange} value={formData.title}/>
            </div>
            <div>
                <label>description:</label>
                <input type='text' name='description' onChange={handleFormChange} value={formData.description}/>                
            </div>
            <div>
                <label>dueAt:</label>
                <input type='date' name='dueAt' onChange={handleFormChange} value={formData.dueAt}/>
            </div>
            <div>
                <label>priority:</label>
                <input type='text' name='priority' onChange={handleFormChange} value={formData.priority}/>
            </div>
            <div>
                <label>tags:</label>
                <input type='text' name='tags' onChange={handleFormChange} value={formData.tags}/>
            </div>
            <button type='submit'>submit</button>
        </form>
    </>

  )
}
