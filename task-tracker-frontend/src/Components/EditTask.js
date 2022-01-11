import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

function EditTask ({ task, updateEditingTask }) {
  const setTaskName = (taskName) => {
    const updatedTask = Object.assign({}, task)
    updatedTask.trackerTaskName = taskName
    updateEditingTask(updatedTask)
  }

  return (
    <>
      <Form.Control type="text" value={task.trackerTaskName} onChange={(e) => setTaskName(e.target.value)}/>
    </>
  )
}

EditTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string
  }),
  setTaskName: PropTypes.func
}

export default EditTask
