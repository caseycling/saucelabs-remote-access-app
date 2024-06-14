import React, {useState} from 'react';

import EndSessionButton from './EndSessionButton'
import DeviceSelectorCarousel from './DeviceSelectorCarousel';


const ButtonContainer = ({phones, startSession, endSession, sessionId}) => {

    const [activeTest, setActiveTest] = useState(false)

    const handleStart = () => {
        setActiveTest(true)
    }

    return (
        <div className="button-container">
            {!activeTest ? 
                <DeviceSelectorCarousel handleStart={handleStart} phones={phones} startSession={startSession} />
                :
                <EndSessionButton endSession={endSession} sessionId={sessionId}/>
            }
        </div>
    );
};

export default ButtonContainer;