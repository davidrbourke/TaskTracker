import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function TaskStatus({task, updateTask}) {

const statuses = [
  'Pending',
  'In progress',
  'Done'
]

const updateTaskStatus = () => {
  let updatedTask = Object.assign({}, task)
  
  updatedTask.status = (task.status + 1) % 3
  updateTask(updatedTask)
}

  return (
    <>
      <Container>
        <Row>
          <Col>
            {statuses[task.status]}
          </Col>
          <Col>
            <Button onClick={updateTaskStatus}>Progress</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TaskStatus
