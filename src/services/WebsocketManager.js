class WebsocketManager {
    constructor(deviceSessionId, setVideoSrc) {
        this.deviceSessionId = deviceSessionId
        this.setVideoSrc = setVideoSrc
        this.companionSocket = null
        this.alternativeIoSocket = null
    }

    createCompanionSocket() {
        this.companionSocket = new WebSocket(`wss://${process.env.REACT_APP_SAUCE_USERNAME}:${process.env.REACT_APP_SAUCE_ACCESS_KEY}@api.us-west-1.saucelabs.com/v1/rdc/socket/companion/${this.deviceSessionId}?version=1`)
        this.companionSocket.onerror = error => console.log(error)
        this.companionSocket.onopen = _ => console.log("companion websocket opened")
        this.companionSocket.onmessage = (event) => {
            const msg = JSON.parse(event.data)

            if (msg.type === "device.state.update" && msg.value.state === "ONLINE") {
                console.log("Device is online and available to receive commands")
                this.#createAlternativeIoSocket()
            }
        }
    }

    #createAlternativeIoSocket() {
        this.alternativeIoSocket = new WebSocket(`wss://${process.env.REACT_APP_SAUCE_USERNAME}:${process.env.REACT_APP_SAUCE_ACCESS_KEY}@api.us-west-1.saucelabs.com/v1/rdc/socket/alternativeIo/${this.deviceSessionId}`)
        this.alternativeIoSocket.binaryType = "blob"
        this.alternativeIoSocket.onerror = error => console.log(error)
        this.alternativeIoSocket.onopen = _ => console.log("alternativeio websocket opened")
        this.alternativeIoSocket.onmessage = event => {
            if (event.data instanceof Blob) {
                this.alternativeIoSocket.send("n/")
                /*might be redundant*/
                const blob = new Blob([event.data], {type: "image/png"})
                this.setVideoSrc(URL.createObjectURL(blob))
            }
        }
    }

    sendMovement(deviceWidth, deviceHeight, type, touchCoords) {
        const movementData = `mt/${type} ${deviceWidth} ${deviceHeight} 0 1 0 ${touchCoords}`
        if (this.alternativeIoSocket) {
            this.alternativeIoSocket.send(movementData)
        }
    }
}

export default WebsocketManager