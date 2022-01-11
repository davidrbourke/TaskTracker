import React, { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import TaskList from './TaskList'
import TaskDate from './TaskDate'
import { loadTasks, saveTaskToApi, updateTaskToApi, updateSequenceToApi } from '../Api/taskApi'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Tasks() {
  const [tasks, setTasks] = useState({})
  const [newTaskCount, setNewTaskCount] = useState(0)
  const [taskDate, setTaskDate] = useState(new Date())

  useEffect(() => {
    
    loadTasks(taskDate)
      .then(item => {
        return setTasks(item)
      })
  }, [newTaskCount, taskDate])

  const saveTask = (task) => {
    saveTaskToApi(task)
    .then(res => {
      const updatedTaskCount = newTaskCount + 1
      setNewTaskCount(updatedTaskCount)
    })
  }

  const saveUpdatedTask = (task) => {
    updateTaskToApi(task)
    .then(res => {
      const updatedTaskCount = newTaskCount + 1
      setNewTaskCount(updatedTaskCount)
    })
  }

  const updateEditingTask = (updatedTask) => {
    const updatedTrackerTasks = []
    tasks.trackerTasks.forEach((task) => {
      if (task.id === updatedTask.id) {
        if (task.trackerTaskName !== updatedTask.trackerTaskName) {
          task.trackerTaskName = updatedTask.trackerTaskName 
        } else {
          task.editing = !updatedTask.editing
          if (task.editing === false) {
            saveUpdatedTask(task)
          }
        }
      }
      updatedTrackerTasks.push(task)
    })

    const tasksUpdated = Object.assign({}, tasks)
    tasksUpdated.trackerTasks = updatedTrackerTasks
    setTasks(tasksUpdated)
  }

  const sequenceChanged = (sequenceChange) => {
    sequenceChange.trackerDayDateTime = taskDate

    updateSequenceToApi(sequenceChange)
      .then(res => {
        const updatedTaskCount = newTaskCount + 1
        setNewTaskCount(updatedTaskCount) 
      })
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <TaskDate taskDate={taskDate} updateTaskDate={setTaskDate} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CreateTask saveTask={saveTask} taskDate={taskDate}></CreateTask>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TaskList
                    tasks={tasks}
                    updateTask={saveUpdatedTask}
                    updateEditingTask={updateEditingTask}
                    sequenceChanged={sequenceChanged}>
                  </TaskList>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Tasks