import { useEffect, useState } from 'react';
import './App.css';

import ButtonContainer from './components/ButtonContainer';
import WebsocketManager from "./services/WebsocketManager";

function App() {

  const [activeTest, setActiveTest] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [videoSrc, setVideoSrc] = useState(null)

  useEffect(() => {
    getActiveDevices();
  }, [])

  const phones = [];

  const getActiveDevices = async () => {
    const response = await fetch('http://localhost:3001/getDevicesStatus')
    const data = await response.json()
    
    const availableDevices = data.devices.filter(device => device.state === 'AVAILABLE')
    
    availableDevices.forEach(phone => {
      phones.push(phone.descriptor)
    });
  }

  // Open websocket
  // Create blob with type image: png
  // 


  const startSession = async (device) => {
    try {
      const response = await fetch(`http://localhost:3001/openDevice/${device.target.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
        })
      })
  
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json()
      setSessionId(data.deviceSessionId)

  
      console.log(`Session started with device: ${device.target.id}`)

      const myManager = new WebsocketManager(data.deviceSessionId, setVideoSrc)
      myManager.createCompanionSocket()
  
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const endSession = async (sessionId) => {

    try {
      console.log(sessionId)
      const response = await fetch(`http://localhost:3001/sessions/${sessionId}/close`, {
        method: 'POST',
      })

      const data = await response.text()
      console.log(data)
      setSessionId('');

    } catch (error) {
      console.log(`Error occured: ${error}`)
    }
  }

  return (
    <div className="App">
      <div className="container">
      <img src={videoSrc} width="500" height="1000" />
          <ButtonContainer phones={phones} startSession={startSession} endSession={endSession} sessionId={sessionId}/>
      </div>
    </div>
  );
}

export default App;
