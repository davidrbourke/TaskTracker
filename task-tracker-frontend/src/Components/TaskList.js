import React, { useState, useEffect } from 'react'
import TaskStatus from './TaskStatus'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import EditTask from './EditTask'

function TaskList({ tasks, updateTask, updateEditingTask, sequenceChanged }) {

  const [lastTaskMoved, setLastTaskMoved] = useState('')

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
    var sequenceChange = {
      changedTrackerTaskId: task.id,
      isChangedUp: false
    }
    sequenceChanged(sequenceChange)
    setLastTaskMoved(task.id)
  }

  const sequenceUp = (task) => {
    var sequenceChange = {
      changedTrackerTaskId: task.id,
      isChangedUp: true
    }
    sequenceChanged(sequenceChange)
    setLastTaskMoved(task.id)
  }

  const getRowHighlightClassName = (id) => {
    setTimeout(() => { setLastTaskMoved('')}, 500)
    return id === lastTaskMoved ? 'sequence-changed' : ''
  }

  const getTaskList = (tasks) => {

    const taskDay = tasks.sort((a, b) => a.sequence - b.sequence)
    return (
      <div>
        <ul>
          { taskDay !== null && taskDay.map((task, i) => {
            return (
              <li>
                <Container>
                  <Row className={getRowHighlightClassName(task.id)}>
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
                        { task.editing === false ? <i className="bi-pencil"></i> : <i className="bi-save-fill"></i> }
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="light" onClick={() => deleteTask(task)}><i className="bi-trash"></i></Button>
                    </Col>
                    <Col>
                      <Button variant="light" disabled={i === taskDay.length-1}  onClick={() => sequenceDown(task)}><i className="bi-arrow-down"></i></Button>
                    </Col>
                    <Col>
                      <Button variant="light" disabled={i === 0} onClick={() => sequenceUp(task)}><i className="bi-arrow-up"></i></Button>
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
          tasks !== undefined && tasks.trackerTasks !== undefined && tasks.trackerTasks !== null &&
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