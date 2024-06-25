import React, { useState } from 'react';
import '../../src/App.css';

const DeviceSelectorCarousel = ({ phones, startSession }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goNext = () => {
        setActiveIndex((activeIndex + 1) % phones.length);
    };

    const goPrev = () => {
        setActiveIndex((activeIndex - 1 + phones.length) % phones.length);
    };

    const startTestSession = (e) => {
        startSession(e);
    }

    return (
        <div style={{color: "white"}}>
            <button className='btn btn-primary btn-spacing' onClick={goPrev}>Previous</button>
            <button className='btn btn-primary btn-spacing' onClick={startTestSession} id={phones[activeIndex]}>{phones[activeIndex]}</button>
            <button className='btn btn-primary btn-spacing' onClick={goNext}>Next</button>
        </div>
    );
};

export default DeviceSelectorCarousel;