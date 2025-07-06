import React from 'react'
import TaskItem from "./TaskItem";

export default function Tasklist({tasks, onDelete, onToggle, onEdit}) {
  return (
    <div>
      {tasks.length === 0 ? <p>Nothing here</p> :
        tasks.map(
          task => <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit}/>
        )
      }
    </div>
  )
}
