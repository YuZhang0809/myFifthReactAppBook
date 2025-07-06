import React from 'react'
import { useState } from "react";

export default function TaskItem({task, onDelete, onToggle, onEdit}) {

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(task)
  const [errors, setErrors] = useState({});
  // 校验逻辑函数
  const validate = () => {
      const newErrors = {}

      if (!editData.title.trim()) {
          newErrors.title = '任务标题不能为空';
      }
      
      if (editData.priority && !['low', 'medium', 'high'].includes(editData.priority)) {
          newErrors.priority = '优先级必须是 low/medium/high';
      }
      
      return newErrors;
  };   

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleFormChange = (e) => {
    const {name, value} = e.target
    let processedValue = value
    
    // 处理日期字段转换
    if (name === 'dueAt') {
      processedValue = value ? new Date(value).getTime() : null
    }
    
    setEditData((prev) => ({...prev, [name]: processedValue}))
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}))
    }
  }

const handleSubmit = (e) =>{
  e.preventDefault()
  const validationErrors = validate();
  setErrors(validationErrors);
  
  if(Object.keys(validationErrors).length === 0){
      onEdit(task.id,editData)
      setErrors({});
      setIsEditing(false)
  }
}

const handleCancel = () => {
  setIsEditing(false)
  setEditData(task)
}

  return (
    <div>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      {isEditing?
      <div>
        <form onSubmit={handleSubmit}>
          <h2>修改{task.title}</h2>
          
          <div>
            <label>任务标题:</label>
            <input 
              type='text' 
              name='title' 
              onChange={handleFormChange} 
              value={editData.title}
            />
            {errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
          </div>
          
          <div>
            <label>任务描述:</label>
            <input 
              type='text' 
              name='description' 
              onChange={handleFormChange} 
              value={editData.description}
            />
          </div>
          
          <div>
            <label>截止日期:</label>
            <input 
              type='date' 
              name='dueAt' 
              onChange={handleFormChange} 
              value={editData.dueAt ? new Date(editData.dueAt).toISOString().split('T')[0] : ''}
            />
          </div>
          
          <div>
            <label>优先级:</label>
            <input 
              type='radio' 
              name='priority' 
              onChange={handleFormChange} 
              value='high'
              checked={editData.priority === 'high'}
            />
            <label>高</label>
            <input 
              type='radio' 
              name='priority' 
              onChange={handleFormChange} 
              value='medium'
              checked={editData.priority === 'medium'}
            />
            <label>中</label>
            <input 
              type='radio' 
              name='priority' 
              onChange={handleFormChange} 
              value='low'
              checked={editData.priority === 'low'}
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
              value={editData.tags}
            />
          </div>
          
          <button type='submit'>保存</button>
          <button type='button' onClick={handleCancel}>撤销</button>
        </form>
      </div>
      :
      <div>
        <div>
          <span className={task.completed ? 'line-through' : ''}>
            {task.title}
          </span>
          {task.description && (
            <p className={task.completed ? 'line-through' : ''}>
              描述: {task.description}
            </p>
          )}
          {task.priority && <span>优先级: {task.priority}</span>}
          {task.dueAt && <span>截止: {new Date(task.dueAt).toLocaleDateString()}</span>}
        </div>
        <button onClick={() => onDelete(task.id, task.title)}>
          Delete
        </button>
        <button onClick={handleEdit}>
          edit
        </button>
      </div>
      }

    </div>
  )
}
