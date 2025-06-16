class WebsocketManager {
    constructor(deviceSessionId, setVideoSrc) {
        this.deviceSessionId = deviceSessionId
        this.setVideoSrc = setVideoSrc
        this.companionSocket = null
        this.alternativeIoSocket = null
    }

    // Before interacting with the device, you need to check that the device is ready to receive commands
    // When selecting a device, this websocket will validate availability and will start emitting JSON messages with the format: { “type”: “<type>”, “value”: “<value>” }
    createCompanionSocket() {
        this.companionSocket = new WebSocket(`wss://${process.env.REACT_APP_SAUCE_USERNAME}:${process.env.REACT_APP_SAUCE_ACCESS_KEY}@api.us-west-1.saucelabs.com/v1/rdc/socket/companion/${this.deviceSessionId}?version=1`)
        this.companionSocket.onerror = error => console.log(error)
        this.companionSocket.onopen = _ => console.log("companion websocket opened")
        this.companionSocket.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            //Checking if device is available
            if (msg.type === "device.state.update" && msg.value.state === "ONLINE") {
                console.log("Device is online and available to receive commands")
                this.#createAlternativeIoSocket()
            }
        }
    }

    // Websocket that is responsible for handling device interactions
    #createAlternativeIoSocket() {
        this.alternativeIoSocket = new WebSocket(`wss://${process.env.REACT_APP_SAUCE_USERNAME}:${process.env.REACT_APP_SAUCE_ACCESS_KEY}@api.us-west-1.saucelabs.com/v1/rdc/socket/alternativeIo/${this.deviceSessionId}`)
        this.alternativeIoSocket.binaryType = "blob"
        this.alternativeIoSocket.onerror = error => console.log(error)
        this.alternativeIoSocket.onopen = _ => {
            console.log("alternativeio websocket opened")
            this.startKeyboardListener()
        }
        this.alternativeIoSocket.onmessage = event => {
            if (event.data instanceof Blob) {
                // The client should send `n/` to acknowledge receipt of a message
                this.alternativeIoSocket.send("n/")
                const blob = new Blob([event.data], {type: "image/png"})
                this.setVideoSrc(URL.createObjectURL(blob))
            }
        }
    }

    // Multi-touch gestures can be sent as `mt/{type} {width} {height} {orientation} {numberOfTouches} {touches}`
    // deviceWidth and deviceHeight are the width and the height of the screen (in the client coordinate system)
    // type is `d`, `m` or `u` for down, move or up
    // touchCoords is a list of touches, where each touch is `{id} {x} {y}`, with _id_ being a touch id (starting at 0)
    //    _x_ and _y_ are the location of the touch (in the client coordinate system).
    
    // This comes into play in src/components/TouchOverlay.js where we capture and transmit the gestures to the device under test

    sendMovement(deviceWidth, deviceHeight, type, touchCoords) {
        const movementData = `mt/${type} ${deviceWidth} ${deviceHeight} 0 1 0 ${touchCoords}`
        console.log(movementData)
        if (this.alternativeIoSocket) {
            this.alternativeIoSocket.send(movementData)
        }
    }


    // Keyboard events can be sent as text messages. 
    // The structure is `tt/{key}`.
    
    sendKeyboardEvent(key) {
        const message = `tt/${key}`
        console.log(`Sending key: ${message}`)
        if (this.alternativeIoSocket && this.alternativeIoSocket.readyState === WebSocket.OPEN) {
            this.alternativeIoSocket.send(message)
        }
    }

    startKeyboardListener() {
        this._keyboardHandler = (event) => {
            this.sendKeyboardEvent(event.key)
        }
        window.addEventListener("keydown", this._keyboardHandler)
    }

    stopKeyboardListener() {
        if (this._keyboardHandler) {
            window.removeEventListener("keydown", this._keyboardHandler)
            this._keyboardHandler = null
        }
    }

    closeSockets() {
        if (this.companionSocket) this.companionSocket.close()
        if (this.alternativeIoSocket) this.alternativeIoSocket.close()
        this.stopKeyboardListener()
    }


}

export default WebsocketManager