import React, { useState } from 'react';

const DeviceSelectorCarousel = ({ phones, startSession, handleStart }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goNext = () => {
        setActiveIndex((activeIndex + 1) % phones.length);
    };

    const goPrev = () => {
        setActiveIndex((activeIndex - 1 + phones.length) % phones.length);
    };

    const startTestSession = (e) => {
        startSession(e);
        handleStart();
    }

    return (
        <div style={{color: "white"}}>
            <button onClick={goPrev}>Previous</button>
            <button onClick={startTestSession} id={phones[activeIndex]}>{phones[activeIndex]}</button>
            <button onClick={goNext}>Next</button>
        </div>
    );
};

export default DeviceSelectorCarousel;