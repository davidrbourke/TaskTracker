
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

function CreateTask ({ saveTask, taskDate }) {
  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')

  const saveNewTask = (e) => {
    const task = {
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
          <Form.Control type="input" placeholder="Enter task name" value={taskName} onChange={(e) => setTaskName(e.currentTarget.value)} />
          <Form.Text className="text-muted">Short description of task</Form.Text>
        </Form.Group>
        <div>
          <Button disabled={taskName === '' } variant="primary" onClick={saveNewTask}>Create</Button>
        </div>
      </Form>
    </>
  )
}

CreateTask.propTypes = {
  saveTask: PropTypes.func,
  taskDate: PropTypes.instanceOf(Date)
}

export default CreateTask
