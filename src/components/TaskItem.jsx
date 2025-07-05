import React from 'react'

export default function TaskItem({task}) {
  return (
    <div>
        <li>{task.id}</li>
        <li>{task.title}</li>
        <li>{task.completed}</li>
    </div>
  )
}
