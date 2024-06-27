import { useEffect, useState } from 'react';
import './App.css';

import { getActiveDevices, startSession, endSession } from './services/UseSession';
import ButtonContainer from './components/ButtonContainer';
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
    getActiveDevices(setPhones);
    const interval = setInterval(() => {
      getActiveDevices(setPhones);
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="video-container">
          <TouchOverlay deviceWidth={videoWidth} deviceHeight={videoHeight} websocketManager={deviceSocket}/>
          <img src={videoSrc} width={videoWidth} height={videoHeight} />
        </div>
        <ButtonContainer phones={phones} activeTest={activeTest} 
          startSession={(device) => startSession(device, setActiveTest, setSessionId, setVideoWidth, setVideoHeight, setDeviceSocket, setVideoSrc)} 
          endSession={() => endSession(sessionId, setSessionId, setActiveTest, setVideoHeight, setVideoWidth)} 
          sessionId={sessionId}
        />
      </div>
    </div>
  );
}

export default App;