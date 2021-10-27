import './App.css';
import TaskList from './Components/TaskList'
import CreateTask from './Components/CreateTask'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TaskList></TaskList>
          <CreateTask></CreateTask>
        </div>
      </header>
    </div>
  );
}

export default App;
