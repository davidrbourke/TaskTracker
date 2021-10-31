
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'

function CreateTask({ saveTask, taskDate }) {

  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')

  const saveNewTask = (e) => {

      var task = {
        startDateTime: taskDate,
        trackerTaskName: taskName,
        trackerTaskDescription: taskDesc
      }

      saveTask(task)
      setTaskDesc('')
      setTaskName('')
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formTaskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control type="input" placeholder="Enter task name" value={taskName} onChange={(e)=>setTaskName(e.currentTarget.value)} />
          <Form.Text className="text-muted">Short description of task</Form.Text>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formTaskDesc">
          <Form.Label>Task Description</Form.Label>
          <Form.Control type="input" placeholder="Enter task description" value={taskDesc} onChange={(e)=>setTaskDesc(e.currentTarget.value)} />
          <Form.Text className="text-muted">Full description of task
          </Form.Text>
        </Form.Group> */}
        <div>
          <Button disabled={taskName === '' ? true: false } variant="primary" onClick={saveNewTask}>Create</Button>
        </div>
      </Form>
    </>
  )
}

export default CreateTask
