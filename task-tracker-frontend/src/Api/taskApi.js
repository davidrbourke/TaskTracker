const serverUrl = 'https://localhost:5001'

function loadTasks(taskDate) {
  var promise = fetch(`${serverUrl}/Pad?taskDate=${taskDate.toISOString()}`)
      .then(res => res.json())

  return promise
}

function saveTaskToApi(task) {
  const options = {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var promise = fetch(`${serverUrl}/Pad`, options)
    .then(res => res.json())

  return promise
}

function updateTaskToApi(task) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var promise = fetch(`${serverUrl}/Pad`, options)
    .then(res => res.json())

  return promise
}

function updateSequenceToApi(sequenceChange) {
  const options = {
    method: 'POST',
    body: JSON.stringify(sequenceChange),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var promise = fetch(`${serverUrl}/Pad/SequenceChanged`, options)
    .then(res => res.json())

  return promise
}

export {
  loadTasks,
  saveTaskToApi,
  updateTaskToApi,
  updateSequenceToApi
}