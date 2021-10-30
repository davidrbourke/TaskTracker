import React from 'react'
import TaskStatus from './TaskStatus'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function TaskList({ tasks, updateTask }) {

  const getTaskList = (taskDay) => {
    return (
      <div>
        <ul>
          { taskDay.map(tasks => {
            return (
              <li>
                <Container>
                  <Row>
                    <Col>
                      {tasks.trackerTaskName}
                    </Col>
                    <Col>
                      <TaskStatus task={tasks} updateTask={updateTask}></TaskStatus>
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