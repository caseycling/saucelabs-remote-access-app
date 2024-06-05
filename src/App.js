import './App.css';

function App() {
  
  const createSession = async () => {
    console.log('Session created');
  };

  const endSession = async () => {
    console.log('Session ended')
  }

  return (
    <div className="App">
      <div className="container">
        <iframe title="SUT"/>
        <div className='btn-container'>
          <button onClick={createSession}>Create Session</button>
          <button onClick={endSession}>End Session</button>
        </div>
      </div>
    </div>
  );
}

export default App;
