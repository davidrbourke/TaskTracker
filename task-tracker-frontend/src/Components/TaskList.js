import React, { useState, useEffect } from 'react'
import TaskStatus from './TaskStatus'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import EditTask from './EditTask'

function TaskList({ tasks, updateTask, updateEditingTask, sequenceChanged }) {

  const deleteTask = (task) => {
    task.deleted = true
    updateTask(task)
  }

  const editTask = (task) => {
    if (task.editing === true) {
    }
    updateEditingTask(task)
  }

  const sequenceDown = (task) => {
    console.log(task)
    var sequenceChange = {
      changedTrackerTaskId: task.id,
      isChangedUp: false
    }
    sequenceChanged(sequenceChange)
  }

  const getTaskList = (tasks) => {

    const taskDay = tasks.sort((a, b) => a.sequence - b.sequence)
    return (
      <div>
        <ul>
          { taskDay !== null && taskDay.map(task => {
            return (
              <li>
                <Container>
                  <Row>
                    <Col xs={6}>
                      { task.editing === false &&
                        task.trackerTaskName
                      }
                      { task.editing === true &&
                        <EditTask task={task} />
                      }
                    </Col>
                    <Col xs={3}>
                      <TaskStatus task={task} updateTask={updateTask}></TaskStatus>
                    </Col>
                    <Col>
                      <Button variant="light" onClick={() => editTask(task)}>
                        { task.editing === false ? 'Edit' : 'Save' }
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="light" onClick={() => deleteTask(task)}>x</Button>
                    </Col>
                    <Col>
                      <Button variant="light"><i className="bi-arrow-down" onClick={() => sequenceDown(task)}></i></Button>
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
          tasks !== undefined && tasks.trackerTasks !== undefined &&
            <div>
              { getTaskList(tasks.trackerTasks) }
            </div>
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