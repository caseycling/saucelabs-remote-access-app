import { useEffect, useState } from 'react';
import './App.css';

import ButtonContainer from './components/ButtonContainer';

function App() {

  const [activeTest, setActiveTest] = useState(false);
  const [sessionId, setSessionId] = useState(''); 

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

      /*

      Companion - wss://api.us-west-1.saucelabs.com/v1/rdc/socket/companion/{device_session_id}?version=1
      alternativeIo - wss://api.us-west-1.saucelabs.com/v1/rdc/socket/alternativeIo/{device_session_id}
      */

      //TODO: FIGURE OUT HOW TO USE STATE FOR SESSION ID
      const companionSocket = new WebSocket(`wss://${process.env.REACT_APP_SAUCE_USERNAME}:${process.env.REACT_APP_SAUCE_ACCESS_KEY}@api.us-west-1.saucelabs.com/v1/rdc/socket/companion/${data.deviceSessionId}?version=1`)

      companionSocket.onerror = (error) => {
        console.log(error)
      }

      companionSocket.onopen = (event) => {
        console.log("Companion websocket opened")
      }

      companionSocket.onmessage = (event) => {
        const msg = JSON.parse(event.data)

        if (msg.type == "device.state.update" && msg.value.state == "ONLINE") {
          console.log("Device is online")
        }
      }
  
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
        <iframe title="SUT"/>
          <ButtonContainer phones={phones} startSession={startSession} endSession={endSession} sessionId={sessionId}/>
      </div>
    </div>
  );
}

export default App;
