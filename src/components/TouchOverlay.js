import React, {useState, useRef} from "react";

// This component is used to track and transmit gestures to the real device via the websocket connection
// To achieve this functionality, we use the HTML <canvas> element 
// Docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas

const TouchOverlay = ({deviceWidth, deviceHeight, websocketManager}) => {

    const overlayRef = useRef(null)
    const [mouseIsDown, setMouseIsDown] = useState(false)

    // Captures x,y coordinate of mouse when clicked down
    const handleMouseDown = (event) => {
        const canvas = overlayRef.current
        const rect = canvas.getBoundingClientRect()

        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        setMouseIsDown(true)
        websocketManager.sendMovement(parseInt(deviceWidth), parseInt(deviceHeight), "d", `${parseInt(mouseX)} ${parseInt(mouseY)}`)
    }

    // Captures x,y coordinate of mouse when click is released 
    const handleMouseUp = (event) => {
        const canvas = overlayRef.current
        const rect = canvas.getBoundingClientRect()

        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        setMouseIsDown(false)
        websocketManager.sendMovement(parseInt(deviceWidth), parseInt(deviceHeight), "u", `${parseInt(mouseX)} ${parseInt(mouseY)}`)
    }

    // Calculates movement mouse makes to register gestures
    const handleMouseMove = (event) => {
        if (mouseIsDown) {
            const canvas = overlayRef.current
            const rect = canvas.getBoundingClientRect()

            const mouseX = event.clientX - rect.left
            const mouseY = event.clientY - rect.top

            websocketManager.sendMovement(parseInt(deviceWidth), parseInt(deviceHeight), "m", `${parseInt(mouseX)} ${parseInt(mouseY)}`)
        }
    }

    return (
        <canvas
            ref={overlayRef}
            width={deviceWidth}
            height={deviceHeight}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="video-overlay"
        />
    )
}

export default TouchOverlay;