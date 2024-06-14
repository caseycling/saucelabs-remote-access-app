import { useEffect, useState } from 'react';
import './App.css';

import ButtonContainer from './components/ButtonContainer';

function App() {

  const [activeTest, setActiveTest] = useState(false);
  const [testId, setTestId] = useState(''); 

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
      setTestId(data.deviceSessionId)
  
      console.log(`Session started with device: ${device.target.id}`)
      console.log(`Test ID: ${testId}`)
      console.log(data.deviceSessionId)
  
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <iframe title="SUT"/>
          <ButtonContainer phones={phones} startSession={startSession}/>
      </div>
    </div>
  );
}

export default App;
