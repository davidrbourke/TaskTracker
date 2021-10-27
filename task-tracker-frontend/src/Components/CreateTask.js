
import React, { useState } from 'react'
import { saveTask } from './../Api/taskApi'

function CreateTask() {

  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')

  const saveNewTask = (e) => {

      var task = {
        startDateTime: new Date().toISOString(),
        trackerTaskName: taskName,
        trackerTaskDescription: taskDesc
      }

      saveTask(task)
        .then(res => console.log(res))
  }

  return (
    <>
      <h3>Create a task</h3>
      <form>
        <div>
          <label for="task-name-input">Name</label>
          <input id="task-name-input" type="text" value={taskName} onChange={(e)=>setTaskName(e.currentTarget.value)}></input>      
        </div>
        <div>
          <label for="task-name-input">Description</label>
          <input id="task-name-input" type="text" value={taskDesc} onChange={(e)=>setTaskDesc(e.currentTarget.value)}></input>      
        </div>
        <div>
          <input type="button" value="Create" onClick={saveNewTask}/>
        </div>
      </form>
    </>
  )
}

export default CreateTask
