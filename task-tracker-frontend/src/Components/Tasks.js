import React, { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import TaskList from './TaskList'
import { loadTasks, saveTaskToApi } from '../Api/taskApi'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTaskCount, setNewTaskCount] = useState(0)

  useEffect(() => {
    loadTasks()
      .then(item => {
        console.log(item)
        return setTasks(item)
      })
  }, [newTaskCount])

  const saveTask = (task) => {
    saveTaskToApi(task)
    .then(res => {
      const updatedTaskCount = newTaskCount + 1
      setNewTaskCount(updatedTaskCount)
    })
  }

  return (
    <>
      <TaskList tasks={tasks}></TaskList>
      <CreateTask saveTask={saveTask}></CreateTask>
    </>
  )
}

export default Tasks