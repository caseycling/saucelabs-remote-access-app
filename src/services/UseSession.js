import WebsocketManager from "./WebsocketManager";

export const getActiveDevices = async (setPhones) => {
  const response = await fetch('http://localhost:3001/getDevicesStatus')
  const data = await response.json()

  const availableDevices = data.devices.filter(device => device.state === 'AVAILABLE')

  const newPhones = availableDevices.map(phone => phone.descriptor);
  setPhones(newPhones)
}

export const startSession = async (device, setActiveTest, setSessionId, setVideoWidth, setVideoHeight, setDeviceSocket, setVideoSrc) => {
  setActiveTest(true)
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
    const data = await response.json()
    
    setSessionId(data.deviceSessionId)
    setVideoWidth((deviceInfo.resolutionWidth)*.3)
    setVideoHeight((deviceInfo.resolutionHeight)*.3)
    
    const mySocket = new WebsocketManager(data.deviceSessionId, setVideoSrc)
    setDeviceSocket(mySocket)
    mySocket.createCompanionSocket()

  } catch (error) {
    console.error('An error occurred:', error)
  }
}

export const endSession = async (sessionId, setSessionId, setActiveTest, setVideoHeight, setVideoWidth) => {

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