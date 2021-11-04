import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

function EditTask( { task }) {

  const [taskName, setTaskName] = useState('')

  useEffect(() => {
    setTaskName(task.trackerTaskName)
  }, [])

  return (
    <>
      <Form.Control type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
    </>
  )
}

export default EditTask