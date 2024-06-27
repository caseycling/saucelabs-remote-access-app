import React from 'react';

import EndSessionButton from './EndSessionButton'
import DeviceSelectorCarousel from './DeviceSelectorCarousel';

const ButtonContainer = ({phones, activeTest, startSession, endSession, sessionId}) => {
    return (
        <div className="button-container">
            {activeTest ? 
                <EndSessionButton endSession={endSession} sessionId={sessionId}/>
                :
                <DeviceSelectorCarousel phones={phones} startSession={startSession} />                
            }
        </div>
    );
};

export default ButtonContainer;