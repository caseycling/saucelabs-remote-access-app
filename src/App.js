import { useEffect } from 'react';
import './App.css';

import ButtonContainer from './components/ButtonContainer';

function App() {

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

    console.log(phones)
  }

  return (
    <div className="App">
      <div className="container">
        <iframe title="SUT"/>
          <ButtonContainer phones={phones}/>
      </div>
    </div>
  );
}

export default App;
