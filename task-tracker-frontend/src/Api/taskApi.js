const serverUrl = 'https://localhost:5001'

function loadTasks() {
  var promise = fetch(`${serverUrl}/Pad`)
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

export {
  loadTasks,
  saveTaskToApi
}