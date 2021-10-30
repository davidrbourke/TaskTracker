import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dayjs from 'dayjs'

function TaskDate({ taskDate , updateTaskDate}) {

  const setDateBack = () => {
    const updatedDate = dayjs(taskDate).add(-1, 'day')
    updateTaskDate(updatedDate)
  }

  const setDateForward = () => {
    const updatedDate = dayjs(taskDate).add(1, 'day')
    updateTaskDate(updatedDate)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button variant="outline-primary" onClick={setDateBack}> Back </Button>
          </Col>
          <Col>
            {dayjs(taskDate).format("MMM DD YYYY")}
          </Col>
          <Col>
            <Button variant="outline-primary" onClick={setDateForward}> Forward </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TaskDate
