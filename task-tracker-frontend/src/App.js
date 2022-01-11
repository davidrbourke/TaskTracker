import Tasks from './Components/Tasks'
import Container from 'react-bootstrap/Container'
import React from 'react'

function App () {
  return (
    <div>
      <Container>
      <header>
        <div>
          <Tasks></Tasks>
        </div>
      </header>
      </Container>
    </div>
  )
}

export default App
