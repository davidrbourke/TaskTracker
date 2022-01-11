import React from 'react'
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

const nextStatus = [
  <i className="bi-caret-right-fill"></i>,
  <i className="bi-check-lg"></i>,
  <i className="bi-arrow-repeat"></i>
]

const updateTaskStatus = () => {
  let updatedTask = Object.assign({}, task)
  
  updatedTask.status = (task.status + 1) % 3
  updateTask(updatedTask)
}

const getVariant = () => {
  return task.status === 2 ? "outline-secondary" : "primary"
}

  return (
    <>
      <Container>
        <Row>
          <Col>
            {statuses[task.status]}
          </Col>
          <Col>
            <Button variant={getVariant()} onClick={updateTaskStatus}>{nextStatus[task.status]}</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TaskStatus
