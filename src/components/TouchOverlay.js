import React, {useState, useRef} from "react";

const TouchOverlay = ({deviceWidth, deviceHeight, websocketManager}) => {

    const overlayRef = useRef(null)
    const [mouseIsDown, setMouseIsDown] = useState(false)

    const handleMouseDown = (event) => {
        const canvas = overlayRef.current
        const rect = canvas.getBoundingClientRect()

        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        setMouseIsDown(true)
        websocketManager.sendMovement(parseInt(deviceWidth), parseInt(deviceHeight), "d", `${parseInt(mouseX)} ${parseInt(mouseY)}`)
    }

    const handleMouseUp = (event) => {
        const canvas = overlayRef.current
        const rect = canvas.getBoundingClientRect()

        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        setMouseIsDown(false)
        websocketManager.sendMovement(parseInt(deviceWidth), parseInt(deviceHeight), "u", `${parseInt(mouseX)} ${parseInt(mouseY)}`)
    }

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