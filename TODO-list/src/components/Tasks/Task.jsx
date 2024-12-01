import React from 'react'
import TaskFormCreate from './TaskFormCreate'
import ShowTasks from './ShowTasks'

const Task = () => {
  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <h3>Create new Task</h3>
        <TaskFormCreate/>
      </div>
      <div>
        <h3>All Tasks</h3>
        <ShowTasks/>
      </div>
    </div>
  )
}

export default Task