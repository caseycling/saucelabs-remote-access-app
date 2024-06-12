import React from 'react';

const handleInput = () => {
    console.log('Ended device session')
}


class EndSessionButton extends React.Component {
    render() {
        return (
            <button onClick={handleInput}>
                End Session
            </button>
        );
    }
}

export default EndSessionButton;
