import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

function TaskDate ({ taskDate, updateTaskDate }) {
  const setDateBack = () => {
    const updatedDate = dayjs(taskDate).add(-1, 'day')
    updateTaskDate(updatedDate)
  }

  const setDateForward = () => {
    const updatedDate = dayjs(taskDate).add(1, 'day')
    updateTaskDate(updatedDate)
  }

  const setDateToday = () => {
    const updatedDate = dayjs()
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
            {dayjs(taskDate).format('MMM DD YYYY')}
            <Button variant="link" onClick={setDateToday}>(Go to today)</Button>
          </Col>
          <Col>
            <Button variant="outline-primary" onClick={setDateForward}> Forward </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

TaskDate.propTypes = {
  taskDate: PropTypes.instanceOf(Date),
  updateTaskDate: PropTypes.func
}

export default TaskDate
