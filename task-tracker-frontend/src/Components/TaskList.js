import React, { useState, useEffect } from 'react'
import { loadTasks } from '../Api/taskApi'

function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    loadTasks()
      .then(item => {
        console.log(item)
        return setTasks(item)
      })
  }, [])


  const getTaskList = (taskDay) => {
    console.log(taskDay)
    return (
      <div>
        <ul>
          { taskDay.map(tasks => {
            return (
              <li>{tasks.trackerTaskName}</li>
            )
          })}
        </ul>
      </div>
    )
  }

  function getTasks() {
      
    return (
    <>
      <ul>
        {
          tasks.map(taskDay => {
            return (
              <div>
                <h2>{taskDay.id} - {taskDay.trackerDayDateTime}</h2>
                { getTaskList(taskDay.trackerTasks) }
              </div>
            )
          })
        }
      </ul>
    </>)

  }

  return (
    <>
      {
        getTasks()
      }
    </>
  )
}

export default TaskList