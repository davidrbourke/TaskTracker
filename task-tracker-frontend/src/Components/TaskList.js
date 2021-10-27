import React from 'react'

function TaskList({tasks}) {

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
          tasks !== undefined && tasks.map(taskDay => {
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