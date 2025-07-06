import React from 'react'
import { useState } from "react";

export default function AddTaskForm({setTasks}) {

const [formData, setFormData] = useState({
title:'',
description:'',
dueAt:'',
priority:'',
tags:''
})

const [errors, setErrors] = useState({});

// 校验逻辑函数
const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
        newErrors.title = '任务标题不能为空';
    }
    
    if (formData.priority && !['low', 'medium', 'high'].includes(formData.priority)) {
        newErrors.priority = '优先级必须是 low/medium/high';
    }
    
    return newErrors;
};    

const handleFormChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev,[name]:value}))
    // 清除对应字段的错误信息
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: ''}))
    }
}

const handleSubmit = (e) =>{
    e.preventDefault()
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if(Object.keys(validationErrors).length === 0){
        const newTask = {
            ...formData,
            'id':crypto.randomUUID(),
            createdAt:Date.now(),
            updatedAt:Date.now(),
            completed:false,
            dueAt: formData.dueAt ? new Date(formData.dueAt).getTime() : null
        }
        setTasks((prev) => ([newTask,...prev]))    
        setErrors({});
        setFormData({
            title:'',
            description:'',
            dueAt:'',
            priority:'',
            tags:''
        })
    }
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>添加新任务</h2>
      
      <div>
        <label>任务标题:</label>
        <input 
          type='text' 
          name='title' 
          onChange={handleFormChange} 
          value={formData.title}
        />
        {errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
      </div>
      
      <div>
        <label>任务描述:</label>
        <input 
          type='text' 
          name='description' 
          onChange={handleFormChange} 
          value={formData.description}
        />
      </div>
      
      <div>
        <label>截止日期:</label>
        <input 
          type='date' 
          name='dueAt' 
          onChange={handleFormChange} 
          value={formData.dueAt}
        />
      </div>
      
      <div>
        <label>优先级:</label>
        <input 
          type='radio' 
          name='priority' 
          onChange={handleFormChange} 
          value='high'
          checked={formData.priority === 'high'}
        />
        <label>高</label>
        <input 
          type='radio' 
          name='priority' 
          onChange={handleFormChange} 
          value='medium'
          checked={formData.priority === 'medium'}
        />
        <label>中</label>
        <input 
          type='radio' 
          name='priority' 
          onChange={handleFormChange} 
          value='low'
          checked={formData.priority === 'low'}
        />
        <label>低</label>
        {errors.priority && <span style={{color: 'red'}}>{errors.priority}</span>}
      </div>
      
      <div>
        <label>标签:</label>
        <input 
          type='text' 
          name='tags' 
          onChange={handleFormChange} 
          value={formData.tags}
        />
      </div>
      
      <button type='submit'>添加任务</button>
    </form>
  )
}
