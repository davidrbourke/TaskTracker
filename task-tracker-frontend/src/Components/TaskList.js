import React from 'react'
import TaskStatus from './TaskStatus'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function TaskList({ tasks, updateTask }) {

  const deleteTask = (task) => {
    task.deleted = true
    updateTask(task)
  }

  const getTaskList = (taskDay) => {
    return (
      <div>
        <ul>
          { taskDay.map(task => {
            return (
              <li>
                <Container>
                  <Row>
                    <Col>
                      {task.trackerTaskName}
                    </Col>
                    <Col xs={7}>
                      <TaskStatus task={task} updateTask={updateTask}></TaskStatus>
                    </Col>
                    <Col>
                      <Button variant="light" onClick={() => deleteTask(task)}>x</Button>
                    </Col>
                  </Row>
                </Container>
              </li>
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