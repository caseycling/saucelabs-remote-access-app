import React from 'react';


const EndSessionButton = ({endSession, sessionId}) => {
    return (
        <button className='btn btn-primary' onClick={() => endSession(sessionId)}>
            End Session
        </button>
    );
}


export default EndSessionButton;
