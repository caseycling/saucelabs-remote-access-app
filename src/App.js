import { useEffect, useState } from 'react';
import './App.css';

import ButtonContainer from './components/ButtonContainer';
import WebsocketManager from "./services/WebsocketManager";
import TouchOverlay from './components/TouchOverlay';

function App() {

  const [activeTest, setActiveTest] = useState(false);
  const [phones, setPhones] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoWidth, setVideoWidth] = useState(0)
  const [videoHeight, setVideoHeight] = useState(0)
  const [deviceSocket, setDeviceSocket] = useState(null)


  useEffect(() => {
    getActiveDevices();
    const interval = setInterval(() => {
      getActiveDevices();
    }, 5000);
  
    return () => clearInterval(interval); // This is the cleanup function to clear the interval when the component unmounts
  }, []);
  

  const getActiveDevices = async () => {
    const response = await fetch('http://localhost:3001/getDevicesStatus')
    const data = await response.json()
    
    const availableDevices = data.devices.filter(device => device.state === 'AVAILABLE')
    
    const newPhones = [];

    availableDevices.forEach(phone => {
      newPhones.push(phone.descriptor)
    });

    setPhones(newPhones)
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

      const deviceInfoResponse = await fetch(`http://localhost:3001/validateDescriptor/${device.target.id}`);
    
      if (!deviceInfoResponse.ok) {
        throw new Error(`HTTP error! status: ${deviceInfoResponse.status}`);
      }

      const deviceInfo = await deviceInfoResponse.json();
    
      // You can now use deviceInfo to set more state or perform other actions
      console.log(deviceInfo);
  
      const data = await response.json()
      
      setSessionId(data.deviceSessionId)
      setActiveTest(true)
      
      setVideoWidth((deviceInfo.resolutionWidth)*.3)
      setVideoHeight((deviceInfo.resolutionHeight)*.3)
      
      const mySocket = new WebsocketManager(data.deviceSessionId, setVideoSrc)
      setDeviceSocket(mySocket)
      mySocket.createCompanionSocket()
  
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
      setSessionId('');
      setActiveTest(false);
      setVideoHeight(0);
      setVideoWidth(0);

    } catch (error) {
      console.log(`Error occured: ${error}`)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="video-container">
          <TouchOverlay deviceWidth={videoWidth} deviceHeight={videoHeight} websocketManager={deviceSocket}/>
          <img src={videoSrc} width={videoWidth} height={videoHeight} />
        </div>
      <ButtonContainer phones={phones} activeTest={activeTest} startSession={startSession} endSession={endSession} sessionId={sessionId}/>
      </div>
    </div>
  );
}

export default App;
