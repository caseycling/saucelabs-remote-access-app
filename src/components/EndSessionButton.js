import React from 'react';


const EndSessionButton = ({endSession, sessionId}) => {
    return (
        <button onClick={() => endSession(sessionId)}>
            End Session
        </button>
    );
}


export default EndSessionButton;
