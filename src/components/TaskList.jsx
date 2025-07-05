import React from 'react'
import TaskItem from "./TaskItem";

export default function Tasklist({tasks}) {
  return (
    <div>
      {console.log(tasks)}
        {tasks.length === 0?<p>Nothing here</p>:
        tasks.map(
            task => <TaskItem key={task.id} task={task} />
        )}
    </div>
  )
}
